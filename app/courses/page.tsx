"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Users, Signal, BookOpen } from "lucide-react";
import Link from "next/link";

const liveCourses = [
  { title: "Digital Marketing Mastery", duration: "8 Weeks", students: "320+", level: "Beginner", description: "Learn SEO, social media, paid ads, and analytics from practitioners running real campaigns." },
  { title: "UI/UX Design Bootcamp", duration: "10 Weeks", students: "250+", level: "Intermediate", description: "From wireframes to high-fidelity prototypes. Build a portfolio that gets you hired." },
  { title: "Product Management", duration: "12 Weeks", students: "180+", level: "Advanced", description: "Strategy, roadmapping, stakeholder management — everything you need to lead product teams." },
];

const selfPaced = [
  { title: "Data Analytics Fundamentals", duration: "6 Weeks", students: "480+", level: "Beginner", description: "Excel, SQL, Power BI and Python basics. Turn raw data into actionable insights." },
  { title: "Web Development", duration: "14 Weeks", students: "600+", level: "Beginner", description: "HTML, CSS, JavaScript, React. Build real projects and deploy them to the web." },
];

const upcoming = [
  { title: "AI & Automation", duration: "8 Weeks", students: "Waitlist", level: "Intermediate", description: "Leverage AI tools, prompt engineering, and automation workflows to 10x your productivity." },
  { title: "Content Strategy", duration: "6 Weeks", students: "Waitlist", level: "Beginner", description: "Learn to plan, create, and distribute content that drives real business results." },
];

const CourseCard = ({
  course,
  variant,
}: {
  course: typeof liveCourses[0];
  variant: "live" | "self-paced" | "upcoming";
}) => {
  const categoryLabel =
    variant === "live"
      ? "Live Course"
      : variant === "self-paced"
      ? "Self-Paced"
      : "Upcoming";

  const categoryClass =
    variant === "live"
      ? "bg-primary/20 text-primary"
      : variant === "self-paced"
      ? "bg-accent/20 text-accent"
      : "bg-muted text-muted-foreground";

  const href =
    variant === "upcoming"
      ? "/waitlist"
      : variant === "live"
      ? "/courses/live"
      : "/courses/self-paced";

  const buttonText =
    variant === "upcoming"
      ? "Join Waitlist"
      : variant === "live"
      ? "Apply Now"
      : "Enroll Now";

  return (
    <div className="accent-card p-6 flex flex-col">
      <span
        className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryClass} mb-4 inline-block self-start`}
      >
        {categoryLabel}
      </span>

      <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">
        {course.title}
      </h3>

      <p className="text-sm text-muted-foreground mb-5 leading-relaxed flex-1">
        {course.description}
      </p>

      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {course.duration}
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5" />
          {course.students}
        </span>
        <span className="flex items-center gap-1">
          <Signal className="h-3.5 w-3.5" />
          {course.level}
        </span>
      </div>

      <Button
        variant={variant === "upcoming" ? "heroOutline" : "hero"}
        size="default"
        className="w-full"
        asChild
      >
        <Link href={href}>{buttonText}</Link>
      </Button>
    </div>
  );
};

export default function Courses() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <PageHero
        icon={BookOpen}
        eyebrow="Career-focused programs"
        title="All"
        titleAccent="Courses"
        subtitle="Practical, career-focused programs designed by industry professionals."
      />

      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8">
          {[
            { label: "Live Courses", data: liveCourses, variant: "live" as const },
            { label: "Self-Paced Courses", data: selfPaced, variant: "self-paced" as const },
            { label: "Upcoming Courses", data: upcoming, variant: "upcoming" as const },
          ].map((section) => (
            <div key={section.label} className="mb-16">
              <div className="section-eyebrow">{section.label}</div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.data.map((c, i) => (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <CourseCard course={c} variant={section.variant} />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}