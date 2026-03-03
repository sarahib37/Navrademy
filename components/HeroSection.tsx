"use client"

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-[75px] dark-section-deep">
      {/* Pattern overlay */}
      <div className="absolute inset-0 pattern-overlay pointer-events-none" />

      {/* Ambient glows — coral only */}
      <div className="absolute top-[15%] right-[20%] w-[500px] h-[500px] rounded-full bg-primary/[0.07] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[350px] h-[350px] rounded-full bg-coral-warm/[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute top-[60%] right-[5%] w-[200px] h-[200px] rounded-full bg-primary/[0.05] blur-[80px] pointer-events-none" />

      {/* Geometric accents */}
      <div className="absolute top-40 right-20 w-px h-28 bg-gradient-to-b from-transparent via-primary/25 to-transparent hidden lg:block" />
      <div className="absolute bottom-40 left-20 w-px h-20 bg-gradient-to-b from-transparent via-primary/15 to-transparent hidden lg:block" />
      <div className="absolute top-32 right-[45%] w-20 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent hidden lg:block" />

      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-primary/25 bg-primary/[0.08] text-sm text-primary font-medium backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Future-proof your career
              <ArrowRight className="h-3 w-3 ml-1" />
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.08] mb-7 text-white"
          >
            Gain clarity. <span className="gradient-text">Build real skills.</span> <span className="text-white/85">Own your future.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-white/55 max-w-xl mb-10 leading-relaxed"
          >
            Navrademy helps students, career switchers, and professionals gain practical,
            future-proof digital skills through live courses, mentorship, and a community
            that keeps you accountable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="hero" size="xl" className="rounded-full" asChild>
              <a href="/courses">
                Explore Courses
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="heroOutline"
              size="xl"
              className="rounded-full border-white/15 text-white hover:border-white/30 hover:bg-white/[0.04]"
              asChild
            >
              <a href="/about">
                <Play className="h-4 w-4 mr-1" />
                Learn More
              </a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 pt-8 border-t border-white/[0.06]"
          >
            <div className="flex flex-wrap gap-4 md:gap-5">
              {[
                { value: "2,500+", label: "Students Enrolled" },
                { value: "50+", label: "Expert Mentors" },
                { value: "95%", label: "Career Success Rate" },
              ].map((stat) => (
                <div key={stat.label} className="stat-pill">
                  <div className="w-1.5 h-8 rounded-full gradient-bg opacity-70" />
                  <div>
                    <span className="block text-xl md:text-2xl font-heading font-bold text-white">{stat.value}</span>
                    <span className="text-[11px] text-white/35 uppercase tracking-wider">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;