import { motion } from "framer-motion";
import { Award, Building2, Users, CheckCircle } from "lucide-react";

const stats = [
  { icon: Users, value: "2,500+", label: "Students trained" },
  { icon: Award, value: "50+", label: "Expert mentors" },
  { icon: Building2, value: "10+", label: "Industry partners" },
  { icon: CheckCircle, value: "95%", label: "Career success rate" },
];

const CredibilitySection = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-eyebrow">Our Foundation</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
              Built on <span className="gradient-text">real-world experience</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Navrademy was born from <strong className="text-foreground">Navra Consult</strong> — a
              digital consulting firm that has helped businesses across Africa and beyond build
              brands, grow online, and execute digital strategies.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our courses aren't theoretical. They're built from campaigns we've run, products we've
              launched, and strategies we've executed. When we teach, we teach from the trenches.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="elevated-card rounded-lg p-4 group"
                >
                  <stat.icon className="h-5 w-5 text-primary mb-2 transition-transform duration-300 group-hover:scale-110" />
                  <p className="text-2xl font-heading font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="accent-card rounded-2xl p-8 lg:p-10">
              {/* Left accent line (rendered by accent-card::before) */}
              <blockquote className="text-lg leading-relaxed text-foreground/80 italic mb-6 pl-4 border-l-[3px] border-primary/30">
                "We didn't build Navrademy to add to the noise. We built it because we've seen
                firsthand how the right skills — combined with the right guidance — can completely
                change someone's trajectory."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold shadow-sm shadow-primary/20">N</div>
                <div>
                  <p className="font-heading font-bold">Founder, Navrademy</p>
                  <p className="text-sm text-muted-foreground">CEO, Navra Consult</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-primary/[0.06] blur-xl pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-primary/[0.04] blur-2xl pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CredibilitySection;
