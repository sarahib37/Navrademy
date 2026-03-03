"use client"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Clock, Users, Signal } from "lucide-react";

const courses = [
  {
    title: "Digital Marketing Mastery",
    duration: "8 Weeks",
    students: "320+",
    description: "Master SEO, social media marketing, paid advertising, email marketing, and analytics. Run real campaigns during the course.",
    whoFor: ["Aspiring digital marketers", "Business owners wanting to grow online", "Marketing professionals upgrading skills"],
    notFor: ["Those looking for passive income shortcuts", "Anyone not willing to commit 8-10 hours/week"],
    outcomes: ["Run end-to-end marketing campaigns", "Analyze and optimize ad performance", "Build a personal marketing portfolio", "Earn a Navrademy certification"],
    curriculum: ["SEO & Content Strategy", "Social Media Marketing", "Google & Meta Ads", "Email Marketing Automation", "Analytics & Reporting", "Campaign Project"],
  },
  {
    title: "UI/UX Design Bootcamp",
    duration: "10 Weeks",
    students: "250+",
    description: "From user research to high-fidelity prototypes. Build a design portfolio that gets you hired at top companies.",
    whoFor: ["Career switchers into design", "Frontend developers wanting design skills", "Graphic designers transitioning to UX"],
    notFor: ["Those expecting to skip research fundamentals", "Anyone not willing to iterate on feedback"],
    outcomes: ["Conduct user research and testing", "Create wireframes and prototypes in Figma", "Build a 3-project design portfolio", "Present design decisions confidently"],
    curriculum: ["Design Thinking & Research", "Information Architecture", "Wireframing & Prototyping", "Visual Design Systems", "Usability Testing", "Portfolio Project"],
  },
  {
    title: "Product Management",
    duration: "12 Weeks",
    students: "180+",
    description: "Learn strategy, roadmapping, stakeholder management, and everything you need to lead product teams effectively.",
    whoFor: ["Aspiring product managers", "Project managers transitioning to product", "Founders building their own products"],
    notFor: ["Those looking for a quick certification without depth", "Anyone not comfortable with ambiguity"],
    outcomes: ["Define product strategy and vision", "Build and prioritize product roadmaps", "Run sprint planning and retrospectives", "Communicate with technical and non-technical stakeholders"],
    curriculum: ["Product Strategy & Vision", "User Stories & Requirements", "Roadmapping & Prioritization", "Agile & Scrum", "Stakeholder Communication", "Capstone Product Launch"],
  },
];

const LiveCourses = () => {
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
          <div className="space-y-12">
            {courses.map((course, i) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="accent-card p-8 lg:p-10"
              >
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/20 text-primary">
                    Live Course
                  </span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />{course.duration}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />{course.students} students
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">{course.title}</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl">{course.description}</p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div>
                    <h4 className="font-heading font-bold text-sm mb-3 text-primary">Who It's For</h4>
                    <ul className="space-y-2">
                      {course.whoFor.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm mb-3 text-destructive">Not For</h4>
                    <ul className="space-y-2">
                      {course.notFor.map((item) => (
                        <li key={item} className="text-sm text-muted-foreground">• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm mb-3 text-primary">Outcomes</h4>
                    <ul className="space-y-2">
                      {course.outcomes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm mb-3 text-primary">Curriculum</h4>
                    <ul className="space-y-2">
                      {course.curriculum.map((item, j) => (
                        <li key={item} className="text-sm text-muted-foreground">{j + 1}. {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button variant="hero" size="lg" asChild>
                  <a href="/waitlist">
                    Apply Now <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default LiveCourses;