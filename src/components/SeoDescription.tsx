import Link from "next/link";
import Image from "next/image"; // ایمپورت عکس

export default function SeoDescription() {
  return (
    <section className="border-t border-[#111] bg-[#080808] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* استفاده از گرید برای چیدمان عکس و متن */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          
          {/* ستون متن (سمت راست) */}
          <div className="order-2 lg:order-1">
            <h2 className="mb-6 text-2xl font-bold text-white sm:text-3xl leading-tight">
              گالری آنلاین طلا و جواهر <span className="text-[#D4AF37]">الف‌جِم</span>
            </h2>
            
            <div className="space-y-6 text-gray-400 leading-8 text-justify">
              <p>
                به دنیای درخشش و اصالت خوش آمدید. <strong>گالری الف‌جم</strong> به عنوان یکی از پیشگامان فروش اینترنتی طلا و جواهرات در ایران، افتخار دارد که کلکسیونی بی‌نظیر از جواهرات دست‌ساز، سنگ‌های قیمتی معدنی (نظیر عقیق، فیروزه، یاقوت و زمرد) و مصنوعات طلای ۱۸ عیار را به شما عزیزان عرضه نماید.
              </p>
              <p>
                در الف‌جم، ما تنها فروشنده نیستیم؛ بلکه خالق لحظات ناب شما هستیم. تخصص ما <Link href="/contact" className="text-[#D4AF37] hover:underline">ساخت طلا سفارشی</Link> است. شما می‌توانید طرح پلاک اسم، انگشترهای خاص و یا هر ایده‌ای که در ذهن دارید را به ما بسپارید تا با ظرافت استادانه و کمترین اجرت ساخت، آن را به واقعیت تبدیل کنیم.
              </p>
              <p>
                تمامی محصولات ما دارای <strong>فاکتور رسمی و معتبر</strong> بوده و ارسال آن‌ها به سراسر کشور تحت پوشش کامل بیمه انجام می‌شود تا خیالتان از بابت خریدی امن و مطمئن آسوده باشد.
              </p>
              
              <div className="pt-4">
                <Link 
                    href="/shop" 
                    className="inline-flex items-center justify-center rounded-xl bg-[#D4AF37] px-8 py-3 font-bold text-black transition-all hover:bg-[#E5C158] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                >
                    مشاهده ویترین محصولات
                </Link>
              </div>
            </div>
          </div>

          {/* ستون تصویر (سمت چپ) */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative h-[400px] w-full max-w-md overflow-hidden rounded-2xl border border-[#333] sm:h-[500px]">
              {/* افکت نورانی پشت عکس */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
              
              <Image
                src="/alefgem-store.png"
                alt="نمای داخلی فروشگاه گالری الف‌جم"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* متن روی عکس (اختیاری برای زیبایی) */}
              <div className="absolute bottom-6 right-6 z-20">
                <div className="rounded-lg bg-black/60 backdrop-blur-md px-4 py-2 border border-[#ffffff]/10">
                    <span className="text-sm font-bold text-white">شعبه مرکزی اهواز</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}