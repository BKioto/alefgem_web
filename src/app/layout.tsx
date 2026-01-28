import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext"; 
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "گالری الف‌جم | خرید آنلاین طلا و جواهرات",
  description: "خرید اینترنتی امن انواع جواهرات طلا ۱۸ عیار، سنگ‌های معدنی اصل در گالری الف‌جم.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.className} bg-[#050505] text-[#F3F4F6] antialiased`}>
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