"use client";

import { useState } from "react";
import {useRouter} from "next/navigation"
import { Lock, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await fetch("/admin/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      setIsLoading(false);
      alert("Logged in successfully!");
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 2500);
    } else {
      setIsLoading(false);
      setError(data.error);
    } 
    
    setEmail("")
    setPassword("")
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
          <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
              <Lock className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Admin Login</h1>
          <p className="text-muted-foreground mt-1 text-sm">Sign in to manage your content</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                  id="email"
                  type="email"
                  placeholder="admin@navrademy.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
              />
              </div>
          </div>

          <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
              />
              </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
          </form>

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <p className="text-center text-xs text-muted-foreground mt-6">
          This area is restricted to authorized personnel only.
          </p>
      </div>
    </div>
  );
}