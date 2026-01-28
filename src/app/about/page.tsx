import { Target, Gem, PenTool, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050505] pb-20 pt-10">
      
      {/* بخش 1: معرفی و داستان */}
      <section className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
          داستان <span className="text-[#D4AF37]">الف‌جِم</span>
        </h1>
        <p className="text-lg leading-9 text-gray-300">
          «الف جِم» از یک رویا متولد شد: رویای خلق جواهراتی که نه تنها زینت‌بخش باشند، بلکه راوی داستان‌ها، احساسات و لحظات فراموش‌نشدنی زندگی شما باشند.
          ما باور داریم هر سنگ قیمتی، قصیده‌ای از طبیعت است و هر قطعه طلا، بومی برای هنرنمایی.
        </p>
        <div className="mt-8 flex justify-center">
          <div className="h-1 w-24 rounded-full bg-[#D4AF37]"></div>
        </div>
      </section>

      {/* بخش 2: ارزش‌ها (Values) */}
      <section className="mt-20 bg-[#0a0a0a] py-16 border-y border-[#111]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            
            {/* ارزش 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#111] text-[#D4AF37]">
                <PenTool className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">هنر و اصالت</h3>
              <p className="text-sm text-gray-400 leading-7">
                طراحان ما هر قطعه را با الهام از فرهنگ غنی ایرانی و روندهای مدرن جهانی، به صورت منحصربه‌فرد و دست‌ساز خلق می‌کنند.
              </p>
            </div>

            {/* ارزش 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#111] text-[#D4AF37]">
                <Gem className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">کیفیت بی‌نظیر</h3>
              <p className="text-sm text-gray-400 leading-7">
                استفاده از بهترین سنگ‌های قیمتی معدنی و طلای ۱۸ عیار استاندارد در تمام محصولات با ضمانت کتبی.
              </p>
            </div>

            {/* ارزش 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#111] text-[#D4AF37]">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">شفافیت قیمت</h3>
              <p className="text-sm text-gray-400 leading-7">
                در الف‌جم همه چیز شفاف است. قیمت نهایی دقیقاً طبق استاندارد اتحادیه طلا و جواهر محاسبه می‌شود.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* بخش 3: خدمات ما */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#222] bg-gradient-to-br from-[#111] to-[#050505] p-8 md:p-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-bold text-white">کارگاه تخصصی <span className="text-[#D4AF37]">ساخت سفارشی</span></h2>
              <p className="mb-6 text-gray-400 leading-8">
                در کارگاه طلاسازی الف جِم، هیچ محدودیتی وجود ندارد. ما متخصص تبدیل ایده‌های شما به طلا هستیم. 
                آیا طرح خاصی در ذهن دارید؟ ما آن را برای شما می‌سازیم.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#D4AF37]"></div>
                  پلاک اسم طلا (نستعلیق و مدرن)
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#D4AF37]"></div>
                  ساخت جواهر با سنگ‌های قیمتی خاص
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#D4AF37]"></div>
                  حکاکی لیزری (تاریخ، جمله، اثر انگشت)
                </li>
              </ul>
            </div>
            <div className="relative h-64 w-full overflow-hidden rounded-xl border border-[#333] lg:h-80">
              <img 
                src="https://placehold.co/800x600/111/D4AF37/png?text=Workshop+AlefGem" 
                alt="کارگاه ساخت طلا"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}