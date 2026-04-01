"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { type AffiliateFormProps } from "@/lib/affiliate";
import { Label } from "./ui/label";
import { Loader2 } from "lucide-react";

export default function AffiliateForm({ loginAndInit, loading }: AffiliateFormProps) {
  return (
    <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card border border-border max-w-2xl mx-auto mb-5 rounded-xl p-6 space-y-4"
    >
              <h2 className="text-xl font-heading font-bold text-foreground text-center">Join the Program</h2>
              <p className="text-muted-foreground text-sm">Sign in to start earning with your referral link</p>
              <Button onClick={loginAndInit} disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Join Affiliate Program"
                )}
              </Button>
            </motion.form>
  );
}