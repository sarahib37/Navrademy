"use client"

import Navbar from "@/components/Navbar";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";


type Props = {
  params: Promise<{
    slug: string;
  }>;
};

//
// ✅ METADATA (SEO)
//
// export async function generateMetadata({ params }: Props) {
//   const { slug } = await params; // ✅ FIX

//   if (!slug) {
//     return {
//       title: "Invalid Blog",
//       description: "No slug provided",
//     };
//   }

//   try {
//     const q = query(
//       collection(db, "blogs"),
//       where("slug", "==", slug)
//     );

//     const snapshot = await getDocs(q);

//     if (snapshot.empty) {
//       return {
//         title: "Blog Not Found",
//         description: "This blog post does not exist.",
//       };
//     }

//     const post = snapshot.docs[0].data();

//     if (post.draft) {
//       return {
//         title: "Private Blog",
//         description: "This post is not published.",
//         robots: { index: false, follow: false },
//       };
//     }

//     return {
//       title: post.metaTitle || post.title,
//       description: post.metaDescription || post.excerpt,
//       openGraph: {
//         title: post.metaTitle || post.title,
//         description: post.metaDescription || post.excerpt,
//         type: "article",
//       },
//       twitter: {
//         card: "summary_large_image",
//         title: post.metaTitle || post.title,
//         description: post.metaDescription || post.excerpt,
//       },
//     };
//   } catch (error) {
//     console.error("Metadata error:", error);

//     return {
//       title: "Error",
//       description: "Something went wrong.",
//     };
//   }
// }

//
// ✅ PAGE
//
export default async function BlogPost({ params }: Props) {
  const { slug } = await params; // ✅ FIX

  if (!slug) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        Invalid blog URL
      </div>
    );
  }

  try {
    const q = query(
      collection(db, "blogs"),
      where("slug", "==", slug)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return (
        <div className="p-10 text-center text-muted-foreground">
          Blog not found
        </div>
      );
    }

    const post = snapshot.docs[0].data();

    if (post.draft) {
      return (
        <div className="p-10 text-center text-muted-foreground">
          This post is not published.
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background">
        <Navbar />

        <article className="pt-28 pb-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-sm font-medium text-primary">{post.category}</span>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2 mb-4">{post.title}</h1>
              {/* <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime} read</span>
              </div> */}

              <div
                className="prose prose-sm sm:prose max-w-none text-foreground prose-headings:text-foreground prose-blockquote:border-primary prose-blockquote:text-muted-foreground prose-a:text-primary prose-strong:text-foreground"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </motion.div>
          </div>
        </article>

        <CTASection />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error loading blog:", error);

    return (
      <div className="p-10 text-center text-muted-foreground">
        Something went wrong while loading this post.
      </div>
    );
  }
}