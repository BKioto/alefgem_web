// src/app/page.tsx
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedSection from "@/components/FeaturedSection"; 
import TrustFeatures from "@/components/TrustFeatures";
import SeoDescription from "@/components/SeoDescription";
import CalculatorCTA from "@/components/CalculatorCTA"; // <--- اضافه شد

export default function Home() {
  return (
    <>
      <Hero />
      <TrustFeatures />
      <Categories />
      <FeaturedSection />
      <CalculatorCTA /> {/* <--- اضافه شد: بنر ماشین حساب */}
      <SeoDescription />
    </>
  );
}