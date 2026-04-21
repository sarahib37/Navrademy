import { db } from "./firebaseAdmin";
import { Timestamp } from "firebase-admin/firestore";

export type Blog = {
    id: string;
    title: string;
    slug: string;
    category: string;
    content: string;
    excerpt: string;
    metaTitle?: string;
    metaDescription?: string;
    writerName?: string;
    tags?: string[];
    featuredImage?: string;
    featuredImageAlt: string;
    featuredImageTitle: string;
    draft?: boolean;
    createdAt?: string | null;
    updatedAt?: string | null;
};

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export const getBlogs = async (): Promise<Blog[]> => {
  try {
    const snapshot = await db
      .collection("blogs")
      .orderBy("createdAt", "desc")
      .get();

    return snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate().toISOString() ?? null,
        updatedAt: data.updatedAt?.toDate().toISOString() ?? null,
      };
    }) as Blog[];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};

export const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
  try {
    const snapshot = await db
      .collection("blogs")
      .where("slug", "==", slug)
      .limit(1)
      .get();

    if (snapshot.empty) return null;

    const docSnap = snapshot.docs[0];
    const data = docSnap.data();

    return {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt?.toDate().toISOString() ?? null,
      updatedAt: data.updatedAt?.toDate().toISOString() ?? null,
    } as Blog;
  } catch (error) {
    console.error("Firestore error:", error);
    return null;
  }
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);

export const processContentWithToc = (html: string): { html: string; toc: TocItem[] } => {
  if (typeof window === "undefined") return { html, toc: [] };
  const doc = new DOMParser().parseFromString(`<div>${html}</div>`, "text/html");
  const headings = doc.querySelectorAll("h2, h3");
  const toc: TocItem[] = [];
  const seen = new Map<string, number>();

  headings.forEach((h) => {
    const text = h.textContent?.trim() || "";
    if (!text) return;
    let id = slugify(text);
    const count = seen.get(id) || 0;
    if (count > 0) id = `${id}-${count}`;
    seen.set(slugify(text), count + 1);
    h.setAttribute("id", id);
    toc.push({ id, text, level: h.tagName === "H2" ? 2 : 3 });
  });

  return { html: doc.body.firstElementChild?.innerHTML || html, toc };
};

/**
 * Find related posts based on shared tags. Falls back to category match.
 */
export const findRelatedPosts = (current: Blog, all: Blog[], limit = 3): Blog[] => {
  const candidates = all.filter((p) => p.id !== current.id && !p.draft);
  const currentTags = new Set((current.tags || []).map((t) => t.toLowerCase()));

  if (currentTags.size === 0) {
    return candidates.filter((p) => p.category === current.category).slice(0, limit);
  }

  const scored = candidates.map((p) => {
    const overlap = (p.tags || []).filter((t) => currentTags.has(t.toLowerCase())).length;
    const categoryBonus = p.category === current.category ? 0.5 : 0;
    return { post: p, score: overlap + categoryBonus };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post);
};

/**
 * Build JSON-LD BlogPosting schema for SEO.
 */
// export const buildArticleSchema = (post: Blog, url: string) => ({
//   "@context": "https://schema.org",
//   "@type": "BlogPosting",
//   headline: post.seo?.seoTitle || post.title,
//   description: post.seo?.metaDescription || post.excerpt,
//   image: post.featuredImage?.src || undefined,
//   datePublished: post.date,
//   dateModified: post.date,
//   author: post.author.writerName
//     ? {
//         "@type": "Person",
//         name: post.author.writerName,
//         affiliation: { "@type": "Organization", name: post.author.name, url: "https://navrademy.com" },
//       }
//     : { "@type": "Organization", name: post.author.name, url: "https://navrademy.com" },
//   publisher: {
//     "@type": "Organization",
//     name: "Navrademy",
//     logo: {
//       "@type": "ImageObject",
//       url: "https://navrademy.com/logo.png",
//     },
//   },
//   mainEntityOfPage: {
//     "@type": "WebPage",
//     "@id": url,
//   },
//   keywords: (post.tags || []).join(", "),
//   articleSection: post.category,
// });