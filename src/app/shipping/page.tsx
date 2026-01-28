import { Truck, RotateCcw, ShieldCheck } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#050505] pb-20 pt-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        <h1 className="mb-10 text-3xl font-bold text-white">رویه ارسال و <span className="text-[#D4AF37]">بازگشت کالا</span></h1>

        {/* بخش ارسال */}
        <section className="mb-12 rounded-2xl border border-[#222] bg-[#0a0a0a] p-8">
          <div className="mb-4 flex items-center gap-3">
            <Truck className="h-8 w-8 text-[#D4AF37]" />
            <h2 className="text-xl font-bold text-white">شرایط ارسال</h2>
          </div>
          <ul className="space-y-4 text-gray-400 leading-7">
            <li>• ارسال به سراسر ایران رایگان است (برای خریدهای بالای ۵ میلیون تومان).</li>
            <li>• بسته‌بندی‌ها کاملاً ایمن، محرمانه و بدون نام بردن از محتویات قیمتی روی جعبه ارسال می‌شوند.</li>
            <li>• کد پیگیری پستی بلافاصله پس از تحویل به پست، برای شما پیامک خواهد شد.</li>
            <li>• مشتری موظف است هنگام دریافت بسته، سلامت فیزیکی جعبه را چک کند.</li>
          </ul>
        </section>

        {/* بخش بازگشت */}
        <section className="rounded-2xl border border-[#222] bg-[#0a0a0a] p-8">
          <div className="mb-4 flex items-center gap-3">
            <RotateCcw className="h-8 w-8 text-[#D4AF37]" />
            <h2 className="text-xl font-bold text-white">شرایط تعویض و عودت</h2>
          </div>
          <div className="space-y-4 text-gray-400 leading-7">
            <p>ما در الف‌جم اصالت و کیفیت کالای خود را تضمین می‌کنیم. با این حال شرایط زیر برقرار است:</p>
            <ul className="list-disc pr-5 space-y-2">
              <li>تا ۴۸ ساعت پس از تحویل، در صورت وجود مغایرت ظاهری یا فنی، امکان مرجوعی وجود دارد.</li>
              <li>کالاهای "سفارشی ساخت" (مثل پلاک اسم) چون مختص شما ساخته شده‌اند، امکان عودت سلیقه‌ای ندارند (مگر نقص فنی).</li>
              <li>وزن طلای فاکتور شده، وزن نهایی ترازو است و هیچگونه تلورانس منفی نخواهیم داشت.</li>
            </ul>
          </div>
        </section>

      </div>
    </div>
  );
}