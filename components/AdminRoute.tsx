"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function AdminRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await fetch("/admin/verify/api");

        const data = await res.json();

        if (!data.authorized) {
          router.push("/admin");
        } else {
          setAuthorized(true);
        }
      } catch {
        router.push("/admin");
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [router]);

  if (loading) return <p>Checking credentials...</p>;

  if (!authorized) return null;

  return <>{children}</>;
}