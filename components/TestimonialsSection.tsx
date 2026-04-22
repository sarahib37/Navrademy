"use client"
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Folashade Bright",
    role: "SEO Specialist",
    quote: "Navrademy is more than a place to learn, it feels like home and family. The mentorship program was one of the greatest gifts I received in 2025.",
    initials: "FB",
  },
  {
    name: "Joseph Ogwu",
    role: "SEO Specialist",
    quote: "Navrademy didn’t just teach me a skill, it changed my trajectory. Thanks to Navrademy, I’ve secured multiple paid internships, gained international recognition, and consulted with U.S.-based students in SEO and Web3",
    initials: "JO",
  },
  {
    name: "Preye Deborah Nwaku",
    role: "SEO Specialist",
    quote: "Navrademy showed me what happens when you stop guessing and start learning the right way.",
    initials: "PN",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pattern-dots pointer-events-none opacity-60" />
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-eyebrow">Student Stories</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Real <span className="gradient-text">Results</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't take our word for it — hear from students who transformed their careers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="elevated-card rounded-xl p-7 relative group"
            >
              {/* Decorative quote */}
              <Quote className="absolute top-5 right-5 h-8 w-8 text-primary/[0.06] group-hover:text-primary/[0.12] transition-colors" />

              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-primary/80 text-primary/80" />
                ))}
              </div>
              <p className="text-foreground/80 mb-7 leading-relaxed text-[15px]">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold shadow-sm shadow-primary/20">
                  {t.initials}
                </div>
                <div>
                  <p className="font-heading font-bold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
