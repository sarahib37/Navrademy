import { useState } from "react";
import { getAffiliateByEmail, createAffiliate } from "@/lib/affiliate";
import { signInWithGoogle } from "@/lib/firebase";
import { generateCode } from "@/lib/generateToken";
import type { Affiliate } from "@/lib/affiliate";

export const useAffiliate = () => {
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null);
  const [loading, setLoading] = useState(false);

  const loginAndInit = async () => {
    setLoading(true);

    try {
      const user = await signInWithGoogle();

      if (!user.email) throw new Error("No email found");

      const existing = await getAffiliateByEmail(user.email);

      if (existing) {
        setAffiliate(existing);
        return;
      }

      const newAffiliate = await createAffiliate({
        name: user.displayName || "User",
        email: user.email,
        referral_code: generateCode(user.displayName || "user"),
        commission_rate: 5,
        referral_count: 0,
        total_earnings: 0,
        pending_earnings: 0,
        paid_earnings: 0,
      });

      setAffiliate(newAffiliate);

    } finally {
      setLoading(false);
    }
  };

  return { affiliate, loading, loginAndInit };
};