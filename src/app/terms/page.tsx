import { Scale, FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#050505] pb-20 pt-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        <h1 className="mb-10 text-3xl font-bold text-white">قوانین و <span className="text-[#D4AF37]">مقررات</span></h1>

        <div className="space-y-8 text-gray-400 leading-8 text-justify">
          <div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Scale className="h-5 w-5 text-[#D4AF37]" />
              ۱. احراز هویت خریدار
            </h3>
            <p>
              به دستور پلیس فتا و اتحادیه طلا و جواهر، برای خریدهای بالای مبلغ مشخص، احراز هویت خریدار (تطابق نام کارت بانکی با کارت ملی) الزامی است. الف‌جم حق دارد مدارک هویتی را قبل از ارسال درخواست نماید.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#D4AF37]" />
              ۲. قیمت‌گذاری لحظه‌ای
            </h3>
            <p>
              با توجه به نوسانات لحظه‌ای بازار طلا، قیمتی که در لحظه پرداخت نهایی می‌شود معتبر است. اگر محصولی در سبد خرید بماند و قیمت طلا تغییر کند، ملاک قیمت لحظه تسویه حساب است.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-2">۳. حریم خصوصی</h3>
            <p>
              اطلاعات شخصی شما (آدرس، شماره تماس) نزد الف‌جم کاملاً محرمانه است و صرفاً برای پردازش سفارش و ارسال استفاده می‌شود.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}