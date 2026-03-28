"use client";

import { motion } from "framer-motion";

export const AnimatedWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative rounded-2xl overflow-hidden dark-section p-8 lg:p-12 text-center max-w-3xl mx-auto"
    >
      {children}
    </motion.div>
  );
};