"use client"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Waitlist = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        icon={Sparkles}
        eyebrow="Be the first to know"
        title="Join the"
        titleAccent="Waitlist"
        subtitle="Get early access, exclusive discounts, and priority enrollment when new courses launch."
      />

      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="accent-card p-8 lg:p-10">
            <div className="mb-8">
              <div className="section-eyebrow">Perks</div>
              <h3 className="font-heading font-bold text-lg mb-4">What you'll get</h3>
              <ul className="space-y-3">
                {[
                  "Early access to upcoming courses",
                  "Exclusive launch discounts",
                  "Priority enrollment before public launch",
                  "Free learning resources and tips",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="h-4 w-4 text-primary shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Single button linking to Google Form */}
            <div className="text-center mt-6">
            <Button
                variant="hero"
                size="lg"
                onClick={() => window.open("https://forms.gle/wvkgPe6GhNX1Fjus5", "_blank")}
            >
                Join the Waitlist
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Waitlist;