"use client"

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AffiliateWithdraw from "./AffiliateWithdraw";
import { Banknote, CheckCircle, Copy, Loader2, LogOut, Wallet, Zap } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import type { Affiliate } from "@/lib/affiliate";
import WithdrawHistory from "./WithdrawHistory";
import { toast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase"; 
import { signOut, onAuthStateChanged, getAuth } from "firebase/auth";

type Props = {
    affiliate: Affiliate;
};

export default function AffiliateDashboard({ affiliate }: Props) {
    const [copied, setCopied] = useState(false);
    const [showWithdraw, setShowWithdraw] = useState(false);
    const [withdrawals, setWithdrawals] = useState<any[]>([]);
    const [boostCode, setBoostCode] = useState("")
    const [boostLoading, setBoostLoading] = useState(false)
    const router = useRouter();
    const [affiliateInfo, setAffiliateInfo] = useState(affiliate)

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!user) return;
    
        try {
          const token = await user.getIdToken();
    
          const res = await fetch("/affiliate/api/withdrawal", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          const data = await res.json();
    
          setWithdrawals(data.withdrawals);
        } catch (err) {
          console.error(err);
        }
      });
    
      return () => unsubscribe();
    }, []);

    const fetchWithdrawals = async () => {
      const auth = getAuth()
      const user = auth.currentUser;
      if (!user) return;
    
      const token = await user.getIdToken();
    
      const res = await fetch("/affiliate/api/withdrawal", {
        headers: { Authorization: `Bearer ${token}` },
      });
    
      const data = await res.json();
    
      if (res.ok) {
        setWithdrawals(data.withdrawals);
      }
    };

    const fetchAffiliate = async () => {
      const auth = getAuth()
      const user = auth.currentUser;
      if (!user) return;
    
      const token = await user.getIdToken();
    
      const res = await fetch("/affiliate/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
    
      const data = await res.json();
    
      if (res.ok) {
        // update affiliate state
        setAffiliateInfo(data.affiliate);
      }
    };

    const copyLink = () => {
        navigator.clipboard.writeText(affiliateInfo.referral_code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleLogout = async () => {
      await signOut(auth);
    };

    const handleBoostCode = async () => {
      if (!affiliateInfo) {
        toast({ title: "Sign in first", variant: "destructive" });
        return;
      }
    
      if (!boostCode.trim()) return;
    
      setBoostLoading(true);
    
      try {
        const user = auth.currentUser;
        if (!user) throw new Error("Not authenticated");
    
        const idToken = await user.getIdToken();
    
        const res = await fetch("/affiliate/api/validateCode", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            code: boostCode.trim(),
          }),
        });
    
        if (!res.ok) {
          const text = await res.text(); // fallback
          throw new Error(text || "Request failed");
        }
        
        const result = await res.json();
    
        if (!res.ok) throw new Error(result.error || "Invalid code");
    
        toast({
          title: "Commission upgraded 🚀",
          description: `New rate: ${result.new_rate}%`,
        });
    
        setBoostCode("");
        
        router.refresh()
    
      } catch (err: any) {
        toast({
          title: "Invalid code",
        });
      } finally {
        setBoostLoading(false);
      }
    };

    const handleSuccess = async () => {
      await Promise.all([fetchAffiliate(), fetchWithdrawals()]);
    };
  
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-card border border-border max-w-2xl mx-auto mb-5 rounded-xl p-6 space-y-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card border border-border rounded-xl p-6 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-2">
                    <CheckCircle className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-xl font-heading font-bold text-foreground">You're all set!</h2>
                
                <p className="text-sm text-muted-foreground"> Share this code and earn {affiliateInfo.commission_rate}% on every course sale.</p>
                <div className="flex items-center gap-2">
                    <Input value={affiliateInfo.referral_code} readOnly className="text-sm" />
                    <Button variant="outline" size="icon" onClick={copyLink}>
                        {copied ? <CheckCircle className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                    </Button>
                </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-xl p-4 text-center">
                  <p className="text-sm text-muted-foreground">Referrals</p>
                  <p className="text-2xl font-heading font-bold text-foreground">{affiliateInfo.referral_count ?? 0}</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 text-center">
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                  <p className="text-2xl font-heading font-bold text-foreground">₦{Number(affiliateInfo.total_earnings).toLocaleString()}</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Wallet className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Available</p>
                  <p className="text-2xl font-heading font-bold text-primary">₦{(affiliateInfo.pending_earnings).toLocaleString()}</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Banknote className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">Total Withdrawn</p>
                  <p className="text-2xl font-heading font-bold text-foreground">₦{(affiliateInfo.paid_earnings).toLocaleString()}</p>
                </div>
            </div>

            {affiliateInfo.commission_rate < 10 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border border-primary/20 rounded-xl p-6 space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    <h3 className="font-heading font-semibold text-foreground">Upgrade to 10% Commission</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Have a boost code? Enter it below to upgrade your commission rate from {affiliateInfo.commission_rate}% to 10%.
                  </p>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Enter boost code"
                      value={boostCode}
                      onChange={(e) => setBoostCode(e.target.value)}
                      className="uppercase"
                    />
                    <Button onClick={handleBoostCode} disabled={boostLoading || !boostCode.trim()} className="cursor-pointer">
                      {boostLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Apply"}
                    </Button>
                  </div>
                </motion.div>
              )}

              {affiliateInfo.commission_rate >= 10 && (
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center gap-3">
                  <Zap className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Boosted Commission Active</p>
                    <p className="text-xs text-muted-foreground">You're earning {affiliateInfo.commission_rate}% on every referral sale.</p>
                  </div>
                </div>
              )}

            {!showWithdraw ? <Button onClick={() => setShowWithdraw(true)} className="w-full" variant="outline" size="lg">
                  <Banknote className="mr-2 w-4 h-4" /> Request Withdrawal
            </Button> : <AffiliateWithdraw affiliateId={affiliateInfo.id} pendingEarnings={affiliateInfo.pending_earnings} onClose={() => setShowWithdraw(false)} onSuccess={handleSuccess}/>}
            {withdrawals && withdrawals.length > 0 && <WithdrawHistory withdrawals={withdrawals}/>}
            <Button
              variant="ghost"
              className="p-[1em] justify-start gap-2 text-muted-foreground hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span className="group-data-[collapsible=icon]:hidden">Logout</span>
            </Button>
        </motion.div>
    );
}