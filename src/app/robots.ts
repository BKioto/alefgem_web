import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://alefgem.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/cart', '/checkout', '/success', '/api/'], // این صفحات نباید ایندکس شوند
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}