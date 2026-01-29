import { Truck, ShieldCheck, Gem, PenTool } from "lucide-react";

const features = [
  {
    icon: Gem,
    title: "سنگ‌های معدنی اصل",
    desc: "ضمانت اصالت تمام سنگ‌های قیمتی"
  },
  {
    icon: PenTool,
    title: "طراحی سفارشی",
    desc: "ساخت طرح دلخواه شما با طلا"
  },
  {
    icon: ShieldCheck,
    title: "گارانتی مادام‌العمر",
    desc: "تضمین عیار ۱۸ و خدمات پس از فروش"
  },
  {
    icon: Truck,
    title: "ارسال ایمن و بیمه‌شده",
    desc: "تحویل رایگان برای خریدهای بالای ۵ میلیون"
  }
];

export default function TrustFeatures() {
  return (
    <section className="border-t border-[#111] bg-[#050505] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center sm:items-start sm:text-right">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#111] text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">{item.title}</h3>
              <p className="text-sm text-gray-400 leading-6">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}