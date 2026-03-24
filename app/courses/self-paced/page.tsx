"use client"

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import EmailModal from "@/components/EmailModal";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Clock, Users, Play, Layers, BookOpen, Building2 } from "lucide-react";
import { getCoursesByCategory, type Course } from "@/lib/courses";

const CourseCard = ({ course, index, onApply }: { 
  course: Course; 
  index: number; 
  onApply: (course: Course) => void 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="accent-card p-8 lg:p-10"
  >
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/20 text-primary">Live Course</span>
      <span className="flex items-center gap-1 text-sm text-muted-foreground"><Clock className="h-4 w-4" />{course.duration}</span>
      <span className="flex items-center gap-1 text-sm text-muted-foreground"><Users className="h-4 w-4" />{course.students}</span>
    </div>
    <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3">{course.title}</h3>
    <p className="text-muted-foreground mb-8 max-w-2xl">{course.description}</p>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div>
        <h4 className="font-heading font-bold text-sm mb-3 text-primary">Who It's For</h4>
        <ul className="space-y-2">{course.who_is_for.map((item) => <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />{item}</li>)}</ul>
      </div>
      <div>
        <h4 className="font-heading font-bold text-sm mb-3 text-destructive">Not For</h4>
        <ul className="space-y-2">{course.who_is_not_for.map((item) => <li key={item} className="text-sm text-muted-foreground">• {item}</li>)}</ul>
      </div>
      <div>
        <h4 className="font-heading font-bold text-sm mb-3 text-primary">Outcomes</h4>
        <ul className="space-y-2">{course.outcomes.map((item) => <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />{item}</li>)}</ul>
      </div>
      <div>
        <h4 className="font-heading font-bold text-sm mb-3 text-primary">Curriculum</h4>
        <ul className="space-y-2">{course.curriculum.map((item, j) => <li key={item} className="text-sm text-muted-foreground">{j + 1}. {item}</li>)}</ul>
      </div>
    </div>

    <Button variant="hero" size="lg" onClick={() => onApply(course)}>
      Apply Now <ArrowRight className="h-4 w-4" />
    </Button>

    {/* <Button variant="hero" size="lg">
      <a href="/waitlist">
        Apply Now <ArrowRight className="h-4 w-4" />
      </a>
    </Button> */}
  </motion.div>
);

const SelfCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selfCourses, setSelfCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCoursesByCategory("self-paced");
      setSelfCourses(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const careerPrograms = selfCourses.filter(c => c.type === "career")
  const individualCourses = selfCourses.filter(c => c.type === "individual")
  const corporatePrograms = selfCourses.filter(c => c.type === "corporate")

  const sections = [
    {
      key: "career",
      icon: Layers,
      label: "Career Programs",
      eyebrow: "Skill Clusters",
      description: "Comprehensive, multi-module programs designed to take you from beginner to job-ready in a specific career path.",
      courses: careerPrograms,
    },
    {
      key: "individual",
      icon: BookOpen,
      label: "Individual Courses",
      eyebrow: "Focused Skills",
      description: "Shorter, targeted courses to master a specific tool or skill. Perfect for upskilling fast.",
      courses: individualCourses,
    },
    {
      key: "corporate",
      icon: Building2,
      label: "Corporate Upskilling Programs",
      eyebrow: "For Teams & Organizations",
      description: "Custom training programs designed for teams. Build organizational capability at scale.",
      courses: corporatePrograms,
    },
  ].filter(section => section.courses.length > 0); ;

  const handleApply = (course: Course) => {
    setSelectedCourse(course);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        icon={Play}
        eyebrow="Learn at your own speed"
        titleAccent="Self-Paced"
        title="Courses"
        accentFirst
        subtitle="Recorded programs, toolkits, and short learning kits you can complete on your schedule."
      />

      {loading ? (
        <div className="text-center py-16 text-muted-foreground">
          Loading courses...
        </div>
      ) : selfCourses.length === 0 ? (
        <div className="section-padding text-center">
          <h2 className="text-2xl font-heading font-bold mb-3">
            No Live Courses Available Yet
          </h2>
          <p className="text-muted-foreground mb-6">
            We're preparing live programs for you. Join the waitlist to be notified.
          </p>
      
          <Button asChild>
            <a href="/waitlist">
              Join Waitlist <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      ) : (
        sections.map((section) => (
          <section key={section.key} className="section-padding">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <div className="flex items-center gap-2 mb-2">
                <section.icon className="h-5 w-5 text-primary" />
                <span className="section-eyebrow !mb-0">{section.eyebrow}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-2">{section.label}</h2>
              <p className="text-muted-foreground max-w-2xl">{section.description}</p>
            </motion.div>

            <div className="space-y-12">
              {section.courses.map((course, i) => (
                <CourseCard key={course.title} course={course} index={i} onApply={handleApply} />
              ))}
            </div>
          </div>
        </section>
        ))
      )}

      <EmailModal
        open={!!selectedCourse}
        onOpenChange={(open) => {
          if (!open) setSelectedCourse(null);
        }}
        courseId={selectedCourse?.id ?? ""}
        courseTitle={selectedCourse?.title ?? ""}
        courseAmount={selectedCourse?.price ?? 0}
      />
      <CTASection />
      <Footer />
    </div>
  );
};

export default SelfCourses;
