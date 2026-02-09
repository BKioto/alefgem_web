import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ChevronRight, Tag } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { BlogPost } from "@/lib/types";

interface Props {
  params: Promise<{ slug: string }>;
}

// 1. تولید متادیتای سئو برای هر مقاله
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const { data: post } = await supabase
    .from("posts")
    .select("title, excerpt, image_url, seo_title, seo_description")
    .eq("slug", decodedSlug)
    .single();

  if (!post) {
    return {
      title: "مقاله یافت نشد | گالری الف‌جم",
    };
  }

  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      images: post.image_url ? [post.image_url] : [],
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  // دریافت اطلاعات کامل مقاله
  const { data: rawPost } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", decodedSlug)
    .single();

  if (!rawPost) {
    notFound();
  }

  const post = rawPost as BlogPost;

  // تنظیم تاریخ شمسی
  const date = new Date(post.created_at).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // اسکیما برای گوگل (Article Schema)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.seo_title || post.title,
    "image": post.image_url,
    "author": {
      "@type": "Person",
      "name": post.author || "تحریریه الف‌جم"
    },
    "publisher": {
      "@type": "Organization",
      "name": "گالری الف‌جم",
      "logo": {
        "@type": "ImageObject",
        "url": "https://alefgem.com/logo.png"
      }
    },
    "datePublished": post.created_at,
    "description": post.seo_description || post.excerpt
  };

  return (
    <div className="min-h-screen bg-[#050505] pb-20 pt-10">
      
      {/* اسکریپت اسکیما */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* نوار مسیر (Breadcrumb) */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#D4AF37]">خانه</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/blog" className="hover:text-[#D4AF37]">مجله الف‌جم</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-300 line-clamp-1">{post.title}</span>
        </div>

        {/* تصویر اصلی مقاله */}
        <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-2xl border border-[#222]">
          <Image
            src={post.image_url || "/placeholder.jpg"}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80"></div>
          
          <div className="absolute bottom-0 right-0 w-full p-6 sm:p-10">
            <div className="mb-4 flex items-center gap-4 text-sm text-gray-300">
               <span className="flex items-center gap-1 bg-[#D4AF37] text-black px-2 py-0.5 rounded font-bold text-xs">
                 <User className="h-3 w-3" /> {post.author}
               </span>
               <span className="flex items-center gap-1">
                 <Calendar className="h-4 w-4 text-[#D4AF37]" /> {date}
               </span>
            </div>
            <h1 className="text-2xl font-bold text-white sm:text-4xl leading-tight text-shadow">
              {post.title}
            </h1>
          </div>
        </div>

        {/* متن مقاله */}
        <article className="prose prose-invert prose-lg max-w-none prose-headings:text-[#D4AF37] prose-a:text-[#D4AF37] prose-strong:text-white prose-img:rounded-xl">
            {/* چکیده */}
            {post.excerpt && (
                <div className="mb-8 rounded-xl border-r-4 border-[#D4AF37] bg-[#111] p-6 text-lg italic text-gray-300 leading-8">
                    {post.excerpt}
                </div>
            )}

            {/* محتوای اصلی HTML */}
            <div 
                className="text-gray-300 leading-8 space-y-6 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-[#D4AF37] [&>ul]:list-disc [&>ul]:pr-5 [&>ol]:list-decimal [&>ol]:pr-5"
                dangerouslySetInnerHTML={{ __html: post.content || "" }} 
            />
        </article>

        {/* تگ‌ها */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2 border-t border-[#222] pt-8">
            <span className="ml-2 text-gray-500">برچسب‌ها:</span>
            {post.tags.map((tag, idx) => (
              <div key={idx} className="flex items-center gap-1 rounded-full border border-[#333] bg-[#111] px-3 py-1 text-xs text-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37]">
                <Tag className="h-3 w-3" />
                {tag}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}