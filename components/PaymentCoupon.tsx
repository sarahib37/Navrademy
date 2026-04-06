"use client"

import { Label } from './ui/label'
import { Loader2, Tag, X } from 'lucide-react'
import { Input } from './ui/input';
import { Button } from './ui/button';

type Props = {
  coupon: string;
  setCoupon: (val: string) => void;
  couponApplied: boolean;
  applyCoupon: () => void;
  removeCoupon: () => void;
  loading: boolean;
}

export default function PaymentCoupon({coupon,
  setCoupon,
  couponApplied,
  applyCoupon,
  removeCoupon,
  loading,}: Props) {

  return (
    <div className="space-y-2">
        <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <Tag className="h-3.5 w-3.5" /> Coupon Code
        </Label>
        {couponApplied ? (
            <div className="flex items-center justify-between rounded-lg bg-primary/10 px-3 py-2">
            <span className="text-sm font-semibold text-primary">{coupon}</span>
            <button onClick={removeCoupon} className="text-muted-foreground hover:text-foreground">
                <X className="h-3.5 w-3.5" />
            </button>
            </div>
        ) : (
            <div className="flex gap-2">
            <Input
                placeholder="Enter code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                className="text-sm h-9"
            />
            <Button variant="outline" size="sm" onClick={applyCoupon} disabled={loading || !coupon.trim()} className="shrink-0">
                {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Apply"}
            </Button>
            </div>
        )}
    </div>
  )
}