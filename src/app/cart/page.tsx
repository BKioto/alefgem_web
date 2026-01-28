"use client";

import Link from "next/link";
import Image from "next/image"; // استفاده از کامپوننت بهینه عکس
import { Trash2, Minus, Plus, ArrowLeft, ShieldCheck, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext"; 

export default function CartPage() {
  const { items, removeFromCart, increaseQuantity, decreaseQuantity, cartTotal } = useCart();

  // --- حالت ۱: اگر سبد خالی بود ---
  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-4 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#111] text-gray-600">
          <ShoppingCart className="h-10 w-10" />
        </div>
        <h1 className="text-2xl font-bold text-white">سبد خرید شما خالی است</h1>
        <p className="mt-2 text-gray-400">به نظر می‌رسد هنوز محصولی انتخاب نکرده‌اید.</p>
        <Link 
          href="/shop" 
          className="mt-8 flex items-center gap-2 rounded-xl bg-[#D4AF37] px-8 py-3 font-bold text-black transition-all hover:bg-[#E5C158]"
        >
          مشاهده محصولات
          <ArrowLeft className="h-5 w-5" />
        </Link>
      </div>
    );
  }

  // --- حالت ۲: اگر محصولی در سبد بود ---
  return (
    <div className="min-h-screen bg-[#050505] pb-20 pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <h1 className="mb-8 text-2xl font-bold text-white sm:text-3xl">
          سبد خرید <span className="text-[#D4AF37]">شما</span>
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* --- ستون راست: لیست محصولات --- */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col gap-4 rounded-xl border border-[#222] bg-[#0a0a0a] p-4 sm:flex-row sm:items-center">
                
                {/* تصویر محصول */}
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-[#222] bg-[#111]">
                  <Image 
                    src={item.image || "/placeholder.jpg"} 
                    alt={item.title} 
                    fill
                    className="object-cover"
                  />
                </div>

                {/* مشخصات */}
                <div className="flex-1">
                  <h3 className="text-base font-bold text-white line-clamp-1">{item.title}</h3>
                  <div className="mt-2 text-sm text-gray-400">
                    گارانتی اصالت و سلامت فیزیکی
                  </div>
                </div>

                {/* کنترل تعداد و قیمت */}
                <div className="flex flex-row items-center justify-between gap-6 sm:flex-col sm:items-end sm:gap-2">
                  
                  {/* دکمه‌های کم و زیاد */}
                  <div className="flex items-center gap-3 rounded-lg border border-[#333] bg-[#111] px-2 py-1">
                    <button 
                      onClick={() => increaseQuantity(item.id)}
                      className="text-gray-400 hover:text-white p-1"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    
                    <span className="w-4 text-center text-sm font-medium text-white">{item.quantity}</span>
                    
                    <button 
                      onClick={() => decreaseQuantity(item.id)}
                      className="text-gray-400 hover:text-white p-1"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* قیمت کل آیتم */}
                  <div className="text-right">
                    <div className="text-base font-bold text-white">
                      {(item.price * item.quantity).toLocaleString("fa-IR")} <span className="text-xs font-light text-gray-500">تومان</span>
                    </div>
                  </div>
                </div>

                {/* دکمه حذف */}
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="absolute left-4 top-4 text-gray-500 hover:text-red-500 sm:static transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>

              </div>
            ))}

            {/* باکس اطمینان */}
            <div className="mt-4 flex items-center gap-3 rounded-lg border border-[#222] bg-[#111]/50 p-4 text-sm text-gray-400">
              <ShieldCheck className="h-5 w-5 text-[#D4AF37]" />
              کالاهای موجود در سبد شما تا ۲۰ دقیقه رزرو خواهند ماند.
            </div>
          </div>

          {/* --- ستون چپ: خلاصه سفارش --- */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-[#222] bg-[#0a0a0a] p-6">
              <h2 className="mb-6 text-lg font-bold text-white border-b border-[#222] pb-4">خلاصه سفارش</h2>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>قیمت کالاها ({items.length})</span>
                  <span>{cartTotal.toLocaleString("fa-IR")} تومان</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>هزینه ارسال</span>
                  <span className="text-[#D4AF37]">رایگان</span>
                </div>
              </div>

              <div className="my-6 border-t border-[#222]"></div>

              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-white">مبلغ قابل پرداخت</span>
                <span className="text-lg font-bold text-[#D4AF37]">{cartTotal.toLocaleString("fa-IR")} تومان</span>
              </div>

              <Link 
                href="/checkout" 
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D4AF37] py-4 font-bold text-black transition-all hover:bg-[#E5C158] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
              >
                ادامه جهت تسویه حساب
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}