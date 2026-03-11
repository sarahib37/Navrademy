"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, CheckCircle, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function VerifyEmailClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Invalid verification link.");
      setVerifying(false);
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch("/courses/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setVerified(true);

          setTimeout(() => {
            router.push("/courses/payment");
          }, 2500);
        } else {
          setError(data.error || "Verification failed.");
        }
      } catch (err) {
        setError("Verification failed.");
      } finally {
        setVerifying(false);
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        {/* VERIFYING */}
        {verifying && !verified && !error && (
          <div className="elevated-card rounded-2xl p-8 space-y-6">
            <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Verifying Email</h1>
            <p className="text-muted-foreground text-sm">
              Please wait while we confirm your email address.
            </p>
            <div className="flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          </div>
        )}

        {/* SUCCESS */}
        {verified && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="elevated-card rounded-2xl p-8 space-y-6"
          >
            <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Email Verified!</h1>
            <p className="text-muted-foreground text-sm">
              Redirecting you to payment...
            </p>
            <div className="flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          </motion.div>
        )}

        {/* ERROR */}
        {error && (
          <div className="elevated-card rounded-2xl p-8 space-y-6">
            <h1 className="text-xl font-semibold text-red-600">
              Verification Failed
            </h1>
            <p className="text-sm text-muted-foreground mt-2">{error}</p>
            <Button onClick={() => router.push("/courses")} className="w-full">
              Return to Courses
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
