type Props = {
  withdrawals: any[]
}

function WithdrawHistory({withdrawals}: Props) {
  const statusColor = (status: string) => {
    if (status === "paid") return "bg-primary/10 text-primary";
    if (status === "rejected") return "bg-destructive/10 text-destructive";
    return "bg-yellow-500/10 text-yellow-600";
  };
  
  return (
        <div className="bg-card border border-border rounded-xl p-6 space-y-3">
          <h3 className="text-lg font-heading font-semibold text-foreground">Withdrawal History</h3>
          <div className="space-y-2">
            {withdrawals.length === 0 ? (<p className="text-sm text-muted-foreground">No withdrawals yet</p>) : withdrawals.map((w: any) => (
              <div key={w.id} className="flex items-center justify-between border-b border-border pb-2 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-foreground">₦{Number(w.amount).toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(w.created_at._seconds * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {w.amount_paid > 0 && w.status === "paid" && (
                    <span className="text-xs text-muted-foreground">Paid: ₦{Number(w.amount_paid).toLocaleString()}</span>
                  )}
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusColor(w.status)}`}>
                    {w.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
  )
}

export default WithdrawHistory