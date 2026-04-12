"use client"

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { ArrowRight, Calendar, Clock, MapPin, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { FIRST_EVENT } from "@/lib/eventList";
import Link from "next/link";
import { Badge } from "./ui/badge";

type Props = {}

export default function EventsComponent({}: Props) {
  const events = FIRST_EVENT[0]
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        icon={Calendar}
        eyebrow="Learn, connect, grow"
        title="Live"
        titleAccent="Events"
        subtitle="Join our interactive workshops, bootcamps, and webinars designed to accelerate your career and connect you with a community of ambitious learners."
      />

      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-heading font-bold">🟢 Upcoming Experience</h2>
            <p className="text-muted-foreground mt-2">Our next live event — don't miss it.</p>
          </div>

          <Link href={`/events/${events.slug}`} className="block max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="elevated-card overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-primary/20"
            >
              <div className="p-8 md:p-10 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-primary text-primary-foreground">Live Experience</Badge>
                  <Badge variant="outline" className="border-primary/30 text-primary">{events.duration}</Badge>
                </div>

                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                  {events.tagline}
                </p>

                <h3 className="text-2xl md:text-3xl font-heading font-bold leading-tight group-hover:text-primary transition-colors">
                  {events.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {events.description}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-primary" />
                    {"Date set"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-primary" />
                    {events.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-primary" />
                    {events.duration}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-primary font-medium text-sm">
                    View Details & Register
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Use code <span className="font-bold text-primary">{events.promoCode}</span>
                  </Badge>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </section>


      <CTASection />
      <Footer />
    </div>
  )
}