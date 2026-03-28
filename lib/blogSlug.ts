import { db } from "./firebaseAdmin";

export type Blog = {
    id: string;
    title: string;
    slug: string;
    category: string;
    content: string;
    excerpt: string;
    metaTitle?: string;
    metaDescription?: string;
    featuredImage?: string;
    draft?: boolean;
    createdAt?: any;
    updatedAt?: any;
};

export const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
  try {
    const snapshot = await db
      .collection("blogs")
      .where("slug", "==", slug)
      .limit(1)
      .get();

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];

    return {
      id: doc.id,
      ...(doc.data() as Omit<Blog, "id">),
    };
  } catch (error) {
    console.error("Firestore error:", error);
    return null;
  }
};