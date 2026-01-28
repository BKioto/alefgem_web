"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// تعریف ساختار یک آیتم در سبد خرید
export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

// تعریف توابعی که این کانتکست در اختیار ما میذاره
type CartContextType = {
  items: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void; // <--- این تابع جدید اضافه شد
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // 1. بارگذاری سبد خرید از حافظه مرورگر در لحظه شروع
  useEffect(() => {
    const savedCart = localStorage.getItem("alefgem_cart");
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // 2. هر وقت سبد تغییر کرد، توی حافظه مرورگر هم ذخیره بشه
  useEffect(() => {
    // اگر سبد خالی شد، از لوکال استوریج هم پاک کن
    if (items.length === 0) {
      // این شرط برای جلوگیری از پاک شدن در لحظه اول لود (وقتی هنوز آیتم‌ها ست نشدن) نیست
      // اما سیو کردن آرایه خالی هم مشکلی نداره.
      // برای اطمینان بیشتر، سیو کردن رو همیشه انجام میدیم:
    }
    localStorage.setItem("alefgem_cart", JSON.stringify(items));
  }, [items]);

  // تابع افزودن به سبد
  const addToCart = (product: any) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // تابع حذف کامل یک آیتم
  const removeFromCart = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // افزایش تعداد
  const increaseQuantity = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // کاهش تعداد
  const decreaseQuantity = (id: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item;
        }
        return item;
      })
    );
  };

  // --- تابع جدید: خالی کردن کل سبد ---
  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("alefgem_cart");
  };

  // محاسبه تعداد کل آیتم‌ها
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // محاسبه قیمت کل
  const cartTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart, // <--- اکسپورت تابع جدید
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}