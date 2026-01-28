"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MapPin, CreditCard, ShieldCheck, User, Phone, Wallet, Loader2, Banknote } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, cartTotal, clearCart } = useCart();
  
  // استیت‌های فرم
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    province: "خوزستان",
    city: "",
    address: "",
    postalCode: ""
  });

  // انتخاب روش پرداخت (پیش‌فرض روی زیبال)
  const [paymentMethod, setPaymentMethod] = useState<"zibal" | "card">("zibal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // تابع اصلی پردازش سفارش
  const handleOrderSubmit = async () => {
    setErrorMessage("");
    
    // 1. اعتبارسنجی
    if (!formData.name || !formData.phone || !formData.address) {
      setErrorMessage("لطفاً نام، شماره تماس و آدرس دقیق را وارد کنید.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (paymentMethod === "zibal") {
        // --- روش ۱: پرداخت اینترنتی (زیبال) ---
        
        // ارسال اطلاعات به API که ساختیم
        const response = await fetch("/api/payment/request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formData,
            items,
            cartTotal
          }),
        });

        const result = await response.json();

        if (result.success) {
          // هدایت کاربر به درگاه بانک
          window.location.href = result.paymentUrl;
        } else {
          setErrorMessage(result.message || "خطا در اتصال به درگاه بانکی");
          setIsSubmitting(false);
        }

      } else {
        // --- روش ۲: کارت به کارت (ثبت دستی) ---
        
        // ثبت در دیتابیس
        const { data: orderData, error: orderError } = await supabase
          .from("orders")
          .insert({
            customer_name: formData.name,
            phone: formData.phone,
            province: formData.province,
            city: formData.city,
            address: formData.address,
            postal_code: formData.postalCode,
            total_price: cartTotal,
            status: "pending_coordination", // در انتظار هماهنگی
            payment_method: "card_to_card"
          })
          .select()
          .single();

        if (orderError) throw orderError;

        // ثبت آیتم‌ها
        const orderItemsData = items.map((item) => ({
          order_id: orderData.id,
          product_id: item.id,
          product_name: item.title,
          quantity: item.quantity,
          price_at_purchase: item.price,
        }));

        const { error: itemsError } = await supabase
          .from("order_items")
          .insert(orderItemsData);

        if (itemsError) throw itemsError;

        // اتمام کار: خالی کردن سبد و رفتن به صفحه موفقیت
        clearCart();
        router.push("/success");
      }

    } catch (error: any) {
      console.error("Error submitting order:", error);
      setErrorMessage("خطا در ثبت سفارش. لطفاً دوباره تلاش کنید.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] pb-20 pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <h1 className="mb-8 text-2xl font-bold text-white sm:text-3xl">
          تسویه <span className="text-[#D4AF37]">حساب</span>
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* --- فرم مشخصات --- */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-[#222] bg-[#0a0a0a] p-6">
              <div className="mb-6 flex items-center gap-3 border-b border-[#222] pb-4">
                <MapPin className="h-6 w-6 text-[#D4AF37]" />
                <h2 className="text-lg font-bold text-white">آدرس و مشخصات گیرنده</h2>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">نام و نام خانوادگی *</label>
                    <div className="relative">
                      <User className="absolute right-3 top-3 h-5 w-5 text-gray-500" />
                      <input 
                        type="text" name="name" value={formData.name} onChange={handleInputChange}
                        className="w-full rounded-lg border border-[#333] bg-[#111] py-3 pr-10 pl-4 text-white focus:border-[#D4AF37] focus:outline-none"
                        placeholder="مثال: علی رضایی ..."
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">شماره موبایل *</label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-3 h-5 w-5 text-gray-500" />
                      <input 
                        type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                        className="w-full rounded-lg border border-[#333] bg-[#111] py-3 pr-10 pl-4 text-white focus:border-[#D4AF37] focus:outline-none"
                        placeholder="0912..."
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">استان</label>
                    <select name="province" value={formData.province} onChange={handleInputChange} className="w-full rounded-lg border border-[#333] bg-[#111] px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none">
                      <option value="خوزستان">خوزستان</option>
                      <option value="تهران">تهران</option>
                      <option value="اصفهان">اصفهان</option>
                      <option value="فارس">فارس</option>
                      <option value="خراسان رضوی">خراسان رضوی</option>
                      <option value="سایر">سایر استان‌ها</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">شهر</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full rounded-lg border border-[#333] bg-[#111] px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none" placeholder="مثال: اهواز" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">آدرس دقیق *</label>
                  <textarea name="address" value={formData.address} onChange={handleInputChange} rows={3} className="w-full rounded-lg border border-[#333] bg-[#111] px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none" placeholder="خیابان، کوچه، پلاک، واحد..."></textarea>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">کد پستی</label>
                  <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} className="w-full rounded-lg border border-[#333] bg-[#111] px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none" placeholder="1234567890" />
                </div>
              </form>
            </div>

            {/* بخش انتخاب روش پرداخت */}
            <div className="mt-8 rounded-xl border border-[#222] bg-[#0a0a0a] p-6">
              <div className="mb-6 flex items-center gap-3 border-b border-[#222] pb-4">
                <Wallet className="h-6 w-6 text-[#D4AF37]" />
                <h2 className="text-lg font-bold text-white">روش پرداخت</h2>
              </div>
              
              <div className="space-y-3">
                {/* گزینه ۱: زیبال */}
                <label className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-all ${paymentMethod === 'zibal' ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-[#333] bg-[#111]'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    className="h-5 w-5 accent-[#D4AF37]" 
                    checked={paymentMethod === 'zibal'}
                    onChange={() => setPaymentMethod('zibal')}
                  />
                  <div className="flex flex-1 items-center justify-between">
                    <div>
                      <span className="block font-bold text-white">پرداخت اینترنتی (امن)</span>
                      <span className="text-xs text-gray-400">با کلیه کارت‌های عضو شتاب</span>
                    </div>
                    <ShieldCheck className={`h-6 w-6 ${paymentMethod === 'zibal' ? 'text-[#D4AF37]' : 'text-gray-500'}`} />
                  </div>
                </label>
                
                {/* گزینه ۲: کارت به کارت */}
                <label className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-all ${paymentMethod === 'card' ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-[#333] bg-[#111]'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    className="h-5 w-5 accent-[#D4AF37]" 
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  <div className="flex flex-1 items-center justify-between">
                    <div>
                      <span className="block font-bold text-white">کارت به کارت</span>
                      <span className="text-xs text-gray-400">هماهنگی تلفنی بعد از ثبت سفارش</span>
                    </div>
                    <Banknote className={`h-6 w-6 ${paymentMethod === 'card' ? 'text-[#D4AF37]' : 'text-gray-500'}`} />
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* --- صورتحساب --- */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-[#222] bg-[#0a0a0a] p-6">
              <h2 className="mb-6 text-lg font-bold text-white">خلاصه سفارش</h2>

              <div className="mb-6 space-y-4 max-h-60 overflow-y-auto pl-2 scrollbar-thin scrollbar-thumb-[#333]">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded bg-[#111]">
                       <Image src={item.image || "/placeholder.jpg"} alt={item.title} width={48} height={48} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-white line-clamp-1">{item.title}</h4>
                      <span className="text-xs text-gray-500">{item.quantity} عدد</span>
                    </div>
                    <span className="text-sm text-gray-300">
                      {(item.price * item.quantity).toLocaleString("fa-IR")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="my-4 border-t border-[#222]"></div>
              
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-white">مبلغ قابل پرداخت</span>
                <span className="text-xl font-bold text-[#D4AF37]">{cartTotal.toLocaleString("fa-IR")} تومان</span>
              </div>

              {errorMessage && (
                <div className="mb-4 text-center text-sm text-red-500 bg-red-500/10 p-2 rounded">
                  {errorMessage}
                </div>
              )}

              <button 
                onClick={handleOrderSubmit}
                disabled={isSubmitting || items.length === 0}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D4AF37] py-4 text-base font-bold text-black transition-all hover:bg-[#E5C158] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {paymentMethod === 'zibal' ? 'اتصال به درگاه...' : 'در حال ثبت...'}
                  </>
                ) : (
                  paymentMethod === 'zibal' ? 'پرداخت آنلاین' : 'ثبت نهایی سفارش'
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <ShieldCheck className="h-4 w-4" />
                تضمین امنیت اطلاعات شما
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}