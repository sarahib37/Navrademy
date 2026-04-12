import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventRegistrationModal from "@/components/EventRegistrationModal";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FIRST_EVENT } from "@/lib/eventList";
import Link from "next/link";
import {
  Calendar, MapPin, Clock, Share2, CheckCircle2, Users,
  ArrowLeft, Search, Star, Shield, ArrowRight, Zap, Target
} from "lucide-react";
import { useState, useRef } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

type EventLandingProps = {
  event: typeof FIRST_EVENT[number];
};

const EventLanding = ({ event }: EventLandingProps) => {
  const [regOpen, setRegOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const shareEvent = () => {
    const text = `${event.title}\n${event.description}\n\n${window.location.href}`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-16 md:py-24 relative">
          <Link href="/events" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </Link>

          <div className="max-w-3xl space-y-6">
            <motion.p {...fadeUp} className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
              {event.tagline}
            </motion.p>

            <motion.h1
              {...fadeUp}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight leading-[1.15]"
            >
              {event.title}
            </motion.h1>

            <motion.p {...fadeUp} transition={{ delay: 0.15 }} className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              {event.description}
            </motion.p>

            {/* Meta pills */}
            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="flex flex-wrap gap-3">
              {[
                { icon: Calendar, text: "" },
                { icon: MapPin, text: event.location },
                { icon: Clock, text: event.duration },
              ].map((m) => (
                <span key={m.text} className="inline-flex items-center gap-1.5 bg-card border border-border rounded-full px-4 py-2 text-sm">
                  <m.icon className="h-4 w-4 text-primary" />
                  {m.text}
                </span>
              ))}
            </motion.div>

            <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="flex flex-wrap gap-3 pt-2">
              <Button variant="hero" size="lg" onClick={() => setRegOpen(true)}>
                Reserve My Spot
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg" onClick={shareEvent}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </motion.div>

            <motion.div {...fadeUp} transition={{ delay: 0.35 }}>
              <Badge variant="outline" className="text-xs border-primary/30">
                Promo code: <span className="font-bold text-primary ml-1">{event.promoCode}</span>
              </Badge>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── THE PROBLEM ─── */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.div {...fadeUp} className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">The Problem</p>
            <h2 className="text-2xl md:text-3xl font-heading font-bold">{event.problem.headline}</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">{event.problem.body}</p>
          </motion.div>

          {/* Search queries */}
          <motion.div {...fadeUp} className="mb-10">
            <p className="text-sm text-muted-foreground text-center mb-4">Sound familiar? You've probably searched for:</p>
            <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
              {event.problem.searches.map((q, i) => (
                <div key={i} className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-3 text-sm text-muted-foreground">
                  <Search className="h-4 w-4 text-primary shrink-0" />
                  <span className="italic">{q}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Old way vs new way */}
          <motion.div {...fadeUp} className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="elevated-card p-5 border-destructive/20">
              <p className="text-xs uppercase tracking-wider text-destructive font-semibold mb-2">The old way</p>
              <p className="text-sm text-muted-foreground">{event.problem.oldWay}</p>
            </div>
            <div className="elevated-card p-5 border-primary/20">
              <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">The Navrademy way</p>
              <p className="text-sm text-muted-foreground">{event.problem.newWay}</p>
            </div>
            <div className="elevated-card p-5 border-primary/20">
              <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">The result</p>
              <p className="text-sm text-muted-foreground">{event.problem.result}</p>
            </div>
          </motion.div>

          <motion.p {...fadeUp} className="text-center text-sm text-muted-foreground mt-8">
            If these searches sound familiar, <span className="text-primary font-medium">this experience was built for you.</span>
          </motion.p>
        </div>
      </section>

      {/* ─── WHAT YOU WALK AWAY WITH ─── */}
      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">What You Walk Away With</p>
            <h2 className="text-2xl md:text-3xl font-heading font-bold">Not inspiration. <span className="text-primary">Direction.</span></h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {event.outcomes.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="elevated-card p-6 space-y-3"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary font-heading font-bold text-sm">
                  {i + 1}
                </div>
                <h3 className="font-heading font-bold text-base">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE EXPERIENCE (2-DAY AGENDA) ─── */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">The Experience</p>
            <h2 className="text-2xl md:text-3xl font-heading font-bold">Two days. <span className="text-primary">Complete transformation.</span></h2>
          </motion.div>

          <div className="space-y-8">
            {event.agenda.map((day) => (
              <motion.div key={day.day} {...fadeUp} className="elevated-card overflow-hidden">
                <div className="flex">
                  {/* Day number strip */}
                  <div className="bg-primary text-primary-foreground flex flex-col items-center justify-center px-6 py-8 shrink-0">
                    <span className="text-3xl font-heading font-bold">{day.day}</span>
                    <span className="text-[10px] uppercase tracking-wider opacity-80">Day</span>
                  </div>
                  <div className="p-6 md:p-8 space-y-4 flex-1">
                    <h3 className="text-lg font-heading font-bold">{day.title}</h3>
                    <ul className="space-y-3">
                      {day.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHO THIS IS FOR ─── */}
      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.div {...fadeUp} className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">Who This Is For</p>
            <h2 className="text-2xl md:text-3xl font-heading font-bold">
              This experience was designed for you if you recognize yourself here.
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {event.audience.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="elevated-card p-6 space-y-3 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-heading font-bold">{a.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.div {...fadeUp} className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">Navrademy By The Numbers</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {event.stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center space-y-1"
              >
                <p className="text-3xl md:text-4xl font-heading font-bold text-primary">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <motion.div {...fadeUp} className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">Real People. Real Results.</p>
            <h2 className="text-2xl md:text-3xl font-heading font-bold">They were exactly where you are.</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {event.testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="elevated-card p-6 space-y-4"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">"{t.text}"</p>
                <div>
                  <p className="font-heading font-bold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REGISTRATION CTA ─── */}
      <section ref={formRef} className="section-padding bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.div {...fadeUp} className="text-center space-y-6">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold">Secure Your Spot</p>
            <h2 className="text-2xl md:text-3xl font-heading font-bold">Your next step starts here.</h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              You don't need another year of uncertainty. You need two focused days, the right framework,
              and people who've been where you're going. This is your entry point.
            </p>

            <Button variant="hero" size="lg" onClick={() => setRegOpen(true)}>
              Reserve My Spot
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>

            <p className="text-xs text-muted-foreground">
              Limited seats available. Early registrants get priority access to post-event mentorship sessions.
            </p>

            {/* Clarity Promise */}
            <div className="elevated-card p-5 max-w-lg mx-auto mt-6 text-left">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading font-bold text-sm mb-1">🛡️ Navrademy Clarity Promise</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{event.clarityPromise}</p>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-muted-foreground mt-4">
              🔒 Your info is safe. No spam, ever. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl text-center">
          <motion.div {...fadeUp} className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold">One Decision Away</p>
            <h2 className="text-2xl md:text-3xl font-heading font-bold">
              Clarity changes speed. Direction changes results.
            </h2>
            <p className="text-muted-foreground">
              Stop letting another year pass in the same uncertainty. Two days is all it takes to finally know your next move.
            </p>
            <div className="pt-4">
              <Button variant="hero" size="lg" onClick={() => setRegOpen(true)}>
                Reserve My Spot
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      <EventRegistrationModal
        open={regOpen}
        onOpenChange={setRegOpen}
        eventId={event.id}
        eventTitle={event.title}
      />
    </div>
  );
};

export default EventLanding;