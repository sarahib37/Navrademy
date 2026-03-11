"use client";

export const dynamic = "force-dynamic"; 

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CreditCard,
  ShieldCheck,
  FileCheck,
  CheckCircle,
  Loader2,
  PartyPopper,
  ArrowRight,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const steps = [
  { label: "Processing payment...", icon: CreditCard },
  { label: "Verifying transaction...", icon: ShieldCheck },
  { label: "Confirming enrollment...", icon: FileCheck },
  { label: "Finalizing...", icon: CheckCircle },
];

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const reference = searchParams.get("reference");
  const course = searchParams.get("course") || "Your Course";

  const [stepIndex, setStepIndex] = useState(0);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!reference) {
      setError("Invalid payment reference.");
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await fetch(
          `/courses/api/paystack/verify?reference=${reference}`
        );

        const data = await res.json();

        if (data.status === "success") {
          // Animate steps quickly when success
          for (let i = 0; i < steps.length; i++) {
            await new Promise((r) => setTimeout(r, 600));
            setStepIndex(i);
          }

          await new Promise((r) => setTimeout(r, 400));
          setVerified(true);
        } else {
          setError("Payment could not be verified.");
        }
      } catch (err) {
        setError("Verification failed. Please contact support.");
      }
    };

    verifyPayment();
  }, [reference]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-row items-center justify-center">
        <div>
          <h1 className="text-lg text-red-600">{error}</h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="hero"
                    size="lg"
                    className="flex-1"
                    onClick={() => router.push("/courses/live")}
                  >
                    Back to Courses
                    <ArrowRight className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="heroOutline"
                    size="lg"
                    className="flex-1"
                    onClick={() => router.push("/contact")}
                  >
                    Contact Support
                  </Button>
      </div>
    </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="section-padding pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-center">

          {!verified ? (
            /* VERIFYING UI */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md w-full"
            >
              <div className="elevated-card rounded-2xl p-10 space-y-8">

                <div className="flex flex-col items-center space-y-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center"
                  >
                    <CreditCard className="h-10 w-10 text-primary" />
                  </motion.div>

                  <div className="text-center space-y-1">
                    <h1 className="text-2xl font-heading font-bold text-foreground">
                      Verifying Payment
                    </h1>

                    <p className="text-sm text-muted-foreground">
                      Please wait while we confirm your payment
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {steps.map((step, i) => {
                    const Icon = step.icon;

                    return (
                      <motion.div
                        key={step.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: i <= stepIndex ? 1 : 0.3,
                          x: 0,
                        }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 py-2"
                      >
                        {i < stepIndex ? (
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-primary" />
                          </div>
                        ) : i === stepIndex ? (
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Loader2 className="h-4 w-4 text-primary animate-spin" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full border flex items-center justify-center">
                            <Icon className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )}

                        <span
                          className={`text-sm font-medium ${
                            i <= stepIndex
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {step.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="rounded-xl bg-muted/50 p-4 text-center">
                  <p className="text-xs text-muted-foreground">Enrolling in</p>
                  <p className="text-sm font-heading font-bold text-foreground">
                    {course}
                  </p>
                </div>

                <p className="text-xs text-center text-muted-foreground">
                  Do not close this page. You'll be redirected automatically.
                </p>

              </div>
            </motion.div>
          ) : (
            /* SUCCESS UI */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg w-full text-center"
            >
              <div className="elevated-card rounded-2xl p-10 space-y-6">

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="mx-auto w-24 h-24 rounded-full bg-green-100 flex items-center justify-center relative"
                >
                  <CheckCircle className="h-12 w-12 text-green-600" />

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: -10 }}
                    transition={{ delay: 0.4 }}
                    className="absolute -top-2 -right-2"
                  >
                    <PartyPopper className="h-8 w-8 text-primary" />
                  </motion.div>
                </motion.div>

                <div>
                  <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                    Payment Successful!
                  </h1>

                  <p className="text-muted-foreground">
                    You're now enrolled in{" "}
                    <span className="font-semibold text-foreground">
                      {course}
                    </span>.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="hero"
                    size="lg"
                    className="flex-1"
                    onClick={() => router.push("/courses/live")}
                  >
                    Explore More Courses
                    <ArrowRight className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="heroOutline"
                    size="lg"
                    className="flex-1"
                    onClick={() => router.push("/")}
                  >
                    Back to Home
                  </Button>
                </div>

              </div>
            </motion.div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
}