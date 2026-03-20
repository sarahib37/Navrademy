import { Suspense } from "react";
import AdminDashboard from "@/components/AdminDashboard"; 

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <AdminDashboard />
    </Suspense>
  );
}