"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { ShoppingBag, Search, Menu, X, Instagram, Phone } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // برای مدیریت سرچ
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // دریافت تعداد آیتم‌ها از سبد
  const { cartCount } = useCart();

  // قفل کردن اسکرول وقتی منو بازه
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  // تابع انجام سرچ
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); 
    if (searchQuery.trim()) {
      // کاربر رو بفرست به صفحه فروشگاه
      router.push("/shop"); 
      setIsSearchOpen(false); // بستن کادر سرچ
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-[#222] bg-[#050505]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          
          {/* --- بخش راست: لوگو و منوی موبایل --- */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-gray-300 hover:text-[#D4AF37] lg:hidden"
            >
              <Menu className="h-7 w-7" />
            </button>
            
            <Link href="/" className="text-2xl font-bold text-[#D4AF37] tracking-wider">
              الف‌جِم
            </Link>
          </div>

          {/* --- بخش وسط: منوی دسکتاپ --- */}
          <div className="hidden items-center gap-8 lg:flex">
            <Link href="/" className="text-sm font-medium text-gray-300 hover:text-[#D4AF37] transition-colors">
              خانه
            </Link>
            <Link href="/shop" className="text-sm font-medium text-gray-300 hover:text-[#D4AF37] transition-colors">
              فروشگاه
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-[#D4AF37] transition-colors">
              درباره ما
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-300 hover:text-[#D4AF37] transition-colors">
              تماس با ما
            </Link>
          </div>

          {/* --- بخش چپ: آیکون‌ها (سرچ و سبد خرید) --- */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* کامپوننت سرچ */}
            <div className="relative">
              {isSearchOpen ? (
                // اگر سرچ باز بود: نمایش کادر ورودی
                <form onSubmit={handleSearch} className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center">
                  <input
                    autoFocus
                    type="text"
                    placeholder="جستجو..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onBlur={() => !searchQuery && setIsSearchOpen(false)} 
                    className="w-32 rounded-lg border border-[#D4AF37] bg-[#111] px-2 py-1 text-sm text-white focus:outline-none sm:w-48 transition-all"
                  />
                  <button type="button" onClick={() => setIsSearchOpen(false)} className="mr-2 text-gray-400 hover:text-red-500">
                    <X className="h-4 w-4" />
                  </button>
                </form>
              ) : (
                // اگر سرچ بسته بود: نمایش آیکون
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-gray-300 hover:text-[#D4AF37] transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
              )}
            </div>
            
            {/* دکمه سبد خرید */}
            <Link href="/cart" className={`relative p-2 text-gray-300 hover:text-[#D4AF37] transition-colors ${isSearchOpen ? 'hidden sm:block' : ''}`}>
              <ShoppingBag className="h-6 w-6" />
              {/* نمایش عدد واقعی */}
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4AF37] text-[10px] font-bold text-black animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

        </div>
      </nav>

      {/* --- منوی موبایل (با پس‌زمینه مشکی کامل) --- */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      <div 
        className={`fixed top-0 right-0 z-[70] h-full w-[85%] max-w-[320px] bg-[#0a0a0a] border-l border-[#222] shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-6">
          <div className="flex items-center justify-between mb-10 border-b border-[#222] pb-6">
            <span className="text-xl font-bold text-[#D4AF37]">الف‌جِم</span>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-full border border-[#333] p-2 text-gray-400 hover:bg-[#222] hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-2">
            {[
              { name: "صفحه اصلی", href: "/" },
              { name: "فروشگاه محصولات", href: "/shop" },
              { name: "درباره ما", href: "/about" },
              { name: "تماس با ما", href: "/contact" },
              { name: "سبد خرید", href: "/cart" },
            ].map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg p-3 text-lg font-medium text-gray-300 hover:bg-[#111] hover:text-[#D4AF37] transition-all"
              >
                {link.name}
                <span className="text-[#333] text-sm">❮</span>
              </Link>
            ))}
            
            <div className="my-6 border-t border-[#222]"></div>
            
            <Link href="/faq" onClick={() => setIsMobileMenuOpen(false)} className="block p-3 text-sm text-gray-500 hover:text-white">
               سوالات متداول
            </Link>
            <Link href="/shipping" onClick={() => setIsMobileMenuOpen(false)} className="block p-3 text-sm text-gray-500 hover:text-white">
               رویه ارسال و بازگشت
            </Link>
          </nav>

          <div className="mt-auto border-t border-[#222] pt-6">
            <div className="flex justify-center gap-6">
              <a href="#" className="text-gray-500 hover:text-[#D4AF37] transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="tel:09167008252" className="text-gray-500 hover:text-[#D4AF37] transition-colors">
                <Phone className="h-6 w-6" />
              </a>
            </div>
            <p className="mt-4 text-center text-xs text-gray-600">
              © طراحی شده برای الف‌جم
            </p>
          </div>
        </div>
      </div>
    </>
  );
}