"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";

type Props = {
  affiliateId: string;
  pendingEarnings: number;
  onClose: () => void;
  onSuccess: () => Promise<void>;
};

export default function AffiliateWithdraw({ affiliateId, pendingEarnings, onClose, onSuccess }: Props) {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const router = useRouter()
  const auth = getAuth()

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const amount = Number(withdrawAmount);
  
    if (amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Enter a valid withdrawal amount",
        variant: "destructive",
      });
      return;
    }
  
    if (amount > pendingEarnings) {
      toast({
        title: "Insufficient balance",
        description: "You cannot withdraw more than available funds",
        variant: "destructive",
      });
      return;
    }
  
    setWithdrawLoading(true);
  
    try {
      const user = auth.currentUser;

      const token = await user?.getIdToken();

      const res = await fetch("/affiliate/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" , Authorization: `Bearer ${token}`,},
        body: JSON.stringify({
          amount,
          bank_name: bankName,
          account_number: accountNumber,
          account_name: accountName,
        }),
      });

      const data = await res.json()

      if (!data.success){
        toast({
          title: "Request failed",
          description: data.error || "Something went wrong",
          variant: "destructive",
        });

        return
      }
  
      toast({
        title: "Request submitted",
        description: "Your withdrawal request has been sent",
      });

      await onSuccess();
  
      setWithdrawAmount("");
      setBankName("");
      setAccountNumber("");
      setAccountName("");
  
      onClose();
  
    } catch (err) {
      console.error(err);
  
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setWithdrawLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleWithdraw}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl p-6 space-y-4"
    >
      <h3 className="text-lg font-heading font-semibold text-foreground">Request Withdrawal</h3>
      <div className="space-y-2">
        <Label>Amount (₦)</Label>
        <Input type="number" placeholder="e.g. 5000" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} required min="1" />
      </div>
      <div className="space-y-2">
        <Label>Bank Name</Label>
        <Input placeholder="e.g. GTBank" value={bankName} onChange={(e) => setBankName(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label>Account Number</Label>
        <Input placeholder="0123456789" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label>Account Name</Label>
        <Input placeholder="Full name on account" value={accountName} onChange={(e) => setAccountName(e.target.value)} required />
      </div>
      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
        <Button type="submit" className="flex-1" disabled={withdrawLoading}>
          {withdrawLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit Request
        </Button>
      </div>
    </motion.form>
  )
}