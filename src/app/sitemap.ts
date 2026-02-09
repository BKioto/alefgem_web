import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

const BASE_URL = 'https://alefgem.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. دریافت محصولات برای سایت‌مپ
  const { data: products } = await supabase
    .from('products')
    .select('id, slug, created_at');

  const productUrls = (products || []).map((product) => ({
    url: `${BASE_URL}/product/${product.slug || product.id}`,
    lastModified: new Date(product.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 2. دریافت مقالات بلاگ برای سایت‌مپ (بخش جدید)
  const { data: posts } = await supabase
    .from('posts')
    .select('slug, created_at')
    .eq('published', true);

  const postUrls = (posts || []).map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7, // اولویت مقالات کمی کمتر از محصولات
  }));

  // 3. صفحات ثابت سایت
  const staticRoutes = [
    '',
    '/shop',
    '/blog', // صفحه اصلی بلاگ اضافه شد
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

  return [...staticRoutes, ...productUrls, ...postUrls];
}