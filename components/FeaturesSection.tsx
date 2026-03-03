"use client"
import { motion } from "framer-motion";
import { BookOpen, Users, Target, Zap } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Live & Self-Paced Courses",
    description: "Learn at your own pace or join live sessions with industry experts. Structured curricula designed for real-world application.",
  },
  {
    icon: Users,
    title: "Mentorship & Guidance",
    description: "Get 1-on-1 career guidance from professionals who've been where you want to go. No guesswork, just clarity.",
  },
  {
    icon: Target,
    title: "Career Clarity",
    description: "We don't just teach skills — we help you map them to career opportunities, so every hour you invest has direction.",
  },
  {
    icon: Zap,
    title: "Community & Accountability",
    description: "Join a network of driven learners who push each other forward. Weekly check-ins, group projects, and real support.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pattern-dots pointer-events-none" />
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-eyebrow">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Why <span className="gradient-text">Navrademy</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We prioritize outcomes over promises. Every program is designed to give you
            skills you can use immediately.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="elevated-card p-6 group"
            >
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-5 transition-shadow duration-300 group-hover:shadow-lg group-hover:shadow-primary/20">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-heading font-bold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
