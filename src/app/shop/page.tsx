"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation"; 
import Image from "next/image"; // اضافه شد
import { Filter, ChevronDown, Loader2, XCircle } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";
import { Product } from "@/lib/types";

// نگاشت نام دسته به آیکون (برای سایدبار)
const categoryIcons: Record<string, string> = {
  "همه محصولات": "", // آیکون ندارد
  "گردنبند": "/icons/necklace.png",
  "آویز": "/icons/pendant.png",
  "انگشتر": "/icons/ring.png",
  "گوشواره": "/icons/earrings.png",
  "دستبند": "/icons/bracelet.png",
  "نیم ست": "/icons/half-set.png",
  "سرویس کامل": "/icons/full-set.png",
  "سنگ قیمتی": "/icons/gemstone.png",
  "طلا": "/icons/gold.png",
  "نقره": "/icons/silver.png"
};

// لیست دسته‌بندی‌ها (ترتیب نمایش)
const categories = Object.keys(categoryIcons);

// --- کامپوننت داخلی (محتوای فروشگاه) ---
function ShopContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q"); 
  const categoryParam = searchParams.get("category"); // دریافت دسته از URL

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // اگر در URL دسته انتخاب شده بود (از صفحه اصلی آمده)، آن را انتخاب کن، وگرنه "همه محصولات"
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "همه محصولات");

  // اگر پارامتر URL تغییر کرد، استیت را آپدیت کن
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      
      let query = supabase
        .from("products")
        .select("*")
        .order('created_at', { ascending: false });
      
      // 1. فیلتر دسته‌بندی
      if (selectedCategory !== "همه محصولات") {
        // هندل کردن نیم‌ست چون ممکن است با فاصله یا نیم‌فاصله باشد
        if (selectedCategory === "نیم ست") {
             query = query.ilike("category_name", "%نیم%ست%");
        } else {
             query = query.eq("category_name", selectedCategory);
        }
      }

      // 2. فیلتر جستجو
      if (searchQuery) {
        query = query.ilike("name", `%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts((data as any[]) || []);
      }
      setIsLoading(false);
    }

    fetchProducts();
  }, [selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      
      {/* --- سایدبار فیلترها --- */}
      <aside className="w-full lg:w-64 shrink-0">
        <div className="sticky top-24 rounded-2xl border border-[#222] bg-[#0a0a0a] p-5">
          
          <div className="mb-4 flex items-center justify-between text-lg font-bold text-white">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-[#D4AF37]" />
              فیلترها
            </div>
            
            {(searchQuery || selectedCategory !== "همه محصولات") && (
              <button 
                onClick={() => {
                  window.location.href = "/shop";
                }}
                className="text-xs text-red-500 hover:underline"
              >
                پاک کردن
              </button>
            )}
          </div>
          
          {searchQuery && (
             <div className="mb-4 rounded-lg border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-3 text-sm text-[#D4AF37]">
               نتایج برای: <span className="font-bold">"{searchQuery}"</span>
             </div>
          )}

          <div className="space-y-1">
            {categories.map((cat, idx) => (
              <label key={idx} className={`flex cursor-pointer items-center gap-3 rounded-xl p-3 transition-all ${selectedCategory === cat ? "bg-[#D4AF37]/10 border border-[#D4AF37]/20" : "hover:bg-[#111] border border-transparent"}`}>
                
                {/* دکمه رادیویی مخفی */}
                <input 
                  type="radio" 
                  name="category"
                  className="hidden"
                  checked={selectedCategory === cat}
                  onChange={() => setSelectedCategory(cat)}
                />

                {/* آیکون کوچک */}
                {categoryIcons[cat] ? (
                  <div className="relative h-6 w-6 shrink-0">
                    <Image 
                      src={categoryIcons[cat]} 
                      alt={cat} 
                      fill 
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="h-6 w-6"></div> // فضای خالی برای تراز شدن
                )}
                
                <span className={`text-sm ${selectedCategory === cat ? "font-bold text-[#D4AF37]" : "text-gray-300"}`}>
                  {cat}
                </span>
                
                {selectedCategory === cat && (
                  <div className="mr-auto h-2 w-2 rounded-full bg-[#D4AF37]"></div>
                )}
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* --- لیست محصولات --- */}
      <div className="flex-1">
        {isLoading ? (
          <div className="flex h-64 w-full items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-[#D4AF37]" />
          </div>
        ) : products.length > 0 ? (
          
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 space-y-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        ) : (
          <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-[#333] bg-[#0a0a0a] text-center text-gray-500">
            <XCircle className="mb-2 h-10 w-10 opacity-50" />
            <p className="text-lg font-medium">موردی یافت نشد.</p>
            {searchQuery ? (
              <p className="text-sm mt-1">
                برای کلمه <span className="text-[#D4AF37]">"{searchQuery}"</span> محصولی نداریم.
              </p>
            ) : (
              <p className="text-sm mt-1">لطفاً دسته‌بندی دیگری را امتحان کنید.</p>
            )}
            
            <button 
              onClick={() => {
                 setSelectedCategory("همه محصولات");
                 window.history.pushState({}, '', '/shop'); // پاک کردن URL بدون رفرش
              }}
              className="mt-6 rounded-full border border-[#D4AF37] px-6 py-2 text-sm text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"
            >
              نمایش همه محصولات
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

// --- کامپوننت اصلی صفحه ---
export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#050505] pb-20 pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* هدر صفحه */}
        <div className="mb-8 flex flex-col items-center justify-between gap-4 border-b border-[#222] pb-6 sm:flex-row">
          <div>
            <h1 className="text-3xl font-bold text-white">فروشگاه <span className="text-[#D4AF37]">الف‌جم</span></h1>
          </div>
          
          <button className="flex items-center gap-2 rounded-lg border border-[#333] px-4 py-2 text-sm text-gray-300 hover:border-[#D4AF37]">
            مرتب‌سازی: جدیدترین
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        <Suspense fallback={
          <div className="flex h-64 w-full items-center justify-center text-[#D4AF37]">
             <Loader2 className="h-8 w-8 animate-spin" />
             <span className="mr-2">در حال آماده‌سازی فروشگاه...</span>
          </div>
        }>
          <ShopContent />
        </Suspense>

      </div>
    </div>
  );
}