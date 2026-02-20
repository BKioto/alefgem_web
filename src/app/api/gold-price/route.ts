// src/app/api/gold-price/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import axios from "axios";

export const dynamic = 'force-dynamic'; // کش بی کش

export async function GET() {
  try {
    // 1. دریافت درصدهای پیش‌فرض از دیتابیس
    const { data: config } = await supabase
      .from("gold_config")
      .select("profit_percent, tax_percent, wage_percent")
      .limit(1)
      .single();

    const defaults = {
      profit: config?.profit_percent ?? 7,
      tax: config?.tax_percent ?? 9,
      wage: config?.wage_percent ?? 0,
    };

    let finalPrice = 0;

    // 2. دریافت قیمت از گوگل شیت
    try {
      const sheetUrl = process.env.GOOGLE_SHEET_URL;
      
      if (!sheetUrl) {
        throw new Error("Missing Sheet URL");
      }

      const response = await axios.get(sheetUrl, {
        headers: { 'Cache-Control': 'no-cache' },
        timeout: 8000 // 8 ثانیه وقت داره
      });

      const csvText = String(response.data);

      // 3. پیدا کردن قیمت از بین ویرگول‌ها
      const parts = csvText.split(',');
      let foundPrice = 0;

      for (const part of parts) {
        // تمیزکاری عدد
        const cleanStr = part.replace(/[^0-9.]/g, ''); 
        const num = parseFloat(cleanStr);

        // شرط: عدد باید بزرگتر از 5 میلیون باشه (قیمت گرم طلا به ریال)
        if (!isNaN(num) && num > 5000000) {
          if (num > foundPrice) {
            foundPrice = num;
          }
        }
      }

      if (foundPrice > 0) {
        // تبدیل ریال به تومان
        finalPrice = Math.floor(foundPrice / 10);
      } else {
        finalPrice = 0; 
      }

    } catch (sheetError) {
      console.error("Error reading Sheet:", sheetError);
      finalPrice = 0;
    }

    return NextResponse.json({
      success: true,
      price: finalPrice,
      defaults: defaults,
      lastUpdated: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error("Fatal Error:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}