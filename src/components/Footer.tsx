import Link from "next/link";
import { Instagram, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#222] bg-[#050505] pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          
          {/* ستون اول: درباره الف‌جم */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-[#D4AF37] mb-4">گالری الف‌جِم</h3>
            <p className="text-sm text-gray-400 leading-7 max-w-md">
              خلق جواهراتی که راوی داستان‌های شما هستند. ما در الف‌جم با ترکیب هنر دست و سنگ‌های معدنی اصیل، درخششی ابدی را برای شما می‌سازیم.
              <br />
              <strong>«بیا راجع به کیفیت صحبت کنیم.»</strong>
            </p>
          </div>

          {/* ستون دوم: راهنمای مشتریان (لینک بلاگ اضافه شد) */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">راهنمای مشتریان</h4>
            <ul className="space-y-3">
              <li><Link href="/shop" className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors">فروشگاه آنلاین</Link></li>
              <li><Link href="/blog" className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors font-bold text-gray-300">مجله الف‌جم (بلاگ)</Link></li>
              <li><Link href="/shipping" className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors">رویه ارسال و بازگشت</Link></li>
              <li><Link href="/faq" className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors">سوالات متداول</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors">قوانین و مقررات</Link></li>
            </ul>
          </div>

          {/* ستون سوم: تماس با ما */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">تماس با ما</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#D4AF37] shrink-0" />
                <span className="text-sm text-gray-400">
                  اهواز، وهابی، سیتی سنتر خلیج فارس، طبقه دوم، واحد C23
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#D4AF37] shrink-0" />
                <div className="flex flex-col text-sm text-gray-400" dir="ltr">
                   <span>0916 700 8252</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Instagram className="h-5 w-5 text-[#D4AF37] shrink-0" />
                <a href="https://instagram.com/alefgem" target="_blank" className="text-sm text-gray-400 hover:text-[#D4AF37]">@alefgem</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[#222] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-xs text-gray-500">
            تمامی حقوق برای گالری الف‌جم محفوظ است © {new Date().getFullYear()}
          </p>
          <div className="flex gap-4">
             {/* نماد اعتماد (فعلا خالی) */}
             <div className="h-10 w-10 rounded bg-[#111] border border-[#333]"></div>
             <div className="h-10 w-10 rounded bg-[#111] border border-[#333]"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}