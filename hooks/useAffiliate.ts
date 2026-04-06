import { useEffect, useState } from "react";
import { getAffiliateByEmail, createAffiliate } from "@/lib/affiliate";
import { auth, signInWithGoogle } from "@/lib/firebase";
import { generateCode } from "@/lib/generateToken";
import type { Affiliate } from "@/lib/affiliate";
import { onAuthStateChanged } from "firebase/auth";

export const useAffiliate = () => {
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user?.email) {
        setAffiliate(null);
        setLoading(false);
        return;
      }

      try {
        const existing = await getAffiliateByEmail(user.email);

        if (existing) {
          setAffiliate(existing);
        } else {
          const newAffiliate = await createAffiliate({
            name: user.displayName || "User",
            email: user.email,
            referral_code: generateCode(user.displayName || "user"),
            commission_rate: 5,
            referral_count: 0,
            total_earnings: 0,
            pending_earnings: 0,
            paid_earnings: 0,
            created_at: new Date()
          });

          setAffiliate(newAffiliate);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [])

  const loginAndInit = async () => {
    setLoading(true);

    try {
      await signInWithGoogle();
    } finally {
      setLoading(false);
    }
  };

  return { affiliate, loading, loginAndInit };
};