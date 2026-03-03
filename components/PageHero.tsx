import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  icon?: LucideIcon;
  /** Controls order: true = accent first, false = accent last (default) */
  accentFirst?: boolean;
}

const PageHero = ({ eyebrow, title, titleAccent, subtitle, icon: Icon, accentFirst = false }: PageHeroProps) => {
  return (
    <section className="relative pt-[75px] dark-section-deep overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 pattern-overlay pointer-events-none" />

      {/* Ambient glows */}
      <div className="absolute top-[20%] right-[15%] w-[400px] h-[400px] rounded-full bg-primary/[0.06] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[250px] h-[250px] rounded-full bg-coral-warm/[0.04] blur-[100px] pointer-events-none" />

      {/* Geometric accents */}
      <div className="absolute top-40 right-20 w-px h-20 bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden lg:block" />
      <div className="absolute bottom-20 left-16 w-16 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent hidden lg:block" />

      <div className="container relative mx-auto px-4 lg:px-8 py-20 md:py-28 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-primary/25 bg-primary/[0.08] text-sm text-primary font-medium backdrop-blur-sm">
            {Icon && <Icon className="h-3.5 w-3.5" />}
            {eyebrow}
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] mb-6 text-white">
            {accentFirst ? (
              <>
                <span className="gradient-text">{titleAccent}</span> {title}
              </>
            ) : (
              <>
                {title} <span className="gradient-text">{titleAccent}</span>
              </>
            )}
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
      </div>

      {/* Bottom fade to page background */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default PageHero;
