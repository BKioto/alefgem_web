// src/app/api/gold-price/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import * as cheerio from "cheerio";
import axios from "axios";

// آدرس سایت مرجع برای قیمت طلا (گرم ۱۸ عیار)
const TGJU_URL = 'https://www.tgju.org/profile/geram18';

export async function GET() {
  try {
    // ۱. دریافت تنظیمات پیش‌فرض از دیتابیس
    // ما فقط اولین ردیف تنظیمات رو میخوایم
    const { data: config, error } = await supabase
      .from("gold_config")
      .select("*")
      .limit(1)
      .single();

    // اگر تنظیمی نبود، مقادیر پیش‌فرض هاردکد شده رو استفاده کن
    const defaultConfig = {
      profit_percent: 7,
      tax_percent: 9,
      wage_percent: 0, // اجرت پیش‌فرض صفر (مشتری وارد کنه بهتره)
      manual_price: 0,
      is_manual_price: false,
      ...config,
    };

    let finalPrice = 0;
    let source = "TGJU";

    // ۲. تصمیم‌گیری برای قیمت: دستی یا اتوماتیک؟
    if (defaultConfig.is_manual_price && defaultConfig.manual_price > 0) {
      // اگر حالت دستی فعال بود
      finalPrice = Number(defaultConfig.manual_price);
      source = "MANUAL";
    } else {
      // اگر حالت اتوماتیک بود، از سایت TGJU بخون
      try {
        const { data: html } = await axios.get(TGJU_URL, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        });
        
        const $ = cheerio.load(html);
        
        // تلاش برای پیدا کردن قیمت از سلکتورهای مختلف سایت
        let priceText = $('.value > span').first().text().trim();
        if (!priceText) {
             priceText = $('span[data-col="info.last_trade.PDrCotVal"]').text().trim();
        }

        if (priceText) {
          // حذف ویرگول و تبدیل به عدد
          // نکته: TGJU معمولا به ریال میده، ما تقسیم بر ۱۰ میکنیم که بشه تومان
          const numericPriceRial = parseInt(priceText.replace(/,/g, ''), 10);
          finalPrice = Math.floor(numericPriceRial / 10);
        } else {
          throw new Error("Price selector not found");
        }

      } catch (scrapeError) {
        console.error("Scraping failed, switching to manual/fallback:", scrapeError);
        // اگر اسکرپ خطا داد، قیمت دستی رو به عنوان فال‌بک بفرست
        finalPrice = Number(defaultConfig.manual_price) || 0;
        source = "FALLBACK";
      }
    }

    // ۳. ارسال پاسخ نهایی به فرانت‌اند
    return NextResponse.json({
      success: true,
      price: finalPrice, // قیمت هر گرم طلا (تومان)
      defaults: {
        profit: Number(defaultConfig.profit_percent),
        tax: Number(defaultConfig.tax_percent),
        wage: Number(defaultConfig.wage_percent),
      },
      source,
      lastUpdated: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error("Gold Price API Error:", error);
    return NextResponse.json(
      { success: false, message: "خطا در دریافت اطلاعات طلا" },
      { status: 500 }
    );
  }
}