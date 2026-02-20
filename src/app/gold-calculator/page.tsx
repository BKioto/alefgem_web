// src/app/gold-calculator/page.tsx
import type { Metadata } from "next";
import GoldCalculator from "@/components/GoldCalculator";
import { Calculator, Scale, Receipt, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "ماشین حساب طلا آنلاین | محاسبه قیمت طلا ۱۸ عیار با اجرت و مالیات",
  description: "دقیق‌ترین ابزار محاسبه آنلاین قیمت طلا با نرخ لحظه‌ای. محاسبه سود فروشنده، اجرت ساخت و مالیات بر اساس قانون جدید صنف طلا و جواهر.",
  keywords: ["ماشین حساب طلا", "محاسبه قیمت طلا", "قیمت طلا ۱۸ عیار", "محاسبه اجرت طلا", "فرمول محاسبه قیمت طلا", "محاسبه آنلاین طلا"],
};

export default function GoldCalculatorPage() {
  return (
    <div className="min-h-screen bg-[#050505] pb-20">
      {/* بخش هدر و ابزار */}
      <div className="bg-[#0a0a0a] border-b border-[#222] pt-16 pb-24 px-4">
        <div className="mx-auto text-center max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            ماشین حساب <span className="text-[#D4AF37]">هوشمند</span> طلا
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            قبل از خرید، خودتان حساب کنید! <br/>
            ابزار حرفه‌ای محاسبه قیمت نهایی طلا بر اساس نرخ لحظه‌ای بازار، وزن، اجرت و سود قانونی.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <GoldCalculator />
      </div>

      {/* بخش محتوای سئو و آموزشی */}
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        
        <article className="prose prose-invert prose-lg max-w-none text-gray-300">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-6 mt-12">
            <Calculator className="text-[#D4AF37] h-6 w-6" />
            چگونه قیمت نهایی طلا محاسبه می‌شود؟
          </h2>
          <p className="leading-8">
            خرید طلا یکی از محبوب‌ترین روش‌های سرمایه‌گذاری و زیبایی در ایران است. اما بسیاری از خریداران هنگام محاسبه قیمت نهایی طلا دچار سردرگمی می‌شوند. در <strong>گالری الف‌جِم</strong>، ما شفافیت را اولویت خود قرار داده‌ایم. فرمول استانداردی که ما (و تمام طلافروشان معتبر) استفاده می‌کنیم به شرح زیر است:
          </p>
          
          <div className="bg-[#111] border border-[#333] p-6 rounded-xl my-8 not-prose">
            <p className="font-mono text-lg md:text-xl text-center dir-ltr font-bold text-[#D4AF37]">
              قیمت نهایی = قیمت خام + اجرت ساخت + سود فروشنده + مالیات
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose mb-12">
            <div className="flex gap-4">
              <div className="bg-[#D4AF37]/10 p-3 rounded-lg h-fit border border-[#D4AF37]/20"><Scale className="text-[#D4AF37] h-6 w-6" /></div>
              <div>
                <h3 className="font-bold text-white mb-2">قیمت خام طلا</h3>
                <p className="text-sm text-gray-400 leading-relaxed">حاصل‌ضرب وزن قطعه در قیمت لحظه‌ای یک گرم طلای ۱۸ عیار است. این نرخ بر اساس تابلو و نوسانات جهانی تعیین می‌شود.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-[#D4AF37]/10 p-3 rounded-lg h-fit border border-[#D4AF37]/20"><Receipt className="text-[#D4AF37] h-6 w-6" /></div>
              <div>
                <h3 className="font-bold text-white mb-2">اجرت ساخت (مزد ساخت)</h3>
                <p className="text-sm text-gray-400 leading-relaxed">هزینه‌ای است که بابت طراحی و ساخت طلا به سازنده پرداخت می‌شود. کارهای ظریف‌تر و پرکارتر، اجرت بالاتری دارند.</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
            <HelpCircle className="text-[#D4AF37] h-6 w-6" />
            سوالات متداول محاسبه طلا
          </h2>
          
          <div className="space-y-4 not-prose">
            <div className="bg-[#0a0a0a] p-5 rounded-lg border border-[#222]">
              <h3 className="font-bold text-white mb-2">قانون جدید مالیات طلا چگونه است؟</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                طبق قانون جدید مالیات بر ارزش افزوده (اجرایی از دی ۱۴۰۰)، ۹٪ مالیات <strong>فقط به سود فروشنده و اجرت ساخت</strong> تعلق می‌گیرد و اصل طلا معاف از مالیات است. ماشین حساب الف‌جِم دقیقاً بر همین اساس محاسبات را انجام می‌دهد.
              </p>
            </div>

            <div className="bg-[#0a0a0a] p-5 rounded-lg border border-[#222]">
              <h3 className="font-bold text-white mb-2">چرا درصد سود فروشنده ۷ درصد است؟</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                این نرخ مصوب اتحادیه طلا و جواهر برای تک‌فروشی است. تمام فروشندگان معتبر موظف هستند حداکثر ۷٪ سود روی قیمت تمام‌شده (قیمت خام + اجرت) لحاظ کنند.
              </p>
            </div>
          </div>

        </article>
      </div>
    </div>
  );
}