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
    // ما فقط اولین ردیف تنظیمات رو میخوایم (برای درصد سود و اجرت و مالیات)
    const { data: config, error } = await supabase
      .from("gold_config")
      .select("*")
      .limit(1)
      .single();

    // مقادیر پیش‌فرض (اگر دیتابیس خالی بود)
    const defaultConfig = {
      profit_percent: 7,
      tax_percent: 9,
      wage_percent: 0, 
      manual_price: 0,
      is_manual_price: false,
      ...config, // اگر کانفیگ بود، جایگزین کن
    };

    let finalPrice = 0;
    let source = "TGJU";

    // ۲. تصمیم‌گیری: آیا ادمین گفته "فقط قیمت دستی"؟
    if (defaultConfig.is_manual_price && defaultConfig.manual_price > 0) {
      // اگر حالت دستی فعال بود، همون قیمت دیتابیس رو بده
      finalPrice = Number(defaultConfig.manual_price);
      source = "MANUAL";
    } else {
      // اگر حالت اتوماتیک بود، تلاش کن از سایت TGJU بخونی
      try {
        const { data: html } = await axios.get(TGJU_URL, {
          headers: {
            // هدر مرورگر واقعی میفرستیم که سایت بلاک نکنه
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          },
          timeout: 5000 // ۵ ثانیه بیشتر معطل نشه
        });
        
        const $ = cheerio.load(html);
        
        // تلاش برای پیدا کردن قیمت از سلکتورهای معروف TGJU
        // معمولا قیمت توی این دیتا-اتبیوت هست
        let priceText = $('span[data-col="info.last_trade.PDrCotVal"]').text().trim();
        
        // اگر پیدا نشد، سلکتور عمومی‌تر رو تست کن
        if (!priceText) {
             priceText = $('.value > span').first().text().trim();
        }

        if (priceText) {
          // حذف ویرگول‌های قیمت (مثلا 43,000,000)
          const numericPriceRial = parseInt(priceText.replace(/,/g, ''), 10);
          
          // تبدیل ریال به تومان (تقسیم بر ۱۰)
          finalPrice = Math.floor(numericPriceRial / 10);
        } else {
          throw new Error("Price selector not found on TGJU");
        }

      } catch (scrapeError) {
        console.error("TGJU Scraping failed, switching to fallback DB price:", scrapeError);
        // اگر سایت بالا نیومد یا ساختارش عوض شده بود، قیمت دیتابیس رو بده که سایت نخوابه
        finalPrice = Number(defaultConfig.manual_price) || 0;
        source = "FALLBACK_DB";
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
      source, // جهت اطلاع فرانت‌اند (برای دیباگ)
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