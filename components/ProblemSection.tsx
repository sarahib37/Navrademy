import { motion } from "framer-motion";
import { AlertTriangle, Compass, TrendingUp } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    title: "The Career Confusion Crisis",
    description: "Millions of graduates and professionals are overwhelmed by options, certifications, and conflicting advice — leaving them stuck and unsure where to start.",
  },
  {
    icon: Compass,
    title: "Skills Without Direction",
    description: "Most online courses teach theory without context. You finish with knowledge but no clarity on how to apply it or what career path to follow.",
  },
  {
    icon: TrendingUp,
    title: "Navrademy Is Your Guide",
    description: "We combine practical skills training with career mentorship and accountability — so you don't just learn, you execute and grow with confidence.",
  },
];

const ProblemSection = () => {
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
          <span className="section-eyebrow">The Challenge</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            The <span className="gradient-text">Problem</span> We Solve
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The modern career landscape is broken. We're here to fix it.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="accent-card rounded-xl p-8 text-center group"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/[0.08] flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/[0.12] transition-colors duration-300">
                <item.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
