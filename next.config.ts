/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // برای عکس بنر صفحه اصلی
      },
      {
        protocol: 'https',
        hostname: 'vldrrmolibeznxhqpxit.supabase.co', // برای عکس محصولات (دامین پروژه سوپابیس خودت)
      },
      {
        protocol: 'https',
        hostname: 'placehold.co', // برای عکس‌های پیش‌فرض (احتیاطی)
      },
    ],
  },
};

export default nextConfig;