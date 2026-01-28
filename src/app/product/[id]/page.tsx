import { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ProductDetails from "@/components/ProductDetails"; // ایمپورت فایل جدید

type Props = {
  params: Promise<{ id: string }>;
};

// 1. تابع تولید متادیتای سئو (برای گوگل)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const { data: product } = await supabase
    .from("products")
    .select("name, description, image_url")
    .eq("id", id)
    .single();

  if (!product) {
    return {
      title: "محصول یافت نشد | گالری الف‌جم",
    };
  }

  return {
    title: `${product.name} | خرید از گالری الف‌جم`,
    description: product.description?.substring(0, 160) || "خرید اینترنتی طلا و جواهرات دست‌ساز",
    openGraph: {
      title: product.name,
      description: product.description?.substring(0, 160),
      images: [product.image_url],
    },
  };
}

// 2. کامپوننت اصلی صفحه (سمت سرور)
export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  // دریافت اطلاعات کامل محصول از دیتابیس
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  // اگر محصول نبود، برو به صفحه 404
  if (!product) {
    notFound();
  }

  // پاس دادن اطلاعات به کامپوننت کلاینت (ProductDetails)
  return <ProductDetails product={product} />;
}