"use client"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Clock, Play } from "lucide-react";

const programs = [
  {
    title: "Data Analytics Fundamentals",
    duration: "6 Weeks",
    type: "Recorded Program",
    description: "Master Excel, SQL, Power BI and Python basics. Turn raw data into actionable business insights.",
    outcomes: ["Clean and analyze datasets", "Build interactive dashboards", "Write basic SQL queries", "Present data-driven recommendations"],
  },
  {
    title: "Web Development",
    duration: "14 Weeks",
    type: "Recorded Program",
    description: "HTML, CSS, JavaScript, and React. Build real projects and deploy them to the web.",
    outcomes: ["Build responsive websites", "Create React applications", "Deploy projects to production", "Write clean, maintainable code"],
  },
  {
    title: "Social Media Toolkit",
    duration: "2 Weeks",
    type: "Toolkit",
    description: "Templates, strategies, and frameworks for managing social media like a professional.",
    outcomes: ["Content calendar templates", "Platform-specific strategies", "Analytics tracking framework", "Engagement playbook"],
  },
  {
    title: "Freelancing Quick Start",
    duration: "1 Week",
    type: "Learning Kit",
    description: "Everything you need to launch your freelance career — pricing, proposals, client management.",
    outcomes: ["Set competitive pricing", "Write winning proposals", "Manage client relationships", "Build a sustainable pipeline"],
  },
];

const SelfPacedCourses = () => {
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

      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="elevated-card p-8 group flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent/20 text-accent">{p.type}</span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground"><Clock className="h-4 w-4" />{p.duration}</span>
                </div>
                <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{p.description}</p>
                <div className="mb-6 flex-1">
                  <h4 className="font-heading font-bold text-sm mb-3">What You'll Get</h4>
                  <ul className="space-y-2">
                    {p.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button variant="hero" className="w-full" asChild>
                  <a href="/waitlist">
                    Enroll Now <ArrowRight className="h-4 w-4" />
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

export default SelfPacedCourses;