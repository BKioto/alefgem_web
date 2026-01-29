import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

const BASE_URL = 'https://alefgem.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // دریافت محصولات همراه با slug
  const { data: products } = await supabase
    .from('products')
    .select('id, slug, created_at');

  const productUrls = (products || []).map((product) => ({
    // اینجا از slug استفاده میکنیم. اگر slug نبود (محصولات قدیمی) از id استفاده میکنه
    url: `${BASE_URL}/product/${product.slug || product.id}`,
    lastModified: new Date(product.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

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