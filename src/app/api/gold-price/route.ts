// src/app/api/gold-price/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import axios from "axios";

// این خط باعث میشه نکست‌جی‌اس کش نکنه و همیشه قیمت تازه بگیره
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // ۱. دریافت تنظیمات از دیتابیس (برای درصد سود و ...)
    const { data: config } = await supabase
      .from("gold_config")
      .select("*")
      .limit(1)
      .single();

    const defaultConfig = {
      profit_percent: 7,
      tax_percent: 9,
      wage_percent: 0,
      manual_price: 0,
      is_manual_price: false,
      ...config,
    };

    let finalPrice = 0;
    let source = "SHEET"; // پیش‌فرض: گوگل شیت

    // ۲. بررسی حالت دستی (اگر ادمین گفته باشه فقط دستی)
    if (defaultConfig.is_manual_price && defaultConfig.manual_price > 0) {
      finalPrice = Number(defaultConfig.manual_price);
      source = "MANUAL";
    } else {
      // ۳. تلاش برای خواندن از گوگل شیت
      try {
        const sheetUrl = process.env.GOOGLE_SHEET_URL;

        if (!sheetUrl) {
          throw new Error("لینک گوگل شیت در فایل env پیدا نشد");
        }

        // درخواست به گوگل شیت
        const { data: csvText } = await axios.get(sheetUrl, {
          headers: { 'Cache-Control': 'no-cache' } // جلوگیری از کش شدن
        });

        // پیدا کردن عدد از توی فایل CSV
        // این دستور میگرده دنبال اولین عدد (با یا بدون ویرگول)
        const matches = String(csvText).match(/[\d,]+/);

        if (matches) {
          // حذف ویرگول و تبدیل به عدد خام
          const rawPriceRial = parseInt(matches[0].replace(/,/g, ''), 10);
          
          // تبدیل همیشگی ریال به تومان (طبق دستور شما)
          finalPrice = Math.floor(rawPriceRial / 10);
        } else {
          throw new Error("هیچ عددی در فایل گوگل شیت پیدا نشد");
        }

      } catch (fetchError) {
        console.error("Google Sheet Fetch Error:", fetchError);
        // اگر گوگل شیت هم مشکل داشت، برگرد روی قیمت دستی دیتابیس
        finalPrice = Number(defaultConfig.manual_price) || 0;
        source = "FALLBACK_DB";
      }
    }

    // ۴. ارسال پاسخ نهایی
    return NextResponse.json({
      success: true,
      price: finalPrice, // قیمت به تومان
      defaults: {
        profit: Number(defaultConfig.profit_percent),
        tax: Number(defaultConfig.tax_percent),
        wage: Number(defaultConfig.wage_percent),
      },
      source,
      lastUpdated: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}