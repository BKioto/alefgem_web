import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext"; 
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-vazir",
});

// *** آدرس اصلی دامنه (حیاتی برای سئو) ***
const SITE_URL = "https://alefgem.com";

// --- 1. تنظیمات متادیتا (سئو و کلمات کلیدی) ---
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  title: {
    template: "%s | گالری الف‌جم",
    default: "گالری الف‌جم | خرید آنلاین طلا، جواهرات دست‌ساز و سنگ‌های قیمتی",
  },
  description: "مرجع تخصصی خرید اینترنتی طلای ۱۸ عیار، ساخت پلاک اسم سفارشی، انگشتر عقیق و فیروزه، گردنبند و دستبند طلا. ضمانت اصالت سنگ‌های معدنی و ارسال بیمه‌شده به سراسر ایران در گالری الف‌جم.",
  keywords: [
    "خرید طلا آنلاین", "خرید جواهرات دست‌ساز", "سفارش پلاک اسم طلا", 
    "سنگ قیمتی اصل", "انگشتر عقیق مردانه", "گردنبند طلا زنانه", 
    "طلای ۱۸ عیار", "گالری طلا اهواز", "ساخت طلا سفارشی", "خرید سنگ ماه تولد",
    "فروشگاه اینترنتی طلا", "قیمت طلا امروز", "هدیه طلا خاص"
  ],
  authors: [{ name: "AlefGem Gallery" }],
  creator: "AlefGem Team",
  publisher: "AlefGem Gallery",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // تنظیم آیکون‌ها
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/web-app-manifest-192x192.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      {
         rel: 'apple-touch-icon-precomposed',
         url: '/apple-touch-icon.png',
      },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "گالری الف‌جم | درخشش ابدی و اصالت ماندگار",
    description: "خرید امن و آنلاین جدیدترین مدل‌های طلا و جواهرات دست‌ساز. ارائه فاکتور رسمی و ضمانت سنگ‌های قیمتی.",
    url: SITE_URL,
    siteName: "گالری طلا و جواهر الف‌جم",
    images: [
      {
        url: "/web-app-manifest-512x512.png", // لوگوی بزرگ برای اشتراک‌گذاری
        width: 512,
        height: 512,
        alt: "لوگوی گالری الف‌جم",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "گالری الف‌جم | جواهرات خاص و دست‌ساز",
    description: "خرید آنلاین طلا و سنگ‌های قیمتی با گارانتی و فاکتور رسمی.",
    images: ["/web-app-manifest-512x512.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// --- 2. تنظیمات اسکیما (JSON-LD) برای گوگل ---
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "JewelryStore", // نوع بیزینس: فروشگاه طلا و جواهر
  "name": "گالری الف‌جم",
  "image": [
    `${SITE_URL}/logo.png`,
    `${SITE_URL}/web-app-manifest-512x512.png`
  ],
  "@id": SITE_URL,
  "url": SITE_URL,
  "telephone": "+989167008252",
  "priceRange": "IRR", // واحد پول
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "وهابی، سیتی سنتر خلیج فارس، طبقه دوم، واحد C23",
    "addressLocality": "Ahvaz",
    "addressRegion": "Khuzestan",
    "postalCode": "61638", 
    "addressCountry": "IR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 31.3200,
    "longitude": 48.6690
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday"
    ],
    "opens": "10:00",
    "closes": "22:00"
  },
  "sameAs": [
    "https://instagram.com/alefgem",
    "https://t.me/alefgem"
  ],
  "description": "گالری الف‌جم، مرکز تخصصی طراحی و ساخت طلا و جواهرات دست‌ساز، فروش سنگ‌های قیمتی اصل و ارائه خدمات طلاسازی در اهواز و سراسر ایران."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.className} bg-[#050505] text-[#F3F4F6] antialiased`}>
        
        {/* تزریق اسکیما به هدر سایت */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* کل سایت رو در آغوش سبد خرید قرار میدیم */}
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}