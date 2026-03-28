import Navbar from "@/components/Navbar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Image from "next/image";
import { AnimatedWrapper } from "@/components/AnimatedWrapper";
import { getBlogBySlug } from "@/lib/blogSlug";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const post = await getBlogBySlug(slug);

  if (!post) {
    return {
      title: "Blog Not Found",
      description: "This blog post does not exist.",
    };
  }

  if (post.draft) {
    return {
      title: "Private Blog",
      description: "This post is not published.",
      robots: { index: false, follow: false },
    };
  }

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;
  const image = post.featuredImage || "";

    return {
      title,
      description,

      openGraph: {
        title,
        description,
        type: "article",
        images: image ? [{ url: image }] : [],
      },

      twitter: {
        card: image ? "summary_large_image" : "summary",
        title,
        description,
        images: image ? [image] : [],
      },
    };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;

  const post = await getBlogBySlug(slug);

  if (!post) {
    return <div className="p-10 text-center">Blog not found</div>;
  }

  if (post.draft) {
    return <div className="p-10 text-center">This post is not published.</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <article className="pt-28 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <AnimatedWrapper>
            <span className="text-sm font-medium text-primary">{post.category}</span>
            {post.featuredImage && (
              <div className="relative w-full h-64 mt-4 mb-6">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            )}
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2 mb-4">{post.title}</h1>
            {/* <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime} read</span>
            </div> */}

            <div
              className="prose prose-sm sm:prose max-w-none text-foreground prose-headings:text-foreground prose-blockquote:border-primary prose-blockquote:text-muted-foreground prose-a:text-primary prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </AnimatedWrapper>
        </div>
      </article>

      <CTASection />
      <Footer />
    </div>
  );
}