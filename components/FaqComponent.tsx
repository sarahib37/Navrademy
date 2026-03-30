"use client"

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

type Props = {}

const faqSections = [
    {
      title: "About Navrademy",
      items: [
        {
          q: "What is Navrademy?",
          a: "Navrademy is a practical digital skills academy that helps beginners and professionals learn high-demand skills and become job-ready through hands-on training, real projects, and guided learning.",
        },
        {
          q: "Who is Navrademy for?",
          a: (
            <div className="space-y-2">
              <p>Navrademy is designed for:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Beginners with no tech background</li>
                <li>Students who want employable digital skills</li>
                <li>Professionals looking to switch careers or increase their income</li>
                <li>Anyone who wants to build digital services, freelance, or work remotely</li>
              </ul>
            </div>
          ),
        },
        {
          q: "Do I need a tech background to enroll?",
          a: "No. Our programs are beginner-friendly and structured to take you from zero to practical understanding, step by step.",
        },
      ],
    },
    {
      title: "Course Structure",
      items: [
        {
          q: "How long does each course last?",
          a: "Course duration varies depending on the program. Most cohort-based courses run between 4 to 8 weeks, including live sessions, practice, and project work.",
        },
        {
          q: "Are the classes live or pre-recorded?",
          a: (
            <div className="space-y-2">
              <p>Navrademy uses a hybrid learning model:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Live classes for teaching, interaction, and guidance</li>
                <li>Recorded sessions available for revision and flexibility</li>
              </ul>
            </div>
          ),
        },
        {
          q: "How many students are in each cohort?",
          a: "Our classes are intentionally small and close-knit to ensure personal attention, better interaction, and stronger learning support.",
        },
        {
          q: "Will there be practical projects?",
          a: "Yes. All programs are practice-focused. Students work on real-life tasks and projects to build experience and confidence, not just theoretical knowledge.",
        },
      ],
    },
    {
      title: "Career & Outcomes",
      items: [
        {
          q: "Will Navrademy help me get a job or internship?",
          a: (
            <div className="space-y-2">
              <p>Our focus is to make you job-ready. During the program, you will:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Build real project experience</li>
                <li>Create a portfolio</li>
                <li>Learn how to position your skills</li>
                <li>Get guidance on how to apply for internships, freelance opportunities, or entry-level roles</li>
              </ul>
              <p className="text-muted-foreground">We also collaborate with industry partners where opportunities are available.</p>
            </div>
          ),
        },
        {
          q: "What happens after I complete the course?",
          a: (
            <div className="space-y-2">
              <p>After completion, you'll have:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Practical experience</li>
                <li>A portfolio of your work</li>
                <li>Clear next steps for earning or gaining experience</li>
                <li>Access to the Navrademy community for ongoing support and opportunities</li>
              </ul>
            </div>
          ),
        },
        {
          q: "Will I receive a certificate?",
          a: "Yes. Students who complete the program and required projects will receive a certificate of completion.",
        },
      ],
    },
    {
      title: "Payment & Enrollment",
      items: [
        {
          q: "How much does each course cost?",
          a: "Course fees vary depending on the program. Pricing details are available on each course page.",
        },
        {
          q: "Do you offer payment plans or flexible options?",
          a: "Yes. Flexible payment options may be available for selected programs. You can check the course page or contact our team for available payment plans.",
        },
      ],
    },
];

export default function FaqComponent({}: Props) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        icon={HelpCircle}
        eyebrow="Got questions? We've got answers"
        title="Frequently Asked"
        titleAccent="Questions"
        subtitle="Everything you need to know about Navrademy, our courses, career outcomes, and enrollment — all in one place."
      />

      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          {faqSections.map((section, sIdx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sIdx * 0.08 }}
              className="mb-14 last:mb-0"
            >
              <div className="section-eyebrow">{section.title}</div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">
                {section.title}
              </h2>

              <Accordion type="single" collapsible className="space-y-3">
                {section.items.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`${sIdx}-${i}`}
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
            </motion.div>
          ))}
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  )
}