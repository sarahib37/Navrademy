import { motion } from "framer-motion";
import { Video, BookOpen, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const formats = [
  {
    icon: Video,
    title: "Live Courses",
    description: "Real-time, instructor-led sessions with Q&A, projects, and peer interaction. Learn with structure and accountability.",
    cta: "View Live Courses",
    link: "/courses/live",
    number: "01",
  },
  {
    icon: BookOpen,
    title: "Self-Paced Courses",
    description: "Pre-recorded programs and toolkits you can access anytime. Learn at your own speed with practical assignments.",
    cta: "Browse Self-Paced",
    link: "/courses/self-paced",
    number: "02",
  },
  {
    icon: Users,
    title: "Mentorship",
    description: "1-on-1 and group mentorship sessions for career clarity, skill direction, and personal growth.",
    cta: "Explore Mentorship",
    link: "/mentorship",
    number: "03",
  },
];

const LearningFormatsSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg-soft pointer-events-none" />
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-eyebrow">Learning Paths</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            How You'll <span className="gradient-text">Learn</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the format that fits your life. Every path leads to real outcomes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {formats.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="elevated-card rounded-xl p-8 group flex flex-col relative overflow-hidden"
            >
              {/* Step number watermark */}
              <span className="absolute top-4 right-5 text-6xl font-heading font-bold text-foreground/[0.03] group-hover:text-primary/[0.08] transition-colors duration-300">
                {item.number}
              </span>

              <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-6 transition-shadow duration-300 group-hover:shadow-lg group-hover:shadow-primary/20">
                <item.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{item.description}</p>
              <Button variant="heroOutline" size="default" className="w-full rounded-full" asChild>
                <Link to={item.link}>
                  {item.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningFormatsSection;
