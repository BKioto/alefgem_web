// src/components/GoldCalculator.tsx
"use client";

import { useState, useEffect } from "react";
import { Calculator, RefreshCw, TrendingUp, Info } from "lucide-react";

export default function GoldCalculator() {
  const [loading, setLoading] = useState(true);
  
  // مقادیر ورودی کاربر و سیستم
  const [goldPrice, setGoldPrice] = useState<number>(0); 
  const [weight, setWeight] = useState<string>(""); 
  const [wagePercent, setWagePercent] = useState<string>("0"); 
  const [profitPercent, setProfitPercent] = useState<string>("7"); 
  const [taxPercent, setTaxPercent] = useState<string>("9"); 

  // مقادیر محاسبه شده
  const [results, setResults] = useState({
    goldValue: 0,
    wageAmount: 0,
    profitAmount: 0,
    taxAmount: 0,
    finalPrice: 0,
  });

  // دریافت اطلاعات از API که در قدم قبلی ساختیم
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gold-price");
      const data = await res.json();
      
      if (data.success) {
        setGoldPrice(data.price);
        setProfitPercent(String(data.defaults.profit));
        setTaxPercent(String(data.defaults.tax));
        setWagePercent(String(data.defaults.wage));
      }
    } catch (error) {
      console.error("Failed to fetch gold price", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // محاسبه خودکار (هر بار که یکی از ورودی‌ها تغییر کنه)
  useEffect(() => {
    const w = parseFloat(weight) || 0;
    const p = parseFloat(profitPercent) || 0;
    const t = parseFloat(taxPercent) || 0;
    const wageP = parseFloat(wagePercent) || 0;
    const gPrice = goldPrice;

    // 1. قیمت خام طلا (وزن * قیمت تابلو)
    const goldValue = w * gPrice;
    
    // 2. مبلغ اجرت (درصدی از قیمت خام)
    const wageAmount = goldValue * (wageP / 100);
    
    // 3. قیمت پایه (طلا + اجرت)
    const basePrice = goldValue + wageAmount;
    
    // 4. سود فروشنده (درصدی از قیمت پایه)
    const profitAmount = basePrice * (p / 100);
    
    // 5. مالیات (فقط روی سود و اجرت طبق قانون جدید)
    const taxAmount = (wageAmount + profitAmount) * (t / 100);
    
    // 6. قیمت نهایی
    const finalPrice = basePrice + profitAmount + taxAmount;

    setResults({
      goldValue,
      wageAmount,
      profitAmount,
      taxAmount,
      finalPrice,
    });
  }, [weight, goldPrice, wagePercent, profitPercent, taxPercent]);

  const formatPrice = (price: number) => Math.round(price).toLocaleString("fa-IR");

  if (loading) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-2xl border border-[#222] bg-[#0a0a0a] text-[#D4AF37]">
        <RefreshCw className="ml-2 h-6 w-6 animate-spin" />
        <span className="text-lg">در حال دریافت نرخ لحظه‌ای طلا...</span>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-[#222] bg-[#0a0a0a] shadow-2xl">
      
      {/* هدر ماشین حساب */}
      <div className="flex flex-col items-center justify-between gap-4 border-b border-[#222] bg-[#111] p-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[#D4AF37] p-2 text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            <Calculator className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">محاسبه‌گر قیمت طلا</h2>
            <p className="mt-1 text-xs text-gray-400">
              نرخ لحظه‌ای: <span className="font-mono text-sm font-bold text-[#D4AF37]">{formatPrice(goldPrice)}</span> تومان
            </p>
          </div>
        </div>
        <button 
          onClick={fetchData} 
          className="flex items-center gap-2 rounded-lg border border-[#333] px-3 py-2 text-sm text-gray-400 transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
          title="بروزرسانی نرخ"
        >
          <RefreshCw className="h-4 w-4" />
          بروزرسانی
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-12">
        
        {/* ستون ورودی‌ها */}
        <div className="space-y-5 md:col-span-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">وزن طلا (گرم)</label>
            <input 
              type="number" 
              value={weight} 
              onChange={(e) => setWeight(e.target.value)} 
              placeholder="مثال: 4.5" 
              className="w-full rounded-xl border border-[#333] bg-[#050505] px-4 py-3 text-lg font-bold text-white placeholder-gray-600 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">اجرت ساخت (%)</label>
            <input 
              type="number" 
              value={wagePercent} 
              onChange={(e) => setWagePercent(e.target.value)} 
              className="w-full rounded-xl border border-[#333] bg-[#050505] px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">سود (%)</label>
              <input 
                type="number" 
                value={profitPercent} 
                onChange={(e) => setProfitPercent(e.target.value)} 
                className="w-full rounded-xl border border-[#333] bg-[#050505] px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">مالیات (%)</label>
              <input 
                type="number" 
                value={taxPercent} 
                onChange={(e) => setTaxPercent(e.target.value)} 
                className="w-full rounded-xl border border-[#333] bg-[#050505] px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none" 
              />
            </div>
          </div>
          
          <div className="flex items-start gap-2 rounded-lg border border-blue-900/30 bg-blue-900/10 p-3 text-xs text-blue-200">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
            <p>قیمت طلا به صورت خودکار دریافت می‌شود. مالیات بر اساس قانون جدید فقط بر «سود» و «اجرت» محاسبه می‌گردد.</p>
          </div>
        </div>

        {/* ستون نتایج */}
        <div className="flex flex-col justify-center rounded-xl border border-[#222] bg-[#111]/50 p-6 md:col-span-7">
          <h3 className="mb-6 border-b border-[#333] pb-2 font-medium text-gray-400">جزئیات قیمت</h3>
          
          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center text-gray-300">
              <span>قیمت خام طلا ({weight || '0'} گرم):</span>
              <span className="font-mono font-medium">{formatPrice(results.goldValue)} تومان</span>
            </div>
            <div className="flex justify-between items-center text-gray-400">
              <span>اجرت ساخت:</span>
              <span className="font-mono">{formatPrice(results.wageAmount)} تومان</span>
            </div>
            <div className="flex justify-between items-center text-gray-400">
              <span>سود فروشنده ({profitPercent}%):</span>
              <span className="font-mono">{formatPrice(results.profitAmount)} تومان</span>
            </div>
            <div className="flex justify-between items-center text-gray-400">
              <span>مالیات و عوارض ({taxPercent}%):</span>
              <span className="font-mono">{formatPrice(results.taxAmount)} تومان</span>
            </div>
          </div>

          <div className="mt-8 border-t-2 border-dashed border-[#333] pt-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-white">
                <TrendingUp className="h-6 w-6 text-green-500" />
                <span className="text-lg font-bold">قیمت نهایی:</span>
              </div>
              <span className="text-2xl font-extrabold text-[#D4AF37] sm:text-3xl">
                {formatPrice(results.finalPrice)} <span className="text-sm font-normal text-gray-500">تومان</span>
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}