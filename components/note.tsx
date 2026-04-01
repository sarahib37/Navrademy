{/* Signup / Dashboard */}
      {/* <section className="pb-20 px-4">
           <div className="max-w-lg mx-auto space-y-6">
          {!affiliate ? (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card border border-border rounded-xl p-6 space-y-4"
            >
              <h2 className="text-xl font-heading font-bold text-foreground text-center">Join the Program</h2>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required disabled={isLoading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aff-email">Email</Label>
                <Input id="aff-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} />
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Signing up...</>) : "Get My Referral Link"}
              </Button>
            </motion.form>
          ) : (
            <>
               Affiliate Dashboard 
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card border border-border rounded-xl p-6 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-2">
                  <CheckCircle className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-xl font-heading font-bold text-foreground">You're all set!</h2>
                <p className="text-sm text-muted-foreground">
                  Share this link and earn {affiliate.commission_rate}% on every course sale.
                </p>
                <div className="flex items-center gap-2">
                  <Input value={referralLink} readOnly className="text-sm" />
                  <Button variant="outline" size="icon" onClick={copyLink}>
                    {copied ? <CheckCircle className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </motion.div>

              {/* Stats 
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-xl p-4 text-center">
                  <p className="text-sm text-muted-foreground">Referrals</p>
                  <p className="text-2xl font-heading font-bold text-foreground">{referralCount ?? 0}</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 text-center">
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                  <p className="text-2xl font-heading font-bold text-foreground">₦{Number(affiliate.total_earnings).toLocaleString()}</p>
                </div>
              </div>

              {/* Withdraw Button 
              {!showWithdraw ? (
                <Button onClick={() => setShowWithdraw(true)} className="w-full" variant="outline" size="lg">
                  <Banknote className="mr-2 w-4 h-4" /> Request Withdrawal
                </Button>
              ) : (
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
                    <Button type="button" variant="outline" onClick={() => setShowWithdraw(false)} className="flex-1">Cancel</Button>
                    <Button type="submit" className="flex-1" disabled={withdrawLoading}>
                      {withdrawLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Submit Request
                    </Button>
                  </div>
                </motion.form>
              )}

              {/* Withdrawal History 
              {withdrawals && withdrawals.length > 0 && (
                <div className="bg-card border border-border rounded-xl p-6 space-y-3">
                  <h3 className="text-lg font-heading font-semibold text-foreground">Withdrawal History</h3>
                  <div className="space-y-2">
                    {withdrawals.map((w: any) => (
                      <div key={w.id} className="flex items-center justify-between border-b border-border pb-2 last:border-0 last:pb-0">
                        <div>
                          <p className="text-sm font-medium text-foreground">₦{Number(w.amount).toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(w.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
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
              )}
            </>
          )}
        </div>
      </section> */}