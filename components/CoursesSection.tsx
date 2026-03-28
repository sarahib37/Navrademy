"use client";

import { useEffect, useState } from "react";
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
import { getCourses } from "@/lib/courses";
import type { Course } from "@/lib/courses";


const categoryStyles: Record<string, string> = {
  live: "bg-primary/10 text-primary border border-primary/20",
  "self-paced":
    "bg-coral-warm/10 text-coral-warm border border-coral-warm/20",
  upcoming: "bg-muted text-muted-foreground border border-border/50",
};

function getRandomCourses(courses: Course[], count: number) {
  const shuffled = [...courses];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}

export default function CoursesSection() {
  const [randomCourses, setRandomCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses()
        const availableCourses = data.filter(c => c.category !== "upcoming");
        setRandomCourses(getRandomCourses(availableCourses, 6));
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const getHref = (category: string, id: string) => {
    if (category === "upcoming") return "/waitlist";
    return `/courses/${id}`;
  };

  const getButtonText = (category: string) => {
    if (category === "upcoming") return "Join Waitlist";
    if (category === "live") return "Apply Now";
    return "Enroll Now";
  };

  return (
    <section id="courses" className="section-padding gradient-bg-warm">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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

        {/* STATES */}
        {loading ? (
          <div className="text-center py-16 text-muted-foreground">
            Loading courses...
          </div>
        ) : randomCourses.length === 0 ? (
          <div className="accent-card p-10 text-center rounded-xl">
            <h3 className="text-xl font-heading font-bold mb-3">
              No Courses Available Yet
            </h3>
            <p className="text-muted-foreground mb-6">
              We're preparing amazing programs for you. Join the waitlist to be notified.
            </p>
            <Button asChild>
              <Link href="/waitlist">
                Join Waitlist <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {randomCourses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="elevated-card rounded-xl overflow-hidden group cursor-pointer"
                onClick={() => setSelectedCourse(course)}
              >
                <div className="p-6">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryStyles[course.category]}`}>
                    {course.category}
                  </span>

                  <h3 className="text-xl font-heading font-bold mt-4 mb-2">
                    {course.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-5">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
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
                </div>

                <div className="px-6 pb-6">
                  <Button
                    variant={course.category === "upcoming" ? "heroOutline" : "hero"}
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCourse(course);
                    }}
                  >
                    {course.category === "upcoming" ? "Join Waitlist" : "Learn More"}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
        <DialogContent className="sm:max-w-[640px] rounded-2xl p-0 overflow-hidden">
          {selectedCourse && (
            <>
              <div className="gradient-bg-rich p-6 pb-8">
                <DialogHeader>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-white/20 text-white w-fit mb-3">
                    {selectedCourse.category}
                  </span>
                  <DialogTitle className="text-2xl text-white">
                    {selectedCourse.title}
                  </DialogTitle>
                  <DialogDescription className="text-white/80">
                    {selectedCourse.description}
                  </DialogDescription>
                </DialogHeader>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-semibold flex items-center gap-2 mb-3">
                    <BookOpen className="h-4 w-4 text-primary" />
                    What You'll Learn
                  </h4>

                  <ul className="space-y-2">
                    {(selectedCourse.curriculum || []).map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full" asChild>
                  <Link href={"/courses"}>
                    {getButtonText(selectedCourse.category)}
                    <ArrowRight className="ml-2 h-4 w-4" />
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