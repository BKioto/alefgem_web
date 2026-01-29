"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/types"; 

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  // اگر اسلاگ داشت از اون استفاده کن، وگرنه (برای اطمینان) از آیدی
  const productLink = `/product/${product.slug || product.id}`;

  return (
    <div className="group break-inside-avoid relative mb-4 flex flex-col overflow-hidden rounded-2xl bg-[#111] border border-[#222] transition-all duration-300 hover:border-[#D4AF37] hover:shadow-2xl hover:shadow-[#D4AF37]/10">
      
      <Link href={productLink} className="relative block w-full bg-[#050505]">
        <Image
          src={product.image_url || "/placeholder.jpg"} 
          alt={product.name}
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ width: '100%', height: 'auto' }} 
          className="transition-transform duration-700 group-hover:scale-105"
        />

        {product.is_featured && (
          <div className="absolute left-3 top-3 rounded-full bg-[#D4AF37] px-3 py-1 text-[10px] font-bold text-black shadow-lg z-10">
            ویژه
          </div>
        )}

        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart({
              id: product.id,
              title: product.name,
              price: product.price,
              image: product.image_url,
            });
          }}
          className="absolute left-1/2 bottom-4 -translate-x-1/2 translate-y-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-bold text-black shadow-lg hover:bg-[#D4AF37] z-20"
        >
          <ShoppingBag className="h-4 w-4" />
          <span className="text-xs">خرید سریع</span>
        </button>
      </Link>

      <div className="flex flex-col p-4">
        <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
          <span className="text-[#D4AF37]">{product.category_name}</span>
          {product.weight > 0 && (
            <span className="flex items-center gap-1">
              {product.weight} گرم
              <Star className="h-3 w-3 text-gray-600" />
            </span>
          )}
        </div>

        <Link href={productLink} className="mb-3 block">
          <h3 className="text-sm font-medium leading-relaxed text-white transition-colors group-hover:text-[#D4AF37]">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto pt-2 border-t border-[#222]/50">
          <div className="flex flex-col items-end">
            <span className="text-lg font-bold text-[#D4AF37]">
              {formatPrice(product.price)} <span className="text-xs font-normal text-gray-500">تومان</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}