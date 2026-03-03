"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Clock,
  Users,
  Signal,
  BookOpen,
  CheckCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Link from "next/link";

const courses = [
  {
    title: "Digital Marketing Mastery",
    category: "Live Course",
    duration: "8 Weeks",
    students: "320+",
    level: "Beginner",
    description:
      "Learn SEO, social media, paid ads, and analytics from practitioners running real campaigns.",
    highlights: [
      "SEO & Content Strategy",
      "Social Media Marketing",
      "Paid Advertising (Google & Meta)",
      "Analytics & Reporting",
    ],
  },
  {
    title: "UI/UX Design Bootcamp",
    category: "Live Course",
    duration: "10 Weeks",
    students: "250+",
    level: "Intermediate",
    description:
      "From wireframes to high-fidelity prototypes. Build a portfolio that gets you hired.",
    highlights: [
      "User Research & Personas",
      "Wireframing & Prototyping",
      "Figma Mastery",
      "Portfolio Development",
    ],
  },
  {
    title: "Data Analytics Fundamentals",
    category: "Self-Paced",
    duration: "6 Weeks",
    students: "480+",
    level: "Beginner",
    description:
      "Excel, SQL, Power BI and Python basics. Turn raw data into actionable insights.",
    highlights: [
      "Excel & Google Sheets",
      "SQL for Data Analysis",
      "Power BI Dashboards",
      "Python Basics",
    ],
  },
  {
    title: "Product Management",
    category: "Live Course",
    duration: "12 Weeks",
    students: "180+",
    level: "Advanced",
    description:
      "Strategy, roadmapping, stakeholder management — everything you need to lead product teams.",
    highlights: [
      "Product Strategy",
      "Roadmap Planning",
      "Stakeholder Management",
      "Agile & Scrum",
    ],
  },
  {
    title: "Web Development",
    category: "Self-Paced",
    duration: "14 Weeks",
    students: "600+",
    level: "Beginner",
    description:
      "HTML, CSS, JavaScript, React. Build real projects and deploy them to the web.",
    highlights: [
      "HTML & CSS Fundamentals",
      "JavaScript & TypeScript",
      "React Framework",
      "Deployment & Git",
    ],
  },
  {
    title: "AI & Automation",
    category: "Upcoming",
    duration: "8 Weeks",
    students: "Waitlist",
    level: "Intermediate",
    description:
      "Leverage AI tools, prompt engineering, and automation workflows to 10x your productivity.",
    highlights: [
      "Prompt Engineering",
      "AI Tools & APIs",
      "Workflow Automation",
      "Real-World Projects",
    ],
  },
];

const categoryStyles: Record<string, string> = {
  "Live Course": "bg-primary/10 text-primary border border-primary/20",
  "Self-Paced":
    "bg-coral-warm/10 text-coral-warm border border-coral-warm/20",
  Upcoming: "bg-muted text-muted-foreground border border-border/50",
};

export default function CoursesSection() {
  const [selectedCourse, setSelectedCourse] =
    useState<typeof courses[0] | null>(null);

  const getHref = (category: string) => {
    if (category === "Upcoming") return "/waitlist";
    if (category === "Live Course") return "/courses/live";
    return "/courses/self-paced";
  };

  const getButtonText = (category: string) => {
    if (category === "Upcoming") return "Join Waitlist";
    if (category === "Live Course") return "Apply Now";
    return "Enroll Now";
  };

  return (
    <section id="courses" className="section-padding gradient-bg-warm">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4"
        >
          <div>
            <span className="section-eyebrow">Explore Programs</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
              Our <span className="gradient-text">Courses</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Practical, career-focused programs designed by industry professionals.
            </p>
          </div>

          <Button variant="heroOutline" size="lg" asChild>
            <Link href="/courses">
              View All Courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="elevated-card rounded-xl overflow-hidden group cursor-pointer"
              onClick={() => setSelectedCourse(course)}
            >
              <div className="p-6">
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryStyles[course.category]}`}
                >
                  {course.category}
                </span>

                <h3 className="text-xl font-heading font-bold mt-4 mb-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-primary/60" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-primary/60" />
                    {course.students}
                  </span>
                  <span className="flex items-center gap-1">
                    <Signal className="h-3.5 w-3.5 text-primary/60" />
                    {course.level}
                  </span>
                </div>
              </div>

              <div className="px-6 pb-6">
                <Button
                  variant={
                    course.category === "Upcoming" ? "heroOutline" : "hero"
                  }
                  size="default"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCourse(course);
                  }}
                >
                  {course.category === "Upcoming"
                    ? "Join Waitlist"
                    : "Learn More"}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog
        open={!!selectedCourse}
        onOpenChange={(open) => !open && setSelectedCourse(null)}
      >
        <DialogContent className="sm:max-w-[640px] rounded-2xl p-0 overflow-hidden">
          {selectedCourse && (
            <>
              <div className="gradient-bg-rich p-6 pb-8">
                <DialogHeader>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/20 text-white w-fit mb-3">
                    {selectedCourse.category}
                  </span>
                  <DialogTitle className="text-2xl font-heading font-bold text-white">
                    {selectedCourse.title}
                  </DialogTitle>
                  <DialogDescription className="text-white/80 mt-1">
                    {selectedCourse.description}
                  </DialogDescription>
                </DialogHeader>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-heading font-semibold text-foreground flex items-center gap-2 mb-3">
                    <BookOpen className="h-4 w-4 text-primary" />
                    What You'll Learn
                  </h4>
                  <ul className="space-y-2">
                    {selectedCourse.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button variant="hero" size="lg" className="w-full" asChild>
                  <Link href={getHref(selectedCourse.category)}>
                    {getButtonText(selectedCourse.category)}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}