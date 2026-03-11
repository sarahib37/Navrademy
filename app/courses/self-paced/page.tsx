"use client"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Clock, Play } from "lucide-react";
import { Sparkles, Mail } from "lucide-react";
import Link from "next/link";
import { COURSES } from "@/lib/courses";

const SelfPaced = COURSES.filter(c => c.category === "Self Paced")

const SelfPacedCourses = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        icon={Play}
        eyebrow="Learn at your own speed"
        titleAccent="Self-Paced"
        title="Courses"
        accentFirst
        subtitle="Recorded programs, toolkits, and short learning kits you can complete on your schedule."
      />

      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {SelfPaced.length > 0 ? (
            SelfPaced.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="elevated-card p-8 group flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent/20 text-accent">
                    {p.type}
                  </span>

                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {p.duration}
                  </span>
                </div>

                <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                  {p.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {p.description}
                </p>

                <div className="mb-6 flex-1">
                  <h4 className="font-heading font-bold text-sm mb-3">
                    What You'll Get
                  </h4>

                  <ul className="space-y-2">
                    {p.outcomes?.map((o: string) => (
                      <li
                        key={o}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button variant="hero" className="w-full" asChild>
                  <a href="/waitlist">
                    Enroll Now <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            ))
          ) : (
            <div className="accent-card p-10 lg:p-12 col-span-full text-center">
              <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-6 glow-coral-sm">
                <Sparkles className="h-8 w-8 text-primary-foreground" />
              </div>

              <h3 className="font-heading font-bold text-2xl mb-3">
                Coming Soon
              </h3>

              <p className="text-muted-foreground mb-8 leading-relaxed">
                We're currently building our self-paced course library. Be the first to know when new courses launch.
              </p>

              <Button variant="hero" size="lg" className="w-full" asChild>
                <Link href="/waitlist">
                  <Mail className="h-4 w-4 mr-2" />
                  Join the Waitlist
                </Link>
              </Button>
            </div>
          )}
        </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default SelfPacedCourses;