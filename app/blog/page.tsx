import BlogComponent from "@/components/BlogComponent";
import { type Blog, getBlogs } from "@/lib/blogSlug";

export const metadata = {
  title: "Navrademy Blog | Insights on Skills & Growth",
  description: "Read the Navrademy blog for insights on career growth, skills development, entrepreneurship, mentorship, and success strategies.",
};

export default async function BlogsPage() {
  const blogPosts = await getBlogs();
  const publishedBlogs: Blog[] = blogPosts.filter((b) => !b.draft);

  return <BlogComponent posts={publishedBlogs} />;
}