"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, XCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

// کامپوننت داخلی که منطق بررسی پرداخت را دارد
function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  
  const [status, setStatus] = useState<"loading" | "error">("loading");
  const [message, setMessage] = useState("در حال تایید پرداخت...");

  useEffect(() => {
    const verifyTransaction = async () => {
      // 1. دریافت اطلاعات از آدرس URL (که زیبال فرستاده)
      const trackId = searchParams.get("trackId");
      const success = searchParams.get("success"); // 1 یعنی موفق، 0 یعنی ناموفق
      const orderId = searchParams.get("orderId");

      // اگر کاربر در صفحه بانک "انصراف" زده باشد یا کدی نباشد
      if (success !== "1" || !trackId || !orderId) {
        setStatus("error");
        setMessage("پرداخت ناموفق بود یا توسط کاربر لغو شد.");
        return;
      }

      try {
        // 2. ارسال به API خودمان برای چک کردن نهایی با بانک (استعلام)
        const res = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ trackId, orderId }),
        });

        const data = await res.json();

        if (data.success) {
          // 3. اگر همه چیز درست بود:
          clearCart(); // سبد خرید را خالی کن
          router.replace("/success"); // بفرست به صفحه تشکر
        } else {
          // اگر پول کسر نشده بود یا بانک تایید نکرد
          setStatus("error");
          setMessage(data.message || "تایید پرداخت انجام نشد.");
        }
      } catch (error) {
        console.error(error);
        setStatus("error");
        setMessage("خطا در ارتباط با سرور.");
      }
    };

    // اجرای تابع فقط یک بار
    verifyTransaction();
  }, [searchParams, router, clearCart]);

  // --- حالت خطا ---
  if (status === "error") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-4 text-center">
        <XCircle className="mb-4 h-16 w-16 text-red-500" />
        <h1 className="text-2xl font-bold text-white">خطا در پرداخت</h1>
        <p className="mt-2 text-gray-400">{message}</p>
        <button 
          onClick={() => router.push("/checkout")}
          className="mt-8 rounded-xl bg-[#D4AF37] px-8 py-3 font-bold text-black hover:bg-[#E5C158]"
        >
          بازگشت و تلاش مجدد
        </button>
      </div>
    );
  }

  // --- حالت لودینگ (در حال بررسی) ---
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] text-[#D4AF37]">
      <Loader2 className="mb-4 h-12 w-12 animate-spin" />
      <span className="text-lg font-bold text-white">لطفاً صبر کنید...</span>
      <span className="text-sm text-gray-400">در حال تایید نهایی تراکنش از بانک</span>
    </div>
  );
}

// کامپوننت اصلی صفحه (برای جلوگیری از ارور بیلد باید داخل Suspense باشد)
export default function PaymentCallbackPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#050505] text-[#D4AF37]">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
}