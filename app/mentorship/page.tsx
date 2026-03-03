"use client"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, Users, Compass } from "lucide-react";

const programs = [
  {
    icon: User,
    title: "One-on-One Mentorship",
    description: "Personalized guidance sessions with an industry professional tailored to your career goals, skill gaps, and growth plan.",
    features: ["Bi-weekly 1-hour sessions", "Personalized career roadmap", "Portfolio & resume review", "Interview preparation"],
  },
  {
    icon: Users,
    title: "Group Mentorship",
    description: "Small-group sessions with 5-8 learners focused on specific skills or career tracks, led by an experienced mentor.",
    features: ["Weekly group sessions", "Peer accountability", "Collaborative projects", "Industry networking"],
  },
  {
    icon: Compass,
    title: "Career Clarity Sessions",
    description: "Structured sessions designed to help you identify your strengths, explore career paths, and create a clear action plan.",
    features: ["Skills assessment", "Career path mapping", "Goal setting framework", "90-day action plan"],
  },
];

const Mentorship = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        icon={Compass}
        eyebrow="Personalized career guidance"
        titleAccent="Mentorship"
        title="Programs"
        accentFirst
        subtitle="Get personalized guidance from professionals who've been where you want to go."
      />

      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="elevated-card p-8 group flex flex-col"
              >
                <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-6 group-hover:glow-coral-sm transition-all">
                  <p.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{p.description}</p>
                <ul className="space-y-2 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full gradient-bg shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant="hero" className="w-full" asChild>
                  <a href="/contact">Apply Now <ArrowRight className="h-4 w-4" /></a>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Mentorship;