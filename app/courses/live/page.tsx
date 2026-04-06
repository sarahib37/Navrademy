"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import EmailModal from "@/components/EmailModal";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Signal,
  Layers,
  BookOpen,
  Building2,
} from "lucide-react";
import { getCoursesByCategory, type Course } from "@/lib/courses";

type CategoryKey = "all" | "career" | "individual" | "corporate";

const categories = [
  { key: "all", label: "All Courses", icon: Signal },
  { key: "career", label: "Career Programs", icon: Layers },
  { key: "individual", label: "Individual Courses", icon: BookOpen },
  { key: "corporate", label: "Corporate Programs", icon: Building2 },
] as const;

const typeBadgeStyles: Record<string, { label: string; className: string }> = {
  career: {
    label: "Career",
    className: "bg-primary/10 text-primary border border-primary/20",
  },
  individual: {
    label: "Individual",
    className: "bg-accent/10 text-accent border border-accent/20",
  },
  corporate: {
    label: "Corporate",
    className: "bg-muted text-muted-foreground border border-border",
  },
};

export default function LiveCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] =
    useState<CategoryKey>("all");
  const [selectedCourse, setSelectedCourse] =
    useState<Course | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCoursesByCategory("live");
      setCourses(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
      if (loading) return;
    
      const hash = window.location.hash;
      if (!hash) return;
    
      const id = hash.replace("#", "");
    
      const found = courses.find((c) => {
        const safeId = c.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "");
        return safeId === id;
      });
    
      if (!found) return;
    
      if (found.type && found.type !== activeCategory) {
        setActiveCategory(found.type as CategoryKey);
      }
    
      setTimeout(() => {
        const el = document.getElementById(id);
    
        if (el) {
          el.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 500); 
    }, [loading, courses]);

  const allCourses = courses.map((course) => ({
    course,
    type: course.type as CategoryKey,
  }));

  const filteredCourses =
    activeCategory === "all"
      ? allCourses
      : allCourses.filter((c) => c.type === activeCategory);

  const handleApply = (course: Course) => {
    setSelectedCourse(course);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <PageHero
        icon={Signal}
        eyebrow="Instructor-led, cohort-based"
        titleAccent="Live"
        title="Courses"
        accentFirst
        subtitle="Real-time interaction, projects, and mentorship with industry professionals."
      />

      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8">

          {/* CATEGORY TABS */}
          <div className="sticky top-20 z-30 bg-background/80 backdrop-blur-lg py-4 mb-10 border-b border-border/50">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.key;

                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition ${
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="liveCategoryBg"
                        className="absolute inset-0 rounded-full gradient-bg"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.5,
                        }}
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-2">
                      <cat.icon className="h-4 w-4" />
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CONTENT */}
          {loading ? (
            <div className="text-center py-16 text-muted-foreground">
              Loading courses...
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-bold mb-2">
                No courses in this category
              </h3>
              <p className="text-muted-foreground">
                Try another category or join the waitlist.
              </p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-10"
              >
                {filteredCourses.map(({ course, type }, i) => {
                  const badge =
                    typeBadgeStyles[type] || typeBadgeStyles.career;

                  const safeId = course.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w-]/g, "");

                  return (
                    <motion.div
                      id={safeId}
                      key={course.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="accent-card p-8 lg:p-10 scroll-mt-32"
                    >
                      {/* HEADER */}
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                          Live
                        </span>

                        <span
                          className={`text-xs px-2.5 py-1 rounded-full ${badge.className}`}
                        >
                          {badge.label}
                        </span>

                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {course.duration}
                        </span>

                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {course.students}
                        </span>
                      </div>

                      {/* TITLE */}
                      <h3 className="text-2xl md:text-3xl font-bold mb-3">
                        {course.title} (₦{course.price.toLocaleString()})
                      </h3>

                      {/* DESCRIPTION */}
                      <p className="text-muted-foreground mb-8 max-w-2xl">
                        {course.description}
                      </p>

                      <div className="mb-8">
                        <h4 className="font-heading font-bold text-sm mb-4 text-primary flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          What You'll Gain From This Course
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {course.curriculum.map((item) => (
                            <div key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button
                        variant="hero"
                        size="lg"
                        onClick={() => handleApply(course)}
                      >
                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      <EmailModal
        open={!!selectedCourse}
        onOpenChange={(open) => !open && setSelectedCourse(null)}
        courseId={selectedCourse?.id ?? ""}
        courseTitle={selectedCourse?.title ?? ""}
        courseAmount={selectedCourse?.price ?? 0}
      />

      <CTASection />
      <Footer />
    </div>
  );
}