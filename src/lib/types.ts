// src/lib/types.ts

export interface Product {
  id: number;
  created_at: string;
  name: string;
  description: string | null;
  price: number;
  sku: string;
  category_name: string;
  tags: string[] | null;
  image_url: string;
  gallery_images: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  is_featured: boolean;
  weight: number;
  stone_price: number;
  stock_quantity: number;
  wage: number;
  slug: string; // <--- این جدید اضافه شد
}