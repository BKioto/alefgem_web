"use client"; // این خط برای فرم‌ها الزامی است

import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050505] pb-20 pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">تماس با <span className="text-[#D4AF37]">الف‌جِم</span></h1>
          <p className="mt-4 text-gray-400">مشتاق شنیدن صدای گرم شما هستیم</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          
          {/* ستون راست: اطلاعات تماس */}
          <div className="space-y-6">
            <div className="flex gap-4 rounded-xl border border-[#222] bg-[#0a0a0a] p-6 hover:border-[#D4AF37] transition-colors">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#111] text-[#D4AF37]">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="mb-1 text-lg font-bold text-white">آدرس گالری</h3>
                <p className="text-sm text-gray-400 leading-6">
                  اهواز، وهابی، سیتی سنتر خلیج فارس، طبقه دوم، واحد C23
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-xl border border-[#222] bg-[#0a0a0a] p-6 hover:border-[#D4AF37] transition-colors">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#111] text-[#D4AF37]">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="mb-1 text-lg font-bold text-white">شماره‌های تماس</h3>
                <div className="flex flex-col gap-1" dir="ltr">
                  <a href="tel:09167008252" className="text-sm text-gray-400 hover:text-white text-right">0916 700 8252</a>
                  <a href="tel:09389380913" className="text-sm text-gray-400 hover:text-white text-right">0938 938 0913</a>
                </div>
              </div>
            </div>

            <div className="flex gap-4 rounded-xl border border-[#222] bg-[#0a0a0a] p-6 hover:border-[#D4AF37] transition-colors">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#111] text-[#D4AF37]">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="mb-1 text-lg font-bold text-white">ساعات پاسخگویی</h3>
                <p className="text-sm text-gray-400">
                  همه روزه از ساعت ۱۰ صبح الی ۱۰ شب
                </p>
              </div>
            </div>
          </div>

          {/* ستون چپ: فرم تماس */}
          <div className="rounded-2xl border border-[#222] bg-[#0a0a0a] p-8">
            <h3 className="mb-6 text-xl font-bold text-white">ارسال پیام مستقیم</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input type="text" placeholder="نام شما" className="w-full rounded-lg border border-[#333] bg-[#111] px-4 py-3 text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none" />
                <input type="text" placeholder="شماره تماس" className="w-full rounded-lg border border-[#333] bg-[#111] px-4 py-3 text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none" />
              </div>
              <textarea rows={4} placeholder="متن پیام شما..." className="w-full rounded-lg border border-[#333] bg-[#111] px-4 py-3 text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none"></textarea>
              
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#D4AF37] py-3 font-bold text-black transition-all hover:bg-[#E5C158]">
                <Send className="h-5 w-5" />
                ارسال پیام
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}