import Link from "next/link";

export default function SeoDescription() {
  return (
    <section className="border-t border-[#111] bg-[#080808] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#222] bg-[#050505] p-8 md:p-12">
          
          <h2 className="mb-6 text-2xl font-bold text-white sm:text-3xl">
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
              تمامی محصولات ما دارای <strong>فاکتور رسمی و معتبر</strong> بوده و ارسال آن‌ها به سراسر کشور تحت پوشش کامل بیمه انجام می‌شود تا خیالتان از بابت خریدی امن و مطمئن آسوده باشد. برای خرید جدیدترین مدل‌های گردنبند طلا، انگشتر، دستبند و گوشواره، همین حالا از <Link href="/shop" className="text-[#D4AF37] hover:underline">فروشگاه آنلاین ما</Link> دیدن کنید.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}