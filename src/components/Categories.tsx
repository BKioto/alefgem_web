import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

// لیست دسته‌بندی‌ها متصل به فایل‌های آیکون جدید
const staticCategories = [
  { id: 1, name: "گردنبند", image: "/icons/necklace.png", href: "/shop?category=گردنبند" },
  { id: 2, name: "آویز", image: "/icons/pendant.png", href: "/shop?category=آویز" },
  { id: 3, name: "انگشتر", image: "/icons/ring.png", href: "/shop?category=انگشتر" },
  { id: 4, name: "گوشواره", image: "/icons/earrings.png", href: "/shop?category=گوشواره" },
  { id: 5, name: "دستبند", image: "/icons/bracelet.png", href: "/shop?category=دستبند" },
  { id: 6, name: "نیم‌ست", image: "/icons/half-set.png", href: "/shop?category=نیم ست" },
  { id: 7, name: "سرویس کامل", image: "/icons/full-set.png", href: "/shop?category=سرویس کامل" },
  { id: 8, name: "سنگ قیمتی", image: "/icons/gemstone.png", href: "/shop?category=سنگ قیمتی" },
  { id: 9, name: "طلا (شمش)", image: "/icons/gold.png", href: "/shop?category=طلا" },
  { id: 10, name: "نقره", image: "/icons/silver.png", href: "/shop?category=نقره" },
];

export default function Categories() {
  return (
    <section className="bg-[#050505] py-16 sm:py-24 border-t border-[#111]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* تیتر بخش */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            دسته‌بندی <span className="text-[#D4AF37]">محصولات</span>
          </h2>
          <p className="mt-4 text-sm text-gray-400 sm:text-base">
            انتخابی از میان اصیل‌ترین و فاخرترین جواهرات
          </p>
        </div>

        {/* شبکه کارت‌ها */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {staticCategories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group relative flex flex-col items-center justify-center rounded-2xl border border-[#222] bg-[#0a0a0a] p-6 text-center transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#111] hover:shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:-translate-y-1"
            >
              {/* کانتینر آیکون/تصویر */}
              <div className="relative mb-4 h-16 w-16 sm:h-20 sm:w-20 transition-transform duration-300 group-hover:scale-110">
                {/* افکت درخشش پشت آیکون */}
                <div className="absolute inset-0 rounded-full bg-[#D4AF37]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-contain drop-shadow-lg"
                  sizes="(max-width: 768px) 64px, 80px"
                />
              </div>
              
              {/* نام دسته */}
              <h3 className="text-sm font-bold text-gray-300 transition-colors group-hover:text-[#D4AF37]">
                {cat.name}
              </h3>
              
              {/* فلش کوچک که موقع هاور میاد */}
              <div className="absolute bottom-3 opacity-0 transition-all duration-300 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowLeft className="h-4 w-4 text-[#D4AF37]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}