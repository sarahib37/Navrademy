"use client"

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Mail, MessageSquare, Handshake } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { motion } from "framer-motion";
import SocialLinks from "./SocialLinks";

type Props = {}

const contactTypes = [
    { icon: MessageSquare, title: "General Inquiries", description: "Questions about courses, pricing, or how Navrademy works.", email: "hello@navrademy.com" },
    { icon: Handshake, title: "Partnerships", description: "Corporate training, sponsorships, or collaboration opportunities.", email: "partners@navrademy.com" },
    { icon: Mail, title: "Support", description: "Technical issues, account help, or refund requests.", email: "support@navrademy.com" },
];

export default function ContactComponent({}: Props) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        icon={Mail}
        eyebrow="We'd love to hear from you"
        title="Get in"
        titleAccent="Touch"
        subtitle="Reach out through any of the channels below."
      />

      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {contactTypes.map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="elevated-card p-6 text-center group">
                <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center mx-auto mb-4 group-hover:glow-coral-sm transition-all">
                  <c.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-bold mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{c.description}</p>
                <a href={`mailto:${c.email}`} className="text-sm text-primary hover:underline">{c.email}</a>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mb-16">
            <SocialLinks variant="pill" size={18} />
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="accent-card p-8 lg:p-10 max-w-2xl mx-auto">
            <ContactForm/>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  )
}