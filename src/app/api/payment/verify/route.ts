import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyPayment } from "@/lib/zibal";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { trackId, orderId } = body;

    if (!trackId || !orderId) {
      return NextResponse.json({ success: false, message: "اطلاعات پرداخت ناقص است." });
    }

    // 1. استعلام از زیبال: آیا پول پرداخت شده؟
    const verifyRes = await verifyPayment(trackId);

    // کد 100 یعنی موفق، کد 201 یعنی قبلا تایید شده (تکراری ولی موفق)
    if (verifyRes.result === 100 || verifyRes.result === 201) {
      
      // 2. آپدیت کردن وضعیت سفارش در دیتابیس به "پرداخت شده"
      const { error } = await supabase
        .from("orders")
        .update({
          status: 'paid' // تغییر وضعیت به پرداخت موفق
        })
        .eq('id', orderId);

      if (error) {
        console.error("Supabase Update Error:", error);
        // حتی اگر آپدیت دیتابیس خطا داد، چون پول کم شده به کاربر میگیم موفق
        // ولی در لاگ سرور خطا رو داریم
      }

      return NextResponse.json({ 
        success: true, 
        refNumber: verifyRes.refNumber // شماره ارجاع تراکنش
      });

    } else {
      // پرداخت ناموفق بوده
      return NextResponse.json({ success: false, message: "پرداخت توسط بانک تایید نشد." });
    }

  } catch (error: any) {
    console.error("Payment Verify Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}