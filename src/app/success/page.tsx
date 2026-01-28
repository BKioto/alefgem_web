import Link from "next/link";
import { CheckCircle, Copy, ArrowRight, Home } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-4 py-20 text-center">
      
      {/* دایره انیمیشن‌دار وسط */}
      <div className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#D4AF37]/20">
        <div className="absolute inset-0 animate-ping rounded-full bg-[#D4AF37]/20"></div>
        <CheckCircle className="h-12 w-12 text-[#D4AF37]" />
      </div>

      <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
        سفارش شما با <span className="text-[#D4AF37]">موفقیت</span> ثبت شد
      </h1>
      
      <p className="mb-8 max-w-md text-gray-400 leading-7">
        از خرید شما سپاسگزاریم. کارشناسان ما به زودی جهت هماهنگی ارسال با شما تماس خواهند گرفت.
      </p>

      {/* باکس اطلاعات سفارش */}
      <div className="mb-10 w-full max-w-md rounded-2xl border border-[#222] bg-[#0a0a0a] p-6">
        <div className="mb-4 flex items-center justify-between border-b border-[#222] pb-4">
          <span className="text-sm text-gray-400">شماره سفارش:</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-lg font-bold text-white tracking-widest">AG-80294</span>
            <button className="text-gray-500 hover:text-[#D4AF37]">
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-gray-400">
            <span>تاریخ ثبت:</span>
            <span className="text-gray-200">۱۴۰۵/۰۵/۲۴</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>مبلغ پرداخت شده:</span>
            <span className="text-[#D4AF37]">۲۳,۰۰۰,۰۰۰ تومان</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>وضعیت پرداخت:</span>
            <span className="text-green-500">موفق</span>
          </div>
        </div>
      </div>

      {/* دکمه‌های عملیات */}
      <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
        <Link 
          href="/shop" 
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#D4AF37] py-3 font-bold text-black transition-all hover:bg-[#E5C158]"
        >
          بازگشت به فروشگاه
          <ArrowRight className="h-5 w-5" />
        </Link>
        
        <Link 
          href="/" 
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#333] bg-[#111] py-3 font-medium text-gray-300 transition-all hover:bg-[#222] hover:text-white"
        >
          <Home className="h-5 w-5" />
          صفحه اصلی
        </Link>
      </div>

    </div>
  );
}