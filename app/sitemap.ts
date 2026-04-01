import type { MetadataRoute } from "next";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const BASE_URL = "https://navrademy.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const coursesSnap = await getDocs(collection(db, "courses"));
  const courses = coursesSnap.docs.map((doc) => ({
    url: `${BASE_URL}/courses/${doc.id}`,
    lastModified: new Date(),
  }));

  const blogsSnap = await getDocs(collection(db, "blogs"));
  const blogs = blogsSnap.docs.map((doc) => ({
    url: `${BASE_URL}/blog/${doc.id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/courses`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/events`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/community`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/mentorship`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/success-story`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/waitlist`,
      lastModified: new Date(),
    },
    ...courses,
    ...blogs,
  ];
}