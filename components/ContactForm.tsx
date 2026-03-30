"use client"
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

type Props = {}

export default function ContactForm({}: Props) {


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
          const res = await fetch("/contact/api/route", {
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
    <div>
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
    </div>
  )
}