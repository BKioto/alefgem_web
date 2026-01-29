import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedSection from "@/components/FeaturedSection"; 
import TrustFeatures from "@/components/TrustFeatures"; // جدید
import SeoDescription from "@/components/SeoDescription"; // جدید

export default function Home() {
  return (
    <>
      <Hero />
      <TrustFeatures /> {/* اضافه شد: زیر هیرو برای جلب اعتماد */}
      <Categories />
      <FeaturedSection />
      <SeoDescription /> {/* اضافه شد: انتهای صفحه برای سئو */}
    </>
  );
}