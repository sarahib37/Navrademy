"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Mail, Loader2, ArrowRight } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: string;
  courseTitle: string;
  courseAmount: number;
}

export default function EnrollEmailDialog({
  open,
  onOpenChange,
  courseId,
  courseTitle,
  courseAmount
}: Props) {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email) return;

    setLoading(true);

    try {
      const res = await fetch("/courses/api/auth/send-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          courseId,
          courseTitle,
          courseAmount: courseAmount * 100
        })
      });

      if (res.ok) {
        setSent(true);
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  function closeDialog() {
    setEmail("");
    setSent(false);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-[480px] rounded-2xl p-0 overflow-hidden">

        <div className="bg-gradient-to-br from-primary to-accent p-6 pb-8">
          <DialogHeader>

            <div className="mx-auto w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-4">
              <Mail className="h-7 w-7 text-primary-foreground" />
            </div>

            <DialogTitle className="text-2xl font-heading font-bold text-primary-foreground text-center">
              Enroll in {courseTitle}
            </DialogTitle>

            <DialogDescription className="text-primary-foreground/80 text-center mt-1">
              Enter your email to begin the enrollment process. We'll send a verification link.
            </DialogDescription>

          </DialogHeader>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">

            <div className="space-y-2">
              <Label htmlFor="enroll-email">Email Address</Label>

              <Input
                id="enroll-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 text-base"
              />
            </div>

            <Button
              variant="hero"
              size="lg"
              className="w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending Verification...
                </>
              ) : (
                <>
                  Verify & Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By enrolling, you agree to Navrademy's Terms of Service and Privacy Policy.
            </p>

          </form>
        ) : (
          <div className="p-6 text-center space-y-3">

            <p className="text-green-600 font-medium">
              Verification email sent.
            </p>

            <p className="text-sm text-muted-foreground">
              Check your inbox and click the link to continue enrollment.
            </p>

            <Button onClick={closeDialog} className="w-full">
              Close
            </Button>

          </div>
        )}

      </DialogContent>
    </Dialog>
  );
}