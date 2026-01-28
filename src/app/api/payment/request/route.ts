import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { requestPayment } from "@/lib/zibal";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { formData, items, cartTotal } = body;

    // 1. ثبت سفارش در دیتابیس (با وضعیت: در انتظار پرداخت)
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_name: formData.name,
        phone: formData.phone,
        province: formData.province,
        city: formData.city,
        address: formData.address,
        postal_code: formData.postalCode,
        total_price: cartTotal,
        status: "pending_payment", // هنوز پرداخت نشده
        payment_method: "zibal_online"
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // 2. ثبت آیتم‌های داخل سفارش
    const orderItemsData = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.id,
      product_name: item.title,
      quantity: item.quantity,
      price_at_purchase: item.price,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItemsData);

    if (itemsError) throw itemsError;

    // 3. درخواست لینک پرداخت از زیبال
    // ما کاربر را بعد از پرداخت به این صفحه (که بعدا میسازیم) برمی‌گردانیم
    const callbackUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/payment/callback?orderId=${order.id}`;
    
    const zibalRes = await requestPayment(
      cartTotal, 
      `سفارش شماره ${order.id}`,
      callbackUrl,
      formData.phone
    );

    if (zibalRes.result === 100) {
      // موفقیت: لینک پرداخت را به مرورگر می‌فرستیم
      return NextResponse.json({ 
        success: true, 
        paymentUrl: `https://gateway.zibal.ir/start/${zibalRes.trackId}` 
      });
    } else {
      console.error("Zibal Error:", zibalRes);
      return NextResponse.json({ success: false, message: "خطا در ارتباط با درگاه بانکی" }, { status: 500 });
    }

  } catch (error: any) {
    console.error("Payment Request Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}