import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import BlogCard from "@/components/BlogCard";
import { BlogPost } from "@/lib/types";
import { BookOpen, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "مجله الف‌جم | مقالات تخصصی طلا و جواهر",
  description: "جدیدترین مقالات آموزشی در مورد خرید طلا، تشخیص سنگ‌های قیمتی و راهنمای سرمایه‌گذاری در بازار طلا و سکه.",
};

export default async function BlogPage() {
  // دریافت مقالات منتشر شده از دیتابیس
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
  }

  const blogPosts = (posts as BlogPost[]) || [];

  return (
    <div className="min-h-screen bg-[#050505] pb-20 pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* هدر صفحه */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#111] text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            <BookOpen className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            مجله تخصصی <span className="text-[#D4AF37]">الف‌جِم</span>
          </h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            راهنمای جامع خرید طلا، تشخیص سنگ‌های قیمتی و اخبار بازار طلا و سکه
          </p>
        </div>

        {/* لیست مقالات */}
        {blogPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          // حالت خالی (اگر مقاله‌ای نبود)
          <div className="flex flex-col items-center justify-center rounded-2xl border border-[#222] bg-[#0a0a0a] py-20 text-center">
            <AlertCircle className="mb-4 h-12 w-12 text-gray-600" />
            <h3 className="text-xl font-bold text-white">هنوز مقاله‌ای منتشر نشده است</h3>
            <p className="mt-2 text-gray-400">به زودی با مطالب جذاب برمی‌گردیم.</p>
          </div>
        )}

      </div>
    </div>
  );
}