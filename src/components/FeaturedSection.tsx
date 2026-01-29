"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";
import { Product } from "@/lib/types";

export default function FeaturedSection() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      // دریافت محصولات ویژه (Featured)
      let { data } = await supabase
        .from("products")
        .select("*")
        .eq("is_featured", true)
        .limit(8); // تعداد بیشتر برای نمایش بهتر ماسونری

      // اگر محصول ویژه‌ای نبود، جدیدترین‌ها رو بیار که خالی نباشه
      if (!data || data.length === 0) {
        const response = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(8);
        data = response.data;
      }

      if (data) {
        // تبدیل دیتا به تایپ Product (برای اطمینان)
        setFeaturedProducts(data as any[]);
      }
      setLoading(false);
    }

    fetchFeatured();
  }, []);

  return (
    <section className="bg-[#050505] py-16 border-t border-[#111]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* سرتیتر بخش */}
        <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-center sm:text-right">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              جدیدترین <span className="text-[#D4AF37]">شاهکارها</span>
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              هنر دست استادکاران الف‌جم
            </p>
          </div>
          
          <Link href="/shop" className="group flex items-center text-sm font-medium text-gray-400 hover:text-[#D4AF37] transition-colors">
            مشاهده همه محصولات
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>

        {/* محتوا */}
        {loading ? (
          <div className="flex h-64 w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37]" />
          </div>
        ) : (
          /* --- چیدمان پینترستی (Masonry) --- */
          /* استفاده از columns بجای grid برای ارتفاع متغیر */
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-4 space-y-4">
            {featuredProducts.map((product, index) => (
              // نکته مهم: پاس دادن index برای انیمیشن نوبتی
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}