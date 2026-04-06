"use client"

import { motion } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

type Props = {}

const loadingSteps = [
    "Fetching course details...",
    "Verifying enrollment eligibility...",
    "Preparing payment options...",
    "Almost ready...",
];

export default function PaymentLoading({}: Props) {
    const [stepIndex, setStepIndex] = useState(0);  

    useEffect(() => {
        const interval = setInterval(() => {
          setStepIndex((prev) =>
            prev < loadingSteps.length - 1 ? prev + 1 : prev
          );
        }, 900);
    
        return () => clearInterval(interval);
    }, []);

  return (
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
  )
}