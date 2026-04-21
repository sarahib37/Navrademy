"use client"

import Navbar from "@/components/Navbar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { processContentWithToc, type Blog } from "@/lib/blogSlug";
import { useMemo } from "react";
import { TableOfContents } from "./TableOfContents";

type Props = {
    post: Blog;
};

export default function BlogSlugComponent({post}: Props) {
  const { html: processedHtml, toc } = useMemo(
    () => (post ? processContentWithToc(post.content) : { html: "", toc: [] }),
    [post]
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <article className="pt-28 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-sm font-medium text-primary">{post.category}</span>
            {post.featuredImage && (
              <div className="relative w-full h-64 mt-4 mb-6">
                <Image
                  src={post.featuredImage}
                  alt={post.featuredImageAlt} 
                  title={post.featuredImageTitle}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            )}
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2 mb-4">{post.title}</h1>

            <div className="flex items-center gap-3">
                  {/* <Avatar className="h-11 w-11 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                      {post.author.avatar}
                    </AvatarFallback>
                  </Avatar> */}
                  {/* <div>
                    <p className="text-sm font-semibold text-foreground">
                      {post.author.writerName ? (
                        <>
                          {post.author.writerName}
                          <span className="text-muted-foreground font-normal"> · {post.author.name}</span>
                        </>
                      ) : (
                        post.author.name
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">{post.author.role}</p>
                  </div> */}
                </div>
            {/* <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime} read</span>
            </div> */}

            {toc.length > 0 && (
              <div className="lg:hidden mb-8">
                <TableOfContents items={toc} />
              </div>
            )}

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
  )
}