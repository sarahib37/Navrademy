import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden dark-section"
        >
          {/* Pattern overlay */}
          <div className="absolute inset-0 pattern-overlay pointer-events-none" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/[0.06] blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[250px] h-[250px] rounded-full bg-primary/[0.04] blur-[100px] pointer-events-none" />

          <div className="relative px-8 py-16 md:px-16 md:py-20">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-primary/25 bg-primary/[0.08] text-sm text-primary font-medium">
                <Rocket className="h-3.5 w-3.5" />
                Start your journey
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-5 text-white">
                Ready to <span className="gradient-text">level up</span>?
              </h2>
              <p className="text-lg text-white/50 mb-8 leading-relaxed">
                Join thousands of learners building practical skills, gaining career clarity,
                and achieving real outcomes. Your transformation starts with one decision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl" className="rounded-full" asChild>
                  <Link to="/courses">
                    Start Learning Today
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="xl" className="rounded-full border-white/15 text-white hover:border-white/30 hover:bg-white/[0.04]" asChild>
                  <Link to="/contact">Talk to an Advisor</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
