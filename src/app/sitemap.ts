import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://alefgem.vercel.app'; // آدرس سایتت رو اگر دامنه خریدی اینجا بگذار

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. دریافت تمام محصولات برای ساخت لینک‌های داینامیک
  const { data: products } = await supabase
    .from('products')
    .select('id, created_at');

  const productUrls = (products || []).map((product) => ({
    url: `${BASE_URL}/product/${product.id}`,
    lastModified: new Date(product.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 2. لینک‌های ثابت سایت
  const staticRoutes = [
    '',
    '/shop',
    '/about',
    '/contact',
    '/faq',
    '/shipping',
    '/terms',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.6,
  }));

  return [...staticRoutes, ...productUrls];
}