"use client"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

// const categories = ["All", "Career Reality Checks", "Skill Trends", "Future of Work", "Learning Insights"];

const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const publishedBlogs = blogPosts.filter(b => !b.draft)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(
          collection(db, "blogs"),
          orderBy("createdAt", "desc") // newest first
        );
  
        const querySnapshot = await getDocs(q);
  
        const blogs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        setBlogPosts(blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        icon={BookOpen}
        eyebrow="Insights & resources"
        title="The"
        titleAccent="Blog"
        subtitle="Insights on careers, skills, and the future of work."
      />

      {
        loading ? <p className="text-muted-foreground">Loading blogs...</p> :
        
        publishedBlogs.length === 0 ? (
          <div className="text-center py-20">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">No blog posts yet</h3>
              <p className="text-muted-foreground text-sm">Check back soon for insights on careers, skills, and the future of work.</p>
            </div>
        ) : (
        <section className="section-padding">
          <div className="container mx-auto px-4 lg:px-8">
            {/* <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((c) => (
                <button key={c} className="px-4 py-2 text-sm rounded-full border border-border hover:border-primary/50 hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-all">
                  {c}
                </button>
              ))}
            </div> */}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedBlogs.map((post, i) => (
                <motion.article key={post.id}
                onClick={() => router.push(`/blog/${post.slug}`)}
                className="elevated-card overflow-hidden group cursor-pointer" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <div className="h-40 gradient-bg-soft relative">
                    <div className="absolute inset-0 pattern-dots" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-primary font-medium">{post.category}</span>
                    <h3 className="text-lg font-heading font-bold mt-2 mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      {/* <span>{post.date}</span>
                      <span>{post.readTime} read</span> */}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
        )
      }     
      <CTASection />
      <Footer />
    </div>
  );
};

export default Blogs;