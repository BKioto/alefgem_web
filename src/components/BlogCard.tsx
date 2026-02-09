"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowLeft } from "lucide-react";
import { BlogPost } from "@/lib/types";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  // تبدیل تاریخ میلادی به شمسی (ساده)
  const date = new Date(post.created_at).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link 
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#222] bg-[#0a0a0a] transition-all duration-300 hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:-translate-y-1"
    >
      {/* بخش تصویر */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#111]">
        <Image
          src={post.image_url || "/placeholder.jpg"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60"></div>
      </div>

      {/* بخش محتوا */}
      <div className="flex flex-1 flex-col p-5">
        
        {/* تاریخ و نویسنده */}
        <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
          <Calendar className="h-3 w-3 text-[#D4AF37]" />
          <span>{date}</span>
          <span className="text-[#333]">|</span>
          <span>{post.author}</span>
        </div>

        {/* عنوان */}
        <h3 className="mb-3 text-lg font-bold text-white leading-snug transition-colors group-hover:text-[#D4AF37] line-clamp-2">
          {post.title}
        </h3>

        {/* خلاصه */}
        <p className="mb-4 text-sm text-gray-400 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        {/* دکمه ادامه مطلب */}
        <div className="mt-auto flex items-center text-sm font-medium text-[#D4AF37] opacity-80 transition-opacity group-hover:opacity-100">
          ادامه مطلب
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        </div>
      </div>
    </Link>
  );
}