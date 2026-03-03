"use client"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const categories = ["All", "Career Reality Checks", "Skill Trends", "Future of Work", "Learning Insights"];

const posts = [
  { title: "Why Your Degree Isn't Enough Anymore", category: "Career Reality Checks", excerpt: "The job market has changed. Here's what employers actually want in 2026.", date: "Feb 1, 2026", readTime: "5 min" },
  { title: "Top 5 Digital Skills to Learn This Year", category: "Skill Trends", excerpt: "From AI literacy to data storytelling, these are the skills driving hiring decisions.", date: "Jan 28, 2026", readTime: "4 min" },
  { title: "The Future of Remote Work in Africa", category: "Future of Work", excerpt: "How distributed teams are reshaping career opportunities across the continent.", date: "Jan 22, 2026", readTime: "6 min" },
  { title: "How to Actually Finish an Online Course", category: "Learning Insights", excerpt: "Completion rates are abysmal. Here's a framework that works.", date: "Jan 15, 2026", readTime: "4 min" },
  { title: "From Accountant to UX Designer: A Real Story", category: "Career Reality Checks", excerpt: "How one Navrademy student made a complete career switch in 6 months.", date: "Jan 10, 2026", readTime: "7 min" },
  { title: "AI Won't Take Your Job — But Someone Using AI Will", category: "Future of Work", excerpt: "Understanding the real impact of AI on your career trajectory.", date: "Jan 5, 2026", readTime: "5 min" },
];

const Blog = () => {
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

      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((c) => (
              <button key={c} className="px-4 py-2 text-sm rounded-full border border-border hover:border-primary/50 hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-all">
                {c}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.article key={post.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="elevated-card overflow-hidden group">
                <div className="h-40 gradient-bg-soft relative">
                  <div className="absolute inset-0 pattern-dots" />
                </div>
                <div className="p-6">
                  <span className="text-xs text-primary font-medium">{post.category}</span>
                  <h3 className="text-lg font-heading font-bold mt-2 mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    <span>{post.readTime} read</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Blog;
