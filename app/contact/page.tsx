"use client"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MessageSquare, Handshake, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const contactTypes = [
  { icon: MessageSquare, title: "General Inquiries", description: "Questions about courses, pricing, or how Navrademy works.", email: "hello@navrademy.com" },
  { icon: Handshake, title: "Partnerships", description: "Corporate training, sponsorships, or collaboration opportunities.", email: "partners@navrademy.com" },
  { icon: Mail, title: "Support", description: "Technical issues, account help, or refund requests.", email: "support@navrademy.com" },
];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    const form = e.target as HTMLFormElement;
    const formData = Object.fromEntries(new FormData(form));
  
    try
    {
      const res = await fetch("/contact/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) throw new Error("Failed to send message");
  
      setSubmitted(true);
    } catch (err: any) {
      toast({ title: "Something went wrong", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

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

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="accent-card p-8 lg:p-10 max-w-2xl mx-auto">
            <div className="section-eyebrow justify-center">Send a message</div>
            <h2 className="text-2xl font-heading font-bold mb-6 text-center">We'll get back to you within 24 hours</h2>
            {submitted ? (
              <div className="text-center py-8">
                <h3 className="font-heading font-bold text-xl mb-2 gradient-text">Message Sent!</h3>
                <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input name="name" placeholder="Your Name" required />
                  <Input name="email" type="email" placeholder="Your Email" required />
                </div>
                <Input name="subject" placeholder="Subject" required />
                <textarea name="message" className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder="Your message..." required />
                <Button variant="hero" size="lg" className="w-full" type="submit" disabled={loading}>
                  {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending...</> : "Send Message"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
