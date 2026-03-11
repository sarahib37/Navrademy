"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const loadingSteps = [
  "Fetching course details...",
  "Verifying enrollment eligibility...",
  "Preparing payment options...",
  "Almost ready...",
];

export default function PaymentPage() {
  const [loading, setLoading] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);
  const [apiFinished, setApiFinished] = useState(false);

  const [courseTitle, setCourseTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [authorizationUrl, setAuthorizationUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout;

    // Step animation
    interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 900);

    const initPayment = async () => {
      try {
        const res = await fetch("/courses/api/paystack/initiate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (res.ok) {
          setCourseTitle(data.courseTitle);
          setAmount(data.amount / 100);
          setAuthorizationUrl(data.authorization_url);
        } else {
          setError(data.error || "Failed to initialize payment");
        }
      } catch (err) {
        setError("Failed to initialize payment");
      } finally {
        setApiFinished(true);
      }
    };

    initPayment();

    return () => clearInterval(interval);
  }, []);

  // Finish remaining loading steps once API is done
  useEffect(() => {
    if (!apiFinished) return;

    const finishSteps = async () => {
      while (stepIndex < loadingSteps.length - 1) {
        await new Promise((r) => setTimeout(r, 250));
        setStepIndex((prev) => prev + 1);
      }

      await new Promise((r) => setTimeout(r, 300));
      setLoading(false);
    };

    finishSteps();
  }, [apiFinished, stepIndex]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="section-padding pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">

            {loading ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-16"
              >
                <div className="elevated-card rounded-2xl p-10 max-w-md w-full space-y-8">

                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    </div>

                    <div className="text-center space-y-1">
                      <h2 className="text-xl font-heading font-bold text-foreground">
                        Loading Course Information
                      </h2>

                      <p className="text-sm text-muted-foreground">
                        Preparing your checkout
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {loadingSteps.map((step, i) => (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: i <= stepIndex ? 1 : 0.3,
                          x: 0,
                        }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        {i < stepIndex ? (
                          <CheckCircle className="h-4 w-4 text-primary" />
                        ) : i === stepIndex ? (
                          <Loader2 className="h-4 w-4 text-primary animate-spin" />
                        ) : (
                          <div className="h-4 w-4 border rounded-full" />
                        )}

                        <span
                          className={`text-sm ${
                            i <= stepIndex
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {step}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="space-y-3 pt-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                  </div>

                </div>
              </motion.div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-10"
                >
                  <span className="section-eyebrow">Complete Your Enrollment</span>

                  <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                    Payment for{" "}
                    <span className="gradient-text">{courseTitle}</span>
                  </h1>
                </motion.div>

                <div className="grid md:grid-cols-5 gap-8">

                  <div className="md:col-span-3 elevated-card rounded-2xl p-8 space-y-6">
                    <h2 className="text-xl font-heading font-bold text-foreground">
                      Course Summary
                    </h2>

                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">Course</span>
                      <span className="font-semibold">{courseTitle}</span>
                    </div>

                    <div className="flex justify-between py-3">
                      <span className="text-muted-foreground font-medium">
                        Total
                      </span>

                      <span className="text-2xl font-bold text-primary">
                        ₦{amount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <div className="elevated-card rounded-2xl p-6 space-y-5">

                      <h3 className="font-heading font-bold text-lg">
                        Pay with Paystack
                      </h3>

                      <div className="rounded-xl bg-muted/50 p-4 text-center">
                        <p className="text-3xl font-heading font-bold">
                          ₦{amount.toLocaleString()}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          One-time payment
                        </p>
                      </div>

                      <Button variant="hero" size="lg" className="w-full" asChild>
                        <a href={authorizationUrl}>Pay Now</a>
                      </Button>

                      <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground">
                        <Shield className="h-3.5 w-3.5" />
                        Secured by Paystack. Your data is safe.
                      </div>

                    </div>
                  </div>

                </div>
              </>
            )}

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}