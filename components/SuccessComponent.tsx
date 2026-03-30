"use client"

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { Star, Trophy } from "lucide-react";
import { motion } from "framer-motion";

type Props = {}

const stories = [
    {
      name: "Adaeze Okafor",
      role: "Digital Marketer",
      type: "Student Journey",
      story: "After graduating with a degree in Mass Communication, I spent 8 months applying to jobs with no success. Navrademy's Digital Marketing course gave me the hands-on skills and portfolio I needed. I landed my first client within 3 weeks of finishing.",
      outcome: "Landed first freelance client in 3 weeks",
    },
    {
      name: "Samuel Mensah",
      role: "Product Manager",
      type: "Career Switch",
      story: "I was a project manager in construction for 5 years. The mentorship program helped me map my transferable skills, build a product portfolio, and transition into tech. The one-on-one guidance was invaluable.",
      outcome: "Transitioned from construction to tech PM",
    },
    {
      name: "Fatima Bello",
      role: "UX Designer",
      type: "Student Journey",
      story: "I switched from banking to UX design in 4 months. The bootcamp was intense but structured perfectly. The portfolio project at the end is what got me interviews at 3 companies.",
      outcome: "Hired as UX Designer within 4 months",
    },
    {
      name: "Chidi Nwankwo",
      role: "Data Analyst",
      type: "Pilot Outcome",
      story: "I joined during the pilot phase of the Data Analytics course. Even then, the quality was exceptional. The SQL and Power BI skills I learned are what I use every single day at work now.",
      outcome: "Promoted to senior analyst role",
    },
];

export default function SuccessComponent({}: Props) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        icon={Trophy}
        eyebrow="Real people, real results"
        title="Success"
        titleAccent="Stories"
        subtitle="Real people. Real transformations. See what's possible with the right skills and guidance."
      />

      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {stories.map((s, i) => (
              <motion.div key={s.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="accent-card p-8">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/20 text-primary mb-4 inline-block">{s.type}</span>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-primary text-primary" />)}
                </div>
                <p className="text-foreground/90 leading-relaxed italic mb-6">"{s.story}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-heading font-bold">{s.name}</p>
                    <p className="text-sm text-muted-foreground">{s.role}</p>
                  </div>
                  <span className="text-xs text-primary font-medium max-w-[160px] text-right">{s.outcome}</span>
                </div>
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