import { HelpCircle, ChevronDown } from "lucide-react";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#050505] pb-20 pt-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center">
          <HelpCircle className="mx-auto mb-4 h-12 w-12 text-[#D4AF37]" />
          <h1 className="text-3xl font-bold text-white sm:text-4xl">سوالات <span className="text-[#D4AF37]">متداول</span></h1>
          <p className="mt-4 text-gray-400">پاسخ به پرسش‌های پرتکرار شما</p>
        </div>

        <div className="space-y-4">
          {/* سوال ۱ */}
          <div className="rounded-xl border border-[#222] bg-[#0a0a0a] p-6">
            <h3 className="flex items-center gap-3 text-lg font-bold text-white">
              <span className="text-[#D4AF37]">•</span>
              آیا طلاها ۱۸ عیار هستند؟
            </h3>
            <p className="mt-3 text-sm text-gray-400 leading-7">
              بله، تمامی محصولات طلای گالری الف‌جم مطابق استاندارد اتحادیه طلا و جواهر کشور، با عیار ۱۸ (۷۵۰) ساخته می‌شوند و فاکتور رسمی و معتبر همراه با مهر گالری تقدیم می‌گردد.
            </p>
          </div>

          {/* سوال ۲ */}
          <div className="rounded-xl border border-[#222] bg-[#0a0a0a] p-6">
            <h3 className="flex items-center gap-3 text-lg font-bold text-white">
              <span className="text-[#D4AF37]">•</span>
              سفارش ساخت طرح دلخواه قبول می‌کنید؟
            </h3>
            <p className="mt-3 text-sm text-gray-400 leading-7">
              بله، تخصص اصلی ما ساخت سفارشی است. شما می‌توانید طرح، عکس یا ایده خود را برای ما ارسال کنید تا طراحان ما آن را سه بعدی کرده و پس از تایید شما، با بالاترین کیفیت بسازیم.
            </p>
          </div>

          {/* سوال ۳ */}
          <div className="rounded-xl border border-[#222] bg-[#0a0a0a] p-6">
            <h3 className="flex items-center gap-3 text-lg font-bold text-white">
              <span className="text-[#D4AF37]">•</span>
              نحوه ارسال و بیمه مرسولات چگونه است؟
            </h3>
            <p className="mt-3 text-sm text-gray-400 leading-7">
              تمامی سفارشات از طریق پست پیشتاز ویژه یا تیپاکس ارسال می‌شوند. نکته مهم اینکه تمام مرسولات تا سقف ارزش واقعی کالا "بیمه" می‌شوند تا در صورت بروز هرگونه مشکل، خسارت جبران شود.
            </p>
          </div>

          {/* سوال ۴ */}
          <div className="rounded-xl border border-[#222] bg-[#0a0a0a] p-6">
            <h3 className="flex items-center gap-3 text-lg font-bold text-white">
              <span className="text-[#D4AF37]">•</span>
              چند روز طول می‌کشد تا سفارش به دستم برسد؟
            </h3>
            <p className="mt-3 text-sm text-gray-400 leading-7">
              برای کارهای آماده موجود در سایت: ۲ الی ۴ روز کاری.
              <br />
              برای کارهای سفارشی ساخت: بین ۷ الی ۱۴ روز کاری زمان برای ساخت و ارسال نیاز است.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}