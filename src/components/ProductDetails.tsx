"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ChevronRight, Star, Truck, ShieldCheck, Tag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/types";

// این کامپوننت فقط وظیفه نمایش و تعامل را دارد
export default function ProductDetails({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState<string>(product.image_url);

  // ترکیب تصویر اصلی و گالری
  const allImages = [product.image_url, ...(product.gallery_images || [])].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#050505] pb-20 pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* نوار مسیر (Breadcrumb) */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#D4AF37]">خانه</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/shop" className="hover:text-[#D4AF37]">فروشگاه</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-300 line-clamp-1">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          
          {/* --- بخش گالری تصاویر (اصلاح شده) --- */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-[#222] bg-[#111]">
              <Image
                src={selectedImage || "/placeholder.jpg"}
                alt={product.name}
                fill
                // تغییر مهم: استفاده از object-contain برای نمایش کامل عکس
                className="object-contain p-4 transition-all duration-500"
              />
            </div>
            
            {allImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === img ? "border-[#D4AF37] opacity-100" : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`view-${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- بخش اطلاعات محصول --- */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
              {product.name}
            </h1>
            
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span className="rounded bg-[#111] px-2 py-1 border border-[#333]">کد: {product.sku}</span>
              <span className="text-[#D4AF37]">{product.category_name}</span>
              {product.weight > 0 && (
                 <span className="flex items-center gap-1 text-white">
                   <Star className="h-3 w-3 text-[#D4AF37]" />
                   وزن طلا: {product.weight} گرم
                 </span>
              )}
            </div>

            <div className="mt-8 border-y border-[#222] py-6">
              <div className="flex items-end justify-between">
                <span className="text-gray-300">قیمت نهایی:</span>
                <div className="text-right">
                  <span className="block text-3xl font-bold text-[#D4AF37]">
                    {new Intl.NumberFormat("fa-IR").format(product.price)}
                  </span>
                  <span className="text-sm text-gray-500">تومان</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => addToCart({
                    id: product.id,
                    title: product.name,
                    price: product.price,
                    image: product.image_url
                })}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#D4AF37] py-4 text-lg font-bold text-black transition-transform hover:scale-[1.02] active:scale-95"
              >
                <ShoppingBag className="h-6 w-6" />
                افزودن به سبد خرید
              </button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 rounded-lg border border-[#222] bg-[#111] p-3 text-sm text-gray-300">
                <ShieldCheck className="h-5 w-5 text-[#D4AF37]" />
                <span>ضمانت اصالت کالا</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-[#222] bg-[#111] p-3 text-sm text-gray-300">
                <Truck className="h-5 w-5 text-[#D4AF37]" />
                <span>ارسال بیمه‌شده</span>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="mb-4 text-lg font-bold text-white border-b border-[#222] pb-2 inline-block">
                توضیحات و مشخصات
              </h3>
              <div 
                className="prose prose-invert max-w-none text-gray-300 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.description || "" }} 
              />
            </div>
            
            {product.tags && product.tags.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                    {product.tags.map((tag, i) => (
                        <span key={i} className="flex items-center gap-1 text-xs text-gray-500 bg-[#111] px-2 py-1 rounded-full border border-[#222]">
                            <Tag className="h-3 w-3" />
                            {tag}
                        </span>
                    ))}
                </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}