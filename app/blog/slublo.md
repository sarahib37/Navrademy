import BlogSlugComponent from "@/components/BlogSlugComponent";
import { getBlogBySlug } from "@/lib/blogSlug";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
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

  return <BlogSlugComponent post={post}/>
}