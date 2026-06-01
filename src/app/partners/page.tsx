"use client";

import { 
  ExternalLink, 
  ShoppingBag, 
  Truck, 
  Briefcase, 
  Network, 
  Bitcoin, 
  ArrowRight,
  Zap,             
  Bot,             
  LayoutDashboard, 
  Shirt,
  Code2,
  Sparkles
} from "lucide-react";
import Link from "next/link";

// لیست همکاران تجاری (الف جِم از لیست حذف شد چون در سایت خودش هستیم)
const partners = [
  {
    id: 1,
    title: "صرافی تیوان اکس | TivanEx",
    description: "پلتفرم معاملاتی نسل ۳ با امنیت سایبری در کلاس جهانی. خرید و فروش آنی بیت‌کوین و تتر با موتور مچینگ فراصوت و کیف پول سرد.",
    features: ["بلاکچین و Web3", "امنیت بانکی", "تراکنش آنی"],
    url: "https://tivan-ex.vercel.app", 
    icon: Bitcoin,
    color: "text-emerald-400",
    borderColor: "group-hover:border-emerald-500/50",
    glow: "group-hover:shadow-emerald-500/20",
    bgIcon: "bg-emerald-500/10"
  },
  {
    id: 2,
    title: "نکسوس سولانا | توکن‌ساز",
    description: "اولین پلتفرم No-Code ساخت توکن روی شبکه سولانا. ایجاد ارز دیجیتال شخصی و میم‌کوین در کمتر از ۱ دقیقه با هزینه ناچیز و امنیت بلاکچینی.",
    features: ["ساخت توکن SPL", "شبکه پرسرعت سولانا", "بدون کدنویسی"],
    url: "https://nexus-solana-taupe.vercel.app",
    icon: Zap,
    color: "text-fuchsia-400", 
    borderColor: "group-hover:border-fuchsia-500/50",
    glow: "group-hover:shadow-fuchsia-500/20",
    bgIcon: "bg-fuchsia-500/10"
  },
  {
    id: 3,
    title: "کیا دِو | امپراتوری نرم‌افزار",
    description: "تیم توسعه‌دهنده نخبه در زمینه طراحی وب‌سایت‌های اختصاصی، اپلیکیشن‌های موبایل، بلاکچین و هوش مصنوعی. خالق زیرساخت فنی الف جِم.",
    features: ["توسعه دهنده اصلی", "بلاکچین و Web3", "هوش مصنوعی"],
    url: "https://kiyadev.ir", 
    icon: Code2,
    color: "text-blue-400",
    borderColor: "group-hover:border-blue-500/50",
    glow: "group-hover:shadow-blue-500/20",
    bgIcon: "bg-blue-500/10"
  },
  {
    id: 4,
    title: "مایند اوربیت | هوش مصنوعی",
    description: "دستیار هوشمند مبتنی بر مدل‌های پیشرفته زبانی (LLM). پاسخگویی به سوالات، تولید محتوا، کدنویسی و حل مسائل پیچیده با پشتیبانی کامل فارسی.",
    features: ["چت‌بات هوشمند", "تولید محتوا و کد", "مدل زبانی Gemini"],
    url: "https://mind-orbit-lyart.vercel.app",
    icon: Bot,
    color: "text-cyan-400",
    borderColor: "group-hover:border-cyan-500/50",
    glow: "group-hover:shadow-cyan-500/20",
    bgIcon: "bg-cyan-500/10"
  },
  {
    id: 5,
    title: "آلفا سیستم | داشبورد مدیریتی",
    description: "سامانه جامع مدیریت منابع سازمانی (ERP). مدیریت هوشمند پرسنل، حقوق و دستمزد، و کنترل پروژه‌ها با ابزارهای بصری و نمودارهای تحلیلی.",
    features: ["پنل مدیریت ERP", "مدیریت پروژه‌ها", "تحلیل داده‌ها"],
    url: "https://alpha-system-eight.vercel.app",
    icon: LayoutDashboard,
    color: "text-orange-400",
    borderColor: "group-hover:border-orange-500/50",
    glow: "group-hover:shadow-orange-500/20",
    bgIcon: "bg-orange-500/10"
  },
  {
    id: 6,
    title: "لوکس شاپ | استایل و مد",
    description: "فروشگاه اینترنتی مدرن پوشاک و اکسسوری. تجربه خریدی لوکس با رابط کاربری مینیمال، سبد خرید هوشمند و فرآیند پرداخت آسان.",
    features: ["فروشگاه آنلاین مدرن", "مد و فشن", "تجربه کاربری عالی"],
    url: "https://luxe-shop-ten.vercel.app",
    icon: Shirt,
    color: "text-amber-400",
    borderColor: "group-hover:border-amber-500/50",
    glow: "group-hover:shadow-amber-500/20",
    bgIcon: "bg-amber-500/10"
  },
  {
    id: 7,
    title: "فروشگاه آنلاین کوکونات",
    description: "بازار آنلاین میوه و پروتئین شهر پرند. خرید آنلاین تازه‌ترین محصولات با تحویل فوری درب منزل. تجربه‌ای راحت و سریع برای شهروندان.",
    features: ["مارکت‌پلیس محلی", "لجستیک هوشمند", "تحویل فوری"],
    url: "https://cocodelivery.ir", 
    icon: Truck,
    color: "text-green-400",
    borderColor: "group-hover:border-green-500/50",
    glow: "group-hover:shadow-green-500/20",
    bgIcon: "bg-green-500/10"
  },
  {
    id: 8,
    title: "سوغات شاپ اینترنشنال",
    description: "اولین پلتفرم ارسال هدیه به ایران با پرداخت ارزی و کریپتو. پل ارتباطی ایرانیان خارج از کشور با عزیزانشان.",
    features: ["پرداخت کریپتو", "فین‌تک فرامرزی", "E-Commerce"],
    url: "https://soughat.shop", 
    icon: ShoppingBag,
    color: "text-rose-400",
    borderColor: "group-hover:border-rose-500/50",
    glow: "group-hover:shadow-rose-500/20",
    bgIcon: "bg-rose-500/10"
  },
  {
    id: 9,
    title: "قلاب جادویی | دست‌بافت‌های فانتزی",
    description: "فروشگاه آنلاین و تخصصی دست‌بافت‌های فانتزی، عروسک‌های آمیگورومی و دسته گل‌های کاموایی جاودان. خلق شده با ظرافت و هنر دست.",
    features: ["فروشگاه آنلاین", "دست‌سازه", "E-Commerce"],
    url: "https://www.gholabjadooi.ir", 
    icon: Sparkles,
    color: "text-pink-400",
    borderColor: "group-hover:border-pink-500/50",
    glow: "group-hover:shadow-pink-500/20",
    bgIcon: "bg-pink-500/10"
  }
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-20 px-4 sm:px-8 relative overflow-hidden font-sans">
      
      {/* بک‌گراند نوری طلایی و لاکچری هماهنگ با تم الف‌جم */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#111] rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* هدر صفحه */}
        <div className="mb-12">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors text-sm">
                <ArrowRight className="w-4 h-4" />
                بازگشت به خانه
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-3">
                <Network className="text-[#D4AF37]" />
                شبکه همکاران تجاری
            </h1>
            <p className="text-gray-400 max-w-2xl leading-8 text-lg">
                گالری الف‌جِم بخشی از یک اکوسیستم دیجیتال بزرگ و پیشرفته است. در این بخش، مجموعه‌ای از پروژه‌های منتخب و کسب‌وکارهای معتبری که از زیرساخت‌های فنی یا مالی مشترک ما استفاده می‌کنند را معرفی می‌کنیم.
            </p>
        </div>

        {/* گرید کارت‌ها */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => {
            // حل خطای ری‌اکت: اختصاص آیکون به یک متغیر با حرف بزرگ
            const Icon = partner.icon;

            return (
              <a
                key={partner.id}
                href={partner.url}
                target="_blank"
                rel="dofollow" 
                className={`group relative flex flex-col justify-between rounded-2xl border border-[#222] bg-[#0a0a0a] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${partner.borderColor} ${partner.glow}`}
              >
                <div>
                  {/* هدر کارت */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`rounded-2xl p-3 bg-[#111] border border-[#222] ${partner.color} ${partner.bgIcon || ''}`}>
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <div className="rounded-full bg-[#111] border border-[#222] px-3 py-1 flex items-center gap-1">
                       <Briefcase size={12} className="text-gray-500" />
                      <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Partner</span>
                    </div>
                  </div>

                  <h2 className="mb-3 text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                    {partner.title}
                  </h2>
                  
                  <p className="text-sm leading-7 text-gray-400 mb-6 text-justify opacity-80 group-hover:opacity-100 transition-opacity">
                    {partner.description}
                  </p>

                  {/* تگ‌ها */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {partner.features.map((feature, idx) => (
                      <span key={idx} className="text-[11px] bg-[#111] text-gray-500 border border-[#222] px-2.5 py-1 rounded-lg">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* فوتر کارت */}
                <div className="mt-auto border-t border-[#222] pt-4 flex items-center justify-between">
                  <span className={`text-xs font-bold transition-colors ${partner.color}`}>
                    بازدید از وب‌سایت
                  </span>
                  <div className="flex items-center gap-1 text-gray-600 group-hover:text-white transition-colors">
                    <span className="text-xs font-mono hidden sm:inline-block" dir="ltr">{partner.url.replace('https://', '').replace(/\/$/, '')}</span>
                    <ExternalLink size={14} />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}