// src/lib/types.ts

export interface Product {
  id: number;
  created_at: string;
  name: string;          // قبلا title بود، الان شد name
  description: string | null;
  price: number;
  sku: string;
  category_name: string; // قبلا category بود
  tags: string[] | null;
  image_url: string;     // عکس اصلی
  gallery_images: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  is_featured: boolean;
  weight: number;        // اضافه شد
  stone_price: number;   // اضافه شد
  stock_quantity: number;
  wage: number;          // اجرت
}