"use client"

import { Banknote, Clock, Copy, DollarSign, Link2, Search, Users, XCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {}

export default function AdminAffiliates({}: Props) {
  const [affiliates, setAffiliates] = useState<any[]>([]);
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [referralConversions, setReferralConversions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [withdrawalSearch, setWithdrawalSearch] = useState("");
  const [payDialog, setPayDialog] = useState<any>(null);
  const [amountPaid, setAmountPaid] = useState("");
  const [withdrawalLoading, setWithdrawalLoading] = useState(false)
  const queryClient = useQueryClient();

  useEffect(() => {
    fetch("/admin/api/withdrawals")
      .then((res) => res.json())
      .then(setWithdrawals);

    fetch("/admin/api/referrals")
      .then((res) => res.json())
      .then(setReferralConversions);

    fetch("/admin/api/affiliates")
      .then((res) => res.json())
      .then((data) => {
        setAffiliates(data);
        setIsLoading(false);
      });
  }, []);

  const updateWithdrawal = useMutation({
    mutationFn: async ({ id, status, amount_paid }: { id: string; status: string; amount_paid?: number }) => {
      const res = await fetch("/admin/api/withdrawals/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status, amount_paid }),
      });
  
      if (!res.ok) {
        throw new Error("Failed to update withdrawal");
      }
  
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["withdrawals"] });
    }
  });

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const totalAffiliates = affiliates.length;
  const totalReferrals = referralConversions.length;
  const totalEarnings = affiliates.reduce((sum, a) => sum + (a.total_earnings || 0), 0);
  const totalPaid = withdrawals
    .filter((w) => w.status === "paid")
    .reduce((sum, w) => sum + (w.amount_paid || 0), 0);
  const pendingWithdrawals = withdrawals.filter((w) => w.status === "pending").length;

  const filteredAffiliates = useMemo(() => {
    console.log(affiliates)
    if (!search.trim()) return affiliates;

    const term = search.toLowerCase();

    return affiliates.filter((a) =>
      (a.name || "").toLowerCase( ).includes(term) ||
      (a.email || "").toLowerCase().includes(term) ||
      (a.referral_code || "").toLowerCase().includes(term)
    );
  }, [affiliates, search]);


  const filteredWithdrawals = useMemo(() => {
    if (!withdrawalSearch.trim()) return withdrawals;
    const term = withdrawalSearch.toLowerCase();
    console.log(term)
    return withdrawals.filter((w) =>
      (w.bank_name || "").toLowerCase().includes(term) ||
      (w.account_name || "").toLowerCase().includes(term)
    );
  }, [withdrawals, withdrawalSearch]);

  const statusIcon = (status: string) => {
    if (status === "paid") return "✔️";
    if (status === "pending") return "⏳";
    return "❌";
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {[
          { label: "Total Affiliates", value: totalAffiliates, icon: Users },
          { label: "Total Referrals", value: totalReferrals, icon: Link2 },
          { label: "Total Commissions", value: `₦${totalEarnings.toLocaleString()}`, icon: DollarSign },
          { label: "Total Paid Out", value: `₦${totalPaid.toLocaleString()}`, icon: Banknote },
          { label: "Pending Payouts", value: pendingWithdrawals, icon: Clock },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <stat.icon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-lg font-heading font-bold text-foreground mt-0.5">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="affiliates" className="space-y-6">
        <TabsList className="flex-wrap">
          <TabsTrigger value="affiliates">Who Earned</TabsTrigger>
          <TabsTrigger value="activity">Referral Activity</TabsTrigger>
          <TabsTrigger value="withdrawals">
            Payouts
            {pendingWithdrawals > 0 && (
              <span className="ml-2 bg-destructive text-destructive-foreground text-xs rounded-full px-1.5 py-0.5">
                {pendingWithdrawals}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="affiliates" className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-heading font-semibold text-foreground">All Affiliates</h2>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {isLoading ? (
              <div className="p-6 space-y-3">
                {[1, 2, 3].map((i) => <Skeleton key={i} className="h-12 w-full" />)}
              </div>
            ) : !filteredAffiliates?.length ? (
              <div className="p-12 text-center text-muted-foreground">{search ? "No affiliates match your search." : "No affiliates yet."}</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead className="hidden sm:table-cell">Referrals</TableHead>
                    <TableHead className="hidden sm:table-cell">Rate</TableHead>
                    <TableHead className="hidden sm:table-cell">Earnings</TableHead>
                    <TableHead className="hidden md:table-cell">Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAffiliates.map((affiliate) => (
                    <TableRow key={affiliate.id}>
                      <TableCell className="font-medium">{affiliate.name}</TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground text-sm">{affiliate.email}</TableCell>
                      <TableCell>
                        <code className="bg-muted px-2 py-0.5 rounded text-xs font-mono">{affiliate.referral_code}</code>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm font-medium">{affiliate.referral_count ?? 0}</TableCell>
                      <TableCell className="hidden sm:table-cell text-sm">{affiliate.commission_rate}%</TableCell>
                      <TableCell className="hidden sm:table-cell text-sm">₦{Number(affiliate.total_earnings).toLocaleString()}</TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                        {new Date(affiliate.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => copyCode(affiliate.referral_code)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </TabsContent>

        {/* ── Referral Activity (From What?) ── */}
        <TabsContent value="activity" className="space-y-4">
          <h2 className="text-lg font-heading font-semibold text-foreground">Referral Activity</h2>
          <p className="text-sm text-muted-foreground">Every conversion showing which affiliate earned from which course purchase.</p>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {!referralConversions?.length ? (
              <div className="p-12 text-center text-muted-foreground">No referral conversions recorded yet.</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Affiliate Code</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Buyer Email</TableHead>
                    <TableHead>Amount Paid</TableHead>
                    <TableHead>Commission Earned</TableHead>
                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {referralConversions.map((rc) => {
                    return (
                      <TableRow key={rc.id}>
                        <TableCell className="font-medium">{rc.referralCode}</TableCell>
                        <TableCell className="text-sm">{rc.courseTitle}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{rc.email}</TableCell>
                        <TableCell className="text-sm">₦{Number(rc.amount).toLocaleString()}</TableCell>
                        <TableCell className="text-sm font-medium text-primary">₦{Number(rc.affiliateEarning).toLocaleString()}</TableCell>
                        <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                          {new Date(rc.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </div>
        </TabsContent>

        {/* ── Payouts (Pending + History) ── */}
        <TabsContent value="withdrawals" className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-heading font-semibold text-foreground">Payout Requests</h2>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search..." value={withdrawalSearch} onChange={(e) => setWithdrawalSearch(e.target.value)} className="pl-9" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {!filteredWithdrawals?.length ? (
              <div className="p-12 text-center text-muted-foreground">No withdrawal requests yet.</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Affiliate</TableHead>
                    <TableHead>Requested</TableHead>
                    <TableHead className="hidden md:table-cell">Bank</TableHead>
                    <TableHead className="hidden md:table-cell">Account</TableHead>
                    <TableHead className="hidden sm:table-cell">Account Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">Paid</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredWithdrawals.map((w: any) => (
                    <TableRow key={w.id}>
                      <TableCell className="font-medium">{w.affiliates?.name ?? "—"}</TableCell>
                      <TableCell className="text-sm">₦{Number(w.amount).toLocaleString()}</TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{w.bank_name}</TableCell>
                      <TableCell className="hidden md:table-cell text-sm font-mono">{w.account_number}</TableCell>
                      <TableCell className="hidden sm:table-cell text-sm">{w.account_name}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-1 text-xs font-medium capitalize">
                          {statusIcon(w.status)} {w.status}
                        </span>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm">₦{Number(w.amount_paid).toLocaleString()}</TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                        {new Date(w.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </TableCell>
                      <TableCell className="text-right">
                        {w.status === "pending" && (
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="outline" size="sm" onClick={() => { setPayDialog(w); setAmountPaid(String(w.amount)); }}>
                              Mark Paid
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => updateWithdrawal.mutate({ id: w.id, status: "rejected" })}>
                              <XCircle className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        )}
                        {w.status === "paid" && <span className="text-xs text-muted-foreground">Completed</span>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Pay Dialog */}
      <Dialog open={!!payDialog} onOpenChange={(open) => !open && setPayDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Payment</DialogTitle>
            <DialogDescription>
              Enter the amount paid to {payDialog?.affiliates?.name}. Requested: ₦{Number(payDialog?.amount ?? 0).toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Bank: {payDialog?.bank_name}</Label>
              <p className="text-sm text-muted-foreground">Account: {payDialog?.account_number} — {payDialog?.account_name}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount-paid">Amount Paid (₦)</Label>
              <Input id="amount-paid" type="number" value={amountPaid} onChange={(e) => setAmountPaid(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPayDialog(null)}>Cancel</Button>
            <Button
              onClick={() => updateWithdrawal.mutate({ id: payDialog.id, status: "paid", amount_paid: Number(amountPaid) })}
              disabled={updateWithdrawal.isPending}
            >
              Confirm Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}