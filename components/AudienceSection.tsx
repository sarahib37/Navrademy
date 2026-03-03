import { motion } from "framer-motion";
import { GraduationCap, RefreshCw, Briefcase, ArrowRight } from "lucide-react";

const audiences = [
  {
    icon: GraduationCap,
    title: "Students",
    description: "Bridge the gap between your degree and real-world digital skills employers actually need.",
  },
  {
    icon: RefreshCw,
    title: "Career Switchers",
    description: "Navigate your transition with structured learning, mentorship, and a clear roadmap into a new field.",
  },
  {
    icon: Briefcase,
    title: "Professionals",
    description: "Level up your current skill set with advanced courses designed around practical, on-the-job application.",
  },
];

const AudienceSection = () => {
  return (
    <section className="section-padding gradient-bg-warm">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-eyebrow">Built For You</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Who <span className="gradient-text">Navrademy</span> Is For
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether you're starting out, switching lanes, or scaling up — we meet you where you are.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {audiences.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="accent-card rounded-xl p-8 group"
            >
              <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-6 transition-shadow duration-300 group-hover:shadow-lg group-hover:shadow-primary/20">
                <item.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.description}</p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                Learn more <ArrowRight className="h-3 w-3" />
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
