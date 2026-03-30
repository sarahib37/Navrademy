"use client"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { Users, BookOpen, Shield, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const pillars = [
    { icon: Users, title: "Student Communities", description: "Join cohort-based groups where you learn, share, and grow alongside peers on the same journey." },
    { icon: MessageCircle, title: "Peer Learning", description: "Structured group discussions, study sessions, and collaborative projects that deepen understanding." },
    { icon: Shield, title: "Accountability Systems", description: "Weekly check-ins, goal tracking, and partner systems to keep you moving forward consistently." },
    { icon: BookOpen, title: "Ongoing Support", description: "Access to resources, Q&A sessions, and community events long after your course ends." },
];


export default function CommunityComponent() {
  return(
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        icon={Users}
        eyebrow="Learning is better together"
        title="Our"
        titleAccent="Community"
        subtitle="Join a network of driven individuals who support and challenge each other."
      />

      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pillars.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="elevated-card p-8 group">
                <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-6 group-hover:glow-coral-sm transition-all">
                  <p.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  )
}