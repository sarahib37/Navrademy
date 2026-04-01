"use client"

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AffiliateForm from "@/components/AffiliateForm";
import AffiliateDashboard from "@/components/AffiliateDashboard";
import { useAffiliate } from "@/hooks/useAffiliate";
import { generateCode } from "@/lib/generateToken";
import { motion } from "framer-motion";
import { DollarSign, Link2, Share2, Users } from "lucide-react";

const Affiliate = () => {
  const { affiliate, loginAndInit, loading } = useAffiliate()

  const handleSubmit = async (name: string, email: string) => {
    const code = generateCode(name);
    // await register(name, email, code);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Share2 className="w-4 h-4" />
              Affiliate Program
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Earn by sharing courses you believe in
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Get a unique referral link, share it with your network, and earn a commission on every course sale.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: DollarSign, title: "10% Commission", desc: "Earn 10% of every sale made through your link" },
            { icon: Link2, title: "Unique Link", desc: "Get a personal referral link to share anywhere" },
            { icon: Users, title: "No Limits", desc: "Refer as many people as you want, earn on every sale" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className="bg-card border border-border rounded-xl p-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {!affiliate ? <AffiliateForm loginAndInit={loginAndInit} loading={loading}/> : <AffiliateDashboard affiliate={affiliate}/>}

      <Footer />
    </div>
  );
};

export default Affiliate;
