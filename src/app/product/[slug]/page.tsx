import { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ProductDetails from "@/components/ProductDetails";

type Props = {
  params: Promise<{ slug: string }>;
};

// 1. تولید متادیتای سئو با استفاده از Slug
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  // چون اسلاگ فارسی در URL انکود میشه، باید دیکودش کنیم
  const decodedSlug = decodeURIComponent(slug);

  const { data: product } = await supabase
    .from("products")
    .select("name, description, image_url, meta_title, meta_description")
    .eq("slug", decodedSlug)
    .single();

  if (!product) {
    return {
      title: "محصول یافت نشد | گالری الف‌جم",
    };
  }

  return {
    title: product.meta_title || `${product.name} | خرید از گالری الف‌جم`,
    description: product.meta_description || product.description?.substring(0, 160) || "خرید اینترنتی طلا و جواهرات دست‌ساز",
    openGraph: {
      title: product.name,
      description: product.description?.substring(0, 160),
      images: [product.image_url],
    },
  };
}

// 2. کامپوننت اصلی صفحه
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  // جستجو بر اساس slug به جای id
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", decodedSlug)
    .single();

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}