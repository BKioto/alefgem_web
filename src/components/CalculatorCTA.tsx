// src/components/CalculatorCTA.tsx
import Link from "next/link";
import { Calculator, ArrowLeft } from "lucide-react";

export default function CalculatorCTA() {
  return (
    <section className="bg-[#050505] py-16 border-t border-[#111]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-r from-[#111] via-[#0a0a0a] to-[#111] p-8 md:p-12 text-center shadow-[0_0_40px_rgba(212,175,55,0.05)]">
          
          {/* افکت نورانی پس‌زمینه */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-[#D4AF37]/10 blur-[80px]"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-[#D4AF37]/5 blur-[80px]"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
              <Calculator className="h-8 w-8" />
            </div>
            
            <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
              محاسبه‌گر آنلاین <span className="text-[#D4AF37]">قیمت طلا</span>
            </h2>
            
            <p className="mb-8 max-w-2xl text-gray-400 text-sm sm:text-base leading-7">
              قبل از خرید، قیمت نهایی طلای مورد نظرتان را با نرخ لحظه‌ای و فرمول دقیق اتحادیه محاسبه کنید. 
              شفافیت در قیمت، حق شماست.
            </p>
            
            <Link 
              href="/gold-calculator" 
              className="group flex items-center gap-2 rounded-xl bg-[#D4AF37] px-8 py-3.5 font-bold text-black transition-all hover:bg-[#E5C158] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              استفاده از ماشین حساب
              <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}