"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock, Users, Signal, BookOpen, Play, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Course } from "@/lib/courses";

type Props = {
  live: Course[];
  selfPaced: Course[];
  upcoming: Course[];
};

const tabs = [
  { key: "live", label: "Live Courses", icon: Signal },
  { key: "self-paced", label: "Self-Paced", icon: Play },
] as const;

type TabKey = (typeof tabs)[number]["key"];

export default function CoursesComponent({ live, selfPaced }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>("live");

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

          {/* Tabs */}
          <div className="flex justify-center mb-14">
            <div className="relative inline-flex rounded-full bg-muted p-1.5 gap-1">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key;

                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`relative z-10 flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition ${
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="coursesTabBg"
                        className="absolute inset-0 rounded-full gradient-bg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-2">
                      <tab.icon className="h-4 w-4" />
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">

            {/* LIVE */}
            {activeTab === "live" && (
              <motion.div
                key="live"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                {live.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {live.map((course, i) => {
                      
                     const safeId = course.title
                     .toLowerCase()
                     .replace(/\s+/g, "-")
                     .replace(/[^\w-]/g, "");
  
                    return(
                      <motion.div
                        key={course.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <div className="accent-card p-6 flex flex-col h-full">

                          {/* Badge */}
                          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4 inline-block self-start">
                            {(course.type).toUpperCase()}
                          </span>

                          {/* Title */}
                          <h3 className="text-xl font-heading font-bold mb-2">
                            {course.title}
                          </h3>

                          {/* Description */}
                          <p className="text-sm text-muted-foreground mb-5 flex-1">
                            {course.description}
                          </p>

                          {/* Meta */}
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

                          {/* CTA */}
                          <Button variant="heroOutline" className="w-full" asChild>
                            <Link href={`/courses/live#${safeId}`}>
                              View More <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>

                        </div>
                      </motion.div>
                    )})}
                  </div>
                ) : (
                  <EmptyState />
                )}
              </motion.div>
            )}

            {/* SELF PACED */}
            {activeTab === "self-paced" && (
              <motion.div
                key="self-paced"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                {selfPaced.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selfPaced.map((course, i) => (
                      <motion.div
                        key={course.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <div className="accent-card p-6 flex flex-col h-full">

                          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 mb-4 inline-block self-start">
                            Self-Paced
                          </span>

                          <h3 className="text-xl font-heading font-bold mb-2">
                            {course.title}
                          </h3>

                          <p className="text-sm text-muted-foreground mb-5 flex-1">
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
                          </div>

                          <Button variant="heroOutline" className="w-full" asChild>
                            <Link href="/courses/self-paced">
                              View More <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>

                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <EmptyState />
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}

/* Reusable Empty State */
const EmptyState = () => (
  <div className="accent-card p-10 text-center max-w-xl mx-auto">
    <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
      <Play className="h-6 w-6 text-muted-foreground" />
    </div>
    <h4 className="font-heading font-semibold text-lg mb-2">
      Coming Soon
    </h4>
    <p className="text-sm text-muted-foreground mb-5">
      Courses are being prepared. Join the waitlist to get notified.
    </p>
    <Button variant="heroOutline" className="rounded-full" asChild>
      <Link href="/waitlist">Join the Waitlist</Link>
    </Button>
  </div>
);