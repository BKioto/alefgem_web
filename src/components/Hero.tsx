import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-16 sm:py-24 lg:py-32">
      {/* افکت نورانی پس‌زمینه */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-[#D4AF37]/10 blur-[120px]" />

      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-10 px-4 sm:px-6 lg:flex-row lg:justify-between lg:px-8">

        {/* سمت راست: متن و دکمه‌ها */}
        {/* تغییرات: 
            1. items-center و text-center برای موبایل (وسط چین)
            2. lg:items-start و lg:text-right برای دسکتاپ (راست چین)
        */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-right lg:w-1/2">
          
          {/* تغییرات فونت:
              - text-2xl: در موبایل کوچک است تا در یک خط جا شود.
              - sm:text-4xl: در تبلت متوسط.
              - lg:text-5xl: در دسکتاپ بزرگ.
          */}
          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
            درخشش ابدی،{" "}
            <span className="text-[#D4AF37] whitespace-nowrap">اصالت ماندگار</span>
          </h1>

          <p className="mt-4 text-base text-gray-300 leading-7 sm:text-lg sm:leading-8 max-w-lg lg:max-w-none">
            جواهراتی که تنها زینت نیستند، بلکه راوی داستان شما هستند. ترکیبی بی‌نظیر از طلای ۱۸ عیار و سنگ‌های معدنی اصیل.
          </p>
          
          {/* دکمه‌ها: در موبایل وسط‌چین (justify-center) و در دسکتاپ آغاز‌خط (lg:justify-start) */}
          <div className="mt-8 flex flex-wrap justify-center lg:justify-start items-center gap-4 w-full">
            <Link
              href="/shop"
              className="group flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-bold text-[#050505] transition-all hover:bg-[#E5C158] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] sm:px-8 sm:py-4"
            >
              مشاهده کالکشن
              <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            </Link>
            
            <Link href="/about" className="px-6 py-3 text-sm font-semibold text-gray-300 hover:text-[#D4AF37] transition-colors">
              داستان ما
            </Link>
          </div>
        </div>

        {/* سمت چپ: تصویر شاخص */}
        <div className="flex flex-1 items-center justify-center lg:justify-end w-full lg:w-1/2">
          <div className="relative h-[280px] w-[280px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
            <div className="absolute inset-0 rounded-full bg-[#D4AF37]/20 blur-3xl animate-pulse"></div>
            
            <img
              src="https://placehold.co/600x600/111/D4AF37/png?text=AlefGem+Masterpiece&font=playfair-display"
              alt="جواهر خاص الف‌جم"
              className="relative z-10 h-full w-full rounded-3xl object-cover border-2 border-[#D4AF37]/30 shadow-2xl"
            />
          </div>
        </div>

      </div>
    </section>
  );
}