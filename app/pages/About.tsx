"use client"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { motion } from "framer-motion";
import { Building2, Target, Eye, Heart, Sparkles } from "lucide-react";

const values = [
  { icon: Target, title: "Clarity Over Hype", description: "We cut through noise to give you clear, actionable direction." },
  { icon: Heart, title: "Outcomes Over Promises", description: "Everything we build is measured by real results, not vanity metrics." },
  { icon: Eye, title: "Trust Over Noise", description: "We earn trust through transparency, quality, and consistency." },
  { icon: Building2, title: "Execution Over Theory", description: "Our programs are designed around doing, not just knowing." },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        icon={Sparkles}
        eyebrow="Our mission & story"
        title="Why"
        titleAccent="Navrademy"
        subtitle="The education system wasn't built for the digital economy. Navrademy was created to bridge the gap between outdated curricula and the skills the modern world actually demands."
      />

      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-24">
            <div className="accent-card p-8 lg:p-10">
              <div className="section-eyebrow">The Challenge</div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">The Problem We Solve</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Millions of people are stuck — not because they lack ambition, but because they lack clarity. The internet is full of courses, certifications, and advice, but very few resources connect learning to real career outcomes.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Navrademy was founded to end that confusion. We provide structured learning paths, practical skills, and dedicated mentorship so every learner knows exactly where they're headed.
              </p>
            </div>
            <div className="accent-card p-8 lg:p-10">
              <div className="section-eyebrow">Our Roots</div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">Our Relationship with <span className="gradient-text">Navra Consult</span></h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Navrademy is the education arm of Navra Consult, a digital consulting firm that has helped brands across Africa build strategies, run campaigns, and grow online.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This means our courses aren't academic exercises — they're distilled from real campaigns, real clients, and real results. When we teach digital marketing, we teach from the trenches.
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-24">
            <div className="text-center mb-12">
              <div className="section-eyebrow justify-center">What we stand for</div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">
                Our <span className="gradient-text">Values</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="elevated-card p-6 group">
                  <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center mb-4 group-hover:glow-coral-sm transition-all">
                    <v.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading font-bold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative rounded-2xl overflow-hidden dark-section p-8 lg:p-12 text-center max-w-3xl mx-auto">
            <div className="absolute inset-0 pattern-overlay pointer-events-none" />
            <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/[0.06] blur-[100px] pointer-events-none" />
            <div className="relative">
              <div className="section-eyebrow justify-center text-primary/80">From the founder</div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-white">Founder's Vision</h2>
              <blockquote className="text-lg text-white/70 italic leading-relaxed mb-6">
                "I believe every person deserves access to practical education that respects their time, intelligence, and ambition. Navrademy is built to deliver exactly that — no fluff, no false promises, just real skills that lead to real outcomes."
              </blockquote>
              <p className="font-heading font-bold text-primary">Founder, Navrademy & Navra Consult</p>
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default About;
