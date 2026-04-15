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
    featuredImage?: string;
    featuredImageAlt: string;
    featuredImageTitle: string;
    draft?: boolean;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
};

export const getBlogs = async (): Promise<Blog[]> => {
  try {
    const snapshot = await db
      .collection("blogs")
      .orderBy("createdAt", "desc")
      .get();

    return snapshot.docs.map((doc) => {
      const data = doc.data() as Omit<Blog, "id">;

      return {
        id: doc.id,
        ...data,
      };
    });
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