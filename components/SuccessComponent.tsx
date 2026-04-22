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
      name: "Joseph Ogwu",
      role: "SEO Specialist",
      type: "Student Journey",
      story: "I started my SEO course with Navrademy in October while working full-time, attending classes in the evenings and studying late into the night. The journey was demanding, but the structure and clarity kept me going. By December, I graduated as the top student. Since then, I’ve secured multiple paid internships, gained international recognition, and consulted with U.S.-based students in SEO and Web3. Navrademy didn’t just teach me a skill, it changed my trajectory.",
      outcome: "Graduated as top student, secured global opportunities.",
    },
    {
      name: "Folashade Bright",
      role: "SEO Specialist",
      type: "Student Journey",
      story: "Navrademy is more than a place to learn, it feels like home and family. The mentorship program was one of the greatest gifts I received in 2025. From personal growth to building a strong portfolio, every class was impactful. The tutors are deeply invested in your progress, and the community is supportive, no competition, just growth. As a writer, the SEO class helped me structure my ideas better and optimize my writing for visibility.",
      outcome: "Improved writing clarity and SEO optimization skills",
    },
    {
      name: "Okwanuzor Oputa Hephzibah",
      role: "SEO Specialist",
      type: "Student Journey",
      story: "I started my SEO journey with Navrademy while balancing my final year in Pharmacy school, managing classes, projects, and practical SEO tasks at the same time. It was intense, with deadlines often overlapping, but I stayed consistent. I was recognized multiple times as Best Student of the Week, and after graduating, I began applying SEO to my work as a content writer, helping businesses turn engagement into paying customers.",
      outcome: "Recognized for excellence, applied SEO to real business growth.",
    },
    {
      name: "Preye Deborah Nwaku",
      role: "SEO Specialist",
      type: "Student Journey",
      story: "I finished university confused, with no clear path or direction. But everything changed when I joined Navrademy in October. The step-by-step learning, practical tasks, and mentorship gave me clarity and real progress. I wasn’t just learning theory, I was building skills that made sense, alongside a community pushing each other to grow. I graduated as a Top 3 student in my cohort and secured an internship immediately after. Navrademy showed me what happens when you stop guessing and start learning the right way.",
      outcome: "Top 3 graduate, secured internship immediately after.",
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