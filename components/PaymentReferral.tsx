"use client";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, Link2, X } from "lucide-react";

type Props = {
  referralCode: string;
  setReferralCode: (val: string) => void;
  referralApplied: string | null;
  applyReferral: () => void;
  removeReferral: () => void;
  loading: boolean;
};

export default function PaymentReferral({
  referralCode,
  setReferralCode,
  referralApplied,
  applyReferral,
  removeReferral,
  loading,
}: Props) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
        <Link2 className="h-3.5 w-3.5" /> Referral Code
      </Label>

      {referralApplied ? (
        <div className="flex items-center justify-between rounded-lg bg-primary/10 px-3 py-2">
          <span className="text-sm font-semibold text-primary">
            {referralApplied}
          </span>
          <button
            onClick={removeReferral}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            placeholder="Enter referral code"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            className="text-sm h-9"
          />

          <Button
            variant="outline"
            size="sm"
            onClick={applyReferral}
            disabled={loading || !referralCode.trim()}
          >
            {loading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              "Apply"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}