"use client"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { BookOpen } from "lucide-react";  
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { type Blog } from "@/lib/blogSlug";

type Props = {
    posts: Blog[];
  };

export default function BlogComponent({ posts }: Props) {

    return(
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
                    {posts.length === 0 ? (
                        <div className="text-center py-20">
                            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
                            <h3 className="text-xl font-heading font-bold text-foreground mb-2">No blog posts yet</h3>
                            <p className="text-muted-foreground text-sm">Check back soon for insights on careers, skills, and the future of work.</p>
                        </div>
                    ) : (
                        <section className="section-padding">
                            <div className="container mx-auto px-4 lg:px-8">
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {posts.map((post, i) => (
                                        <motion.article key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="elevated-card overflow-hidden group">
                                        <Link href={`/blog/${post.slug}`}>
                                            <div className="h-40 gradient-bg-soft relative">
                                                {post.featuredImage ? <Image src={post.featuredImage} alt={post.title}/> : <div className="absolute inset-0 pattern-dots" />}
                                            </div>
                                            <div className="p-6">
                                                <span className="text-xs text-primary font-medium">{post.category}</span>
                                                <h3 className="text-lg font-heading font-bold mt-2 mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                                                <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                                            </div>
                                        </Link>
                                        </motion.article>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </section>

            <CTASection />
            <Footer />
        </div>
    )
}