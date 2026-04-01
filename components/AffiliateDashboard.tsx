"use client"

import { motion } from "framer-motion";
import AffiliateWithdraw from "./AffiliateWithdraw";
import { CheckCircle, Copy } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import type { Affiliate } from "@/lib/affiliate";

type Props = {
    affiliate: Affiliate;
};

export default function AffiliateDashboard({ affiliate }: Props) {
    const [copied, setCopied] = useState(false);

    const referralLink = typeof window !== "undefined" ? `${window.location.origin}?ref=${affiliate.referral_code}`: "";

    const copyLink = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
  
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-card border border-border max-w-4xl mx-auto mb-5 rounded-xl p-6 space-y-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card border border-border rounded-xl p-6 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-2">
                    <CheckCircle className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-xl font-heading font-bold text-foreground">You're all set!</h2>
                <p className="text-sm text-muted-foreground"> Share this link and earn {affiliate.commission_rate}% on every course sale.</p>
                <div className="flex items-center gap-2">
                    <Input value={referralLink} readOnly className="text-sm" />
                    <Button variant="outline" size="icon" onClick={copyLink}>
                        {copied ? <CheckCircle className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                    </Button>
                </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-xl p-4 text-center">
                  <p className="text-sm text-muted-foreground">Referrals</p>
                  <p className="text-2xl font-heading font-bold text-foreground">{affiliate.referral_count ?? 0}</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 text-center">
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                  <p className="text-2xl font-heading font-bold text-foreground">₦{Number(affiliate.total_earnings).toLocaleString()}</p>
                </div>
            </div>

            <AffiliateWithdraw/>
        </motion.div>
    );
}