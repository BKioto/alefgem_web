import Link from "next/link";
import { Gem, ArrowLeft, Crown, Circle, Watch, Sparkles, Diamond, type LucideIcon } from "lucide-react";

// --- بخش موقت (بعداً با دیتابیس جایگزین می‌شود) ---
// TODO: در فاز 2، این لیست از Supabase خوانده می‌شود.
const staticCategories = [
  { id: 1, name: "گردنبند", iconName: "Crown", href: "/shop?category=necklace" },
  { id: 2, name: "آویز", iconName: "Gem", href: "/shop?category=pendant" },
  { id: 3, name: "انگشتر", iconName: "Circle", href: "/shop?category=ring" },
  { id: 4, name: "گوشواره", iconName: "Sparkles", href: "/shop?category=earrings" },
  { id: 5, name: "دستبند", iconName: "Watch", href: "/shop?category=bracelet" },
  { id: 6, name: "نیم‌ست", iconName: "Diamond", href: "/shop?category=half-set" },
  { id: 7, name: "سرویس کامل", iconName: "Crown", href: "/shop?category=full-set" },
  { id: 8, name: "سنگ قیمتی", iconName: "Gem", href: "/shop?category=gemstone" },
  { id: 9, name: "طلا (شمش)", iconName: "Sparkles", href: "/shop?category=gold" },
  { id: 10, name: "نقره", iconName: "Circle", href: "/shop?category=silver" },
];

// یک تابع کمکی برای نگاشت نام آیکون به کامپوننت واقعی
const getIcon = (name: string): LucideIcon => {
  const icons: Record<string, LucideIcon> = { Crown, Gem, Circle, Watch, Sparkles, Diamond };
  return icons[name] || Circle;
};
// ---------------------------------------------------

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
        <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {staticCategories.map((cat) => {
            const IconComponent = getIcon(cat.iconName);
            
            return (
              <Link
                key={cat.id}
                href={cat.href}
                className="group relative flex flex-col items-center justify-center rounded-xl border border-[#222] bg-[#0a0a0a] p-4 sm:p-6 text-center transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#111] hover:shadow-[0_0_15px_rgba(212,175,55,0.15)]"
              >
                {/* آیکون */}
                <div className="mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#111] text-[#888] transition-colors group-hover:bg-[#D4AF37] group-hover:text-black">
                  <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                
                {/* نام دسته */}
                <h3 className="text-xs sm:text-sm font-semibold text-gray-200 transition-colors group-hover:text-white">
                  {cat.name}
                </h3>
                
                {/* فلش کوچک که موقع هاور میاد */}
                <div className="absolute bottom-2 opacity-0 transition-all duration-300 group-hover:bottom-3 group-hover:opacity-100">
                  <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 text-[#D4AF37]" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}