import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventRegistrationModal from "@/components/EventRegistrationModal";
import EventCountdown from "@/components/EventCountdown";
import StickyRegisterBar from "@/components/EventSticky";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Calendar, MapPin, Clock, Share2, Users,
  ArrowLeft, Search, Shield, ArrowRight, Sparkles, Check, Quote,
} from "lucide-react";
import { useState, useRef } from "react";
import Link from "next/link";
import { FIRST_EVENT } from "@/lib/eventList";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

type EventLandingProps = {
  FIRST_EVENT: typeof FIRST_EVENT[number];
};

const EventLanding = ({ FIRST_EVENT }: EventLandingProps) => {
  const [regOpen, setRegOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToRegister = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const shareEvent = () => {
    const text = `${FIRST_EVENT.title}\n${FIRST_EVENT.description}\n\n${window.location.href}`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
  };

  const targetDate = FIRST_EVENT.startDateTime || undefined;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ─── 1. HERO — summary, date, CTA + Share ─── */}
      <section className="relative overflow-hidden bg-[#0D1B2A] text-white pt-[75px]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-20 h-[520px] w-[520px] rounded-full bg-primary/25 blur-[140px]" />
          <div className="absolute top-1/3 -left-32 h-[420px] w-[420px] rounded-full bg-[#FFB199]/15 blur-[140px]" />
          <div className="absolute bottom-0 left-1/3 h-[360px] w-[360px] rounded-full bg-primary/15 blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
        </div>

        <div className="container relative mx-auto px-4 lg:px-8 py-16 md:py-24">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </Link>

          <div className="max-w-3xl mx-auto text-center space-y-7">
            <motion.div {...fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary backdrop-blur-sm">
                <Sparkles className="h-3 w-3" />
                {FIRST_EVENT.tagline}
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight leading-[1.1]"
            >
              <span className="bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent">
                {FIRST_EVENT.title}
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ delay: 0.15 }}
              className="text-base md:text-lg text-white/65 leading-relaxed max-w-2xl mx-auto"
            >
              {FIRST_EVENT.description}
            </motion.p>

            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="flex flex-wrap justify-center gap-2.5">
              {[
                { icon: Calendar, text: "Apr 23–24, 2026" },
                { icon: MapPin, text: FIRST_EVENT.location },
                { icon: Clock, text: FIRST_EVENT.duration },
              ].map((m) => (
                <span
                  key={m.text}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-white/75 backdrop-blur-sm"
                >
                  <m.icon className="h-3.5 w-3.5 text-primary" />
                  {m.text}
                </span>
              ))}
            </motion.div>

            <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-3 pt-2">
              <Button variant="hero" size="lg" onClick={scrollToRegister} className="rounded-full">
                Save My Seat
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={shareEvent}
                className="rounded-full border-white/15 bg-white/[0.03] text-white hover:bg-white/[0.08] hover:text-white"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 2. FOUNDER'S MESSAGE ─── */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.div {...fadeUp} className="text-center mb-8">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">A Note From The Founder</p>
            <h2 className="text-2xl md:text-3xl font-heading font-bold">Why we built this experience.</h2>
          </motion.div>

          <motion.div {...fadeUp} className="elevated-card p-6 md:p-10 relative">
            <Quote className="absolute -top-4 left-6 h-10 w-10 text-primary/30" />
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I've watched too many brilliant people stay stuck — not because they lacked talent, but because no
                one ever sat them down and helped them see the path clearly. They jumped from course to course,
                idea to idea, year to year. Always moving. Never landing.
              </p>
              <p>
                That's why we built this. Two days. No fluff. No "follow your passion" speeches. Just the framework,
                the clarity, and the people who can help you finally pick a direction and walk in it.
              </p>
              <p>
                If you show up fully, you will leave with a plan. That's a promise.
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-border flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-[#FFB199] flex items-center justify-center text-white font-heading font-bold">
                N
              </div>
              <div>
                <p className="font-heading font-bold text-foreground text-sm">The Navrademy Team</p>
                <p className="text-xs text-muted-foreground">Founders & Mentors</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 3. TIMER ─── */}
      <section className="relative overflow-hidden bg-[#0D1B2A] text-white py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-primary/20 blur-[140px]" />
        </div>
        <div className="container relative mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.div {...fadeUp} className="text-center space-y-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-semibold">Doors Open In</p>
            <div className="flex justify-center">
              <EventCountdown target={targetDate} tbc={false} />
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/70 pt-2">
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Live & interactive</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Written 6-month plan</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Mentor access</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 4. PROBLEM (cleaned) ─── */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.div {...fadeUp} className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">The Problem</p>
            <h2 className="text-2xl md:text-3xl font-heading font-bold">{FIRST_EVENT.problem.headline}</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">{FIRST_EVENT.problem.body}</p>
          </motion.div>

          <motion.div {...fadeUp}>
            <p className="text-sm text-muted-foreground text-center mb-4">Sound familiar? You've probably searched for:</p>
            <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
              {FIRST_EVENT.problem.searches.map((q, i) => (
                <div key={i} className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-3 text-sm text-muted-foreground">
                  <Search className="h-4 w-4 text-primary shrink-0" />
                  <span className="italic">{q}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 5. WHAT YOU WALK AWAY WITH ─── */}
      <section className="relative section-padding overflow-hidden bg-[#0D1B2A] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-1/4 h-[400px] w-[400px] rounded-full bg-primary/15 blur-[140px]" />
          <div className="absolute bottom-0 left-1/4 h-[320px] w-[320px] rounded-full bg-[#FFB199]/10 blur-[120px]" />
        </div>

        <div className="container relative mx-auto px-4 lg:px-8 max-w-6xl">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-3">What You Walk Away With</p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold">
              Not inspiration. <span className="bg-gradient-to-r from-primary to-[#FFB199] bg-clip-text text-transparent">Direction.</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FIRST_EVENT.outcomes.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.05]"
              >
                <div className="absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[#FFB199] text-white font-heading font-bold text-sm shadow-lg shadow-primary/20">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-heading font-bold text-base mb-2">{item.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. EXPERIENCE — agenda ─── */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">The Experience</p>
            <h2 className="text-2xl md:text-3xl font-heading font-bold">
              Two days. <span className="text-primary">Complete transformation.</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent md:-translate-x-px" />

            <div className="space-y-10 md:space-y-16">
              {FIRST_EVENT.agenda.map((day, idx) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`relative grid md:grid-cols-2 gap-6 md:gap-12 ${idx % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
                >
                  <div className="absolute left-5 md:left-1/2 top-2 -translate-x-1/2 z-10">
                    <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-primary to-[#FFB199] flex items-center justify-center text-white font-heading font-bold text-sm shadow-lg shadow-primary/30">
                      {day.day}
                      <div className="absolute inset-0 rounded-full bg-primary/40 blur-md -z-10" />
                    </div>
                  </div>

                  <div className={`pl-16 md:pl-0 ${idx % 2 ? "md:text-left md:pl-12" : "md:text-right md:pr-12"}`}>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-semibold mb-2">
                      Day {day.day}
                    </p>
                    <h3 className="text-xl md:text-2xl font-heading font-bold leading-tight">{day.title}</h3>
                  </div>

                  <div className={`pl-16 md:pl-0 ${idx % 2 ? "md:pr-12" : "md:pl-12"}`}>
                    <div className="elevated-card p-5 md:p-6">
                      <ul className="space-y-3">
                        {day.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. WHO THIS IS FOR (labels only) ─── */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.div {...fadeUp} className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">Who This Is For</p>
            <h2 className="text-2xl md:text-3xl font-heading font-bold">
              Built for people who are ready to move.
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-5">
            {FIRST_EVENT.audience.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="elevated-card p-6 flex flex-col items-center text-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-lg">{a.label}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. SECURE YOUR SPOT ─── */}
      <section
        ref={formRef}
        className="relative section-padding overflow-hidden bg-[#0D1B2A] text-white"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/20 blur-[160px]" />
        </div>

        <div className="container relative mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.div {...fadeUp} className="text-center space-y-6">
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Secure Your Spot</p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold">
              Your next step <span className="bg-gradient-to-r from-primary to-[#FFB199] bg-clip-text text-transparent">starts here.</span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto leading-relaxed">
              You don't need another year of uncertainty. You need two focused days, the right framework,
              and people who've been where you're going. This is your entry point.
            </p>

            <Button variant="hero" size="lg" onClick={() => setRegOpen(true)} className="rounded-full">
              Yes, Lock In My Seat
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>

            <p className="text-xs text-white/45">
              Limited seats. Early registrants get priority access to post-event mentorship.
            </p>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 max-w-lg mx-auto mt-6 text-left backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading font-bold text-sm mb-1 text-white">🛡️ Navrademy Clarity Promise</p>
                  <p className="text-sm text-white/65 leading-relaxed">{FIRST_EVENT.clarityPromise}</p>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-white/40 mt-4">
              🔒 Your info is safe. No spam, ever. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── 9. ONE DECISION AWAY ─── */}
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
              <Button variant="hero" size="lg" onClick={scrollToRegister} className="rounded-full">
                Count Me In
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      <StickyRegisterBar
        title={FIRST_EVENT.title}
        meta={`${FIRST_EVENT.duration} · ${FIRST_EVENT.location}`}
        onRegister={() => setRegOpen(true)}
      />

      <EventRegistrationModal
        open={regOpen}
        onOpenChange={setRegOpen}
        eventId={FIRST_EVENT.id}
        eventTitle={FIRST_EVENT.title}
      />
    </div>
  );
};

export default EventLanding;