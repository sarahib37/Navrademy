"use client"

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, HelpCircle } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const previewFaqs = [
  {
    q: "Do I need a tech background to enroll?",
    a: "No. Our programs are beginner-friendly and structured to take you from zero to practical understanding, step by step.",
  },
  {
    q: "Are the classes live or pre-recorded?",
    a: "Navrademy uses a hybrid learning model — live classes for teaching, interaction, and guidance, plus recorded sessions available for revision and flexibility.",
  },
  {
    q: "Will Navrademy help me get a job or internship?",
    a: "Our focus is to make you job-ready. You'll build real project experience, create a portfolio, learn how to position your skills, and get guidance on applying for opportunities.",
  },
  {
    q: "Do you offer payment plans or flexible options?",
    a: "Yes. Flexible payment options may be available for selected programs. Check the course page or contact our team for details.",
  },
];

const FAQPreviewSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-primary/20 bg-primary/[0.06] text-sm text-primary font-medium">
            <HelpCircle className="h-3.5 w-3.5" />
            Common Questions
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Got <span className="gradient-text">Questions?</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Here are answers to some of the most common questions from prospective students.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {previewFaqs.map((item, i) => (
              <AccordionItem
                key={i}
                value={`preview-${i}`}
                className="elevated-card border-none px-6 rounded-xl"
              >
                <AccordionTrigger className="text-left font-medium text-[15px] hover:no-underline py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-10">
            <Button variant="heroOutline" size="lg" className="rounded-full" asChild>
              <Link href="/faq">
                View All FAQs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQPreviewSection;