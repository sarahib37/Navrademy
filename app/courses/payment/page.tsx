"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Shield, Clock} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import PaymentLoading from "@/components/PaymentLoading";
import PaymentCoupon from "@/components/PaymentCoupon";
import PaymentReferral from "@/components/PaymentReferral";
import { toast } from "@/hooks/use-toast";

export default function PaymentPage() {
  const [amount, setAmount] = useState(0);
  const [courseTitle, setCourseTitle] = useState("");
  const [email, setEmail] = useState("");
  const [duration, setDuration] = useState("");
  const [curriculum, setCurriculum] = useState<string[]>([]);
  const [originalAmount, setOriginalAmount] = useState(0);
  const [displayAmount, setDisplayAmount] = useState(originalAmount);
  const [discount, setDiscount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [couponLoading, setCouponLoading] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [referralApplied, setReferralApplied] = useState<string | null>(null);
  const [referralLoading, setReferralLoading] = useState(false);

  const [error, setError] = useState("");

  const initPayment = async () => {
    try {
      const res = await fetch("/courses/api/paystack/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        setCourseTitle(data.courseTitle);
        setOriginalAmount(data.originalAmount / 100);
        setDisplayAmount(data.originalAmount / 100);
        setEmail(data.email);
        setCurriculum(data.curriculum || []);
        setDuration(data.duration || "");
      } else {
        setError(data.error);
      }
    } catch {
      setError("Failed to load payment data");
    } finally {
      setLoading(false);    
    }
  }

  useEffect(() => {
    initPayment();
  }, []);

  // smooth price animation
  useEffect(() => {
    let start = displayAmount;
    let end = amount;

    if (start === end) return;

    const duration = 300;
    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const value = Math.floor(start + (end - start) * progress);

      setDisplayAmount(value);

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [amount]);

  const removeCoupon = () => {
    setCoupon("");
    setCouponApplied(false);
    setDiscount(0);
    setAmount(originalAmount);

    toast({
      title: "Coupon removed",
    });
  };


  const applyCoupon = async () => {
    setCouponLoading(true)
    try {
      const res = await fetch("/courses/api/coupon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coupon }),
      });

      const data = await res.json();

      if (data.status === "valid") {
        setOriginalAmount(data.originalAmount / 100);
        setAmount(data.finalAmount / 100);
        setDiscount(data.discount / 100);
        setCouponApplied(true);

        toast({
          title: "Coupon applied 🎉",
          description: `You saved ₦${(data.discount / 100).toLocaleString()}`,
        });
      } else {
        setCouponApplied(false);
        setDiscount(0);
        setAmount(originalAmount);

        const messages = {
          not_found: "Coupon does not exist",
          expired: "This coupon has expired",
          invalid_course: "Not valid for this course",
        };

        toast({
          title: "Invalid coupon",
          description:
            messages[data.status as keyof typeof messages] ||
            "Something went wrong",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to apply coupon",
      });
    }finally {
        setCouponLoading(false);
    }
  };


  const applyReferral = async () => {
    setReferralLoading(true);
  
    try {
      const res = await fetch("/courses/api/referral", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ referralCode }),
      });
  
      const data = await res.json();
  
      if (data.status === "valid") {
        setReferralApplied(referralCode);
        localStorage.setItem("affiliate_ref", referralCode);
  
        toast({
          title: "Referral applied 🎉",
          description: "You are supporting a partner",
        });
      } else {
        toast({
          title: "Invalid referral",
          description: "This referral code does not exist",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to apply referral",
      });
    } finally {
      setReferralLoading(false);
    }
  };

  const removeReferral = () => {
    setReferralCode("");
    setReferralApplied(null);
    localStorage.removeItem("affiliate_ref");
  
    toast({
      title: "Referral removed",
    });
  };

  const payNow = async () => {
    setLoading(true);

    try {
      const res = await fetch("/courses/api/paystack/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coupon, referralCode }),
      });

      const data = await res.json();

      if (res.ok) {
        window.location.href = data.authorization_url;
      } else {
        toast({
          title: "Payment error",
          description: data.error,
        });
      }
    } catch {
      toast({
        title: "Payment failed",
        description: "Try again",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="section-padding pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">

            {loading ? <PaymentLoading/> : (
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
                  <p className="text-sm text-muted-foreground">
                    Registering as{" "}
                    <span className="font-semibold text-foreground">
                      {email}
                    </span>
                  </p>
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

                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <Clock className="h-4 w-4" /> Duration
                      </span>
                      <span className="font-semibold text-foreground">{duration}</span>
                    </div>

                    <div className="flex justify-between py-3">
                      <span className="text-muted-foreground font-medium">
                        Total
                      </span>

                      <span className="text-2xl font-bold text-primary">
                        ₦{originalAmount.toLocaleString()}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-heading font-bold text-foreground mb-3">What's Included</h3>
                      <ul className="space-y-2">
                        {curriculum && curriculum.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                      <div className="elevated-card rounded-2xl p-6 space-y-5">

                      <PaymentCoupon
                        coupon={coupon}
                        setCoupon={setCoupon}
                        couponApplied={couponApplied}
                        applyCoupon={applyCoupon}
                        removeCoupon={removeCoupon}
                        loading={couponLoading}
                      />

                      <PaymentReferral
                        referralCode={referralCode}
                        setReferralCode={setReferralCode}
                        referralApplied={referralApplied}
                        applyReferral={applyReferral}
                        removeReferral={removeReferral}
                        loading={referralLoading}
                      />

                        <h3 className="font-heading font-bold text-lg">
                          Pay with Paystack
                        </h3>

                        <div className="rounded-xl bg-muted/50 p-4 text-center">
                          <motion.p
                            key={amount}
                            initial={{ scale: 0.95, opacity: 0.7 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.25 }}
                            className="text-3xl font-heading font-bold"
                          >
                            ₦{displayAmount.toLocaleString()}
                          </motion.p>

                          <p className="text-xs text-muted-foreground">
                            {discount > 0 ? `You saved ₦${discount.toLocaleString()}` : "One-time payment"}
                          </p>
                        </div>

                        <Button
                          variant="hero"
                          size="lg"
                          className="w-full"
                          onClick={payNow}
                        >
                          Pay Now
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