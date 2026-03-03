"use client"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Monitor } from "lucide-react";

const events = [
  { title: "Digital Marketing Workshop", type: "Workshop", date: "March 15, 2026", format: "Virtual", description: "Hands-on session on running your first ad campaign from scratch." },
  { title: "UX Design Sprint", type: "Bootcamp", date: "March 22-23, 2026", format: "Virtual", description: "Weekend intensive on rapid prototyping and user testing." },
  { title: "Future of Work Webinar", type: "Webinar", date: "April 5, 2026", format: "Virtual", description: "Panel discussion on emerging skills and career trends for 2026." },
  { title: "Data Analytics Crash Course", type: "Workshop", date: "April 12, 2026", format: "Virtual", description: "Learn to analyze data and build dashboards in a single day." },
  { title: "Product Management Masterclass", type: "Bootcamp", date: "April 19-20, 2026", format: "Hybrid", description: "Two-day deep dive into product strategy and execution." },
  { title: "AI Tools for Professionals", type: "Webinar", date: "May 3, 2026", format: "Virtual", description: "Practical walkthrough of AI tools that boost productivity." },
];

const typeColors: Record<string, string> = {
  Workshop: "bg-primary/20 text-primary",
  Bootcamp: "bg-accent/20 text-accent",
  Webinar: "bg-muted text-muted-foreground",
};

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        icon={Calendar}
        eyebrow="Learn, connect, grow"
        title="Upcoming"
        titleAccent="Events"
        subtitle="Workshops, bootcamps, and webinars to accelerate your learning."
      />

      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((e, i) => (
              <motion.div key={e.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="elevated-card p-6 group flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${typeColors[e.type]}`}>{e.type}</span>
                </div>
                <h3 className="text-lg font-heading font-bold mb-2 group-hover:text-primary transition-colors">{e.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{e.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{e.date}</span>
                  <span className="flex items-center gap-1"><Monitor className="h-3.5 w-3.5" />{e.format}</span>
                </div>
                <Button variant="hero" size="default" className="w-full">Register</Button>
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

export default Events;
