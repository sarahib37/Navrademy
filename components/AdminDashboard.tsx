"use client";

import AdminRoute from "@/components/AdminRoute";
import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import AdminBlog from "@/components/AdminBlog";
import AdminCourses from "@/components/AdminCourses";
import AdminEvents from "@/components/AdminEvents";
import AdminAnalytics from "@/components/AdminAnalytics";
import { BlogEditor } from "@/components/BlogEditor";
import AdminAffiliates from "./AdminAffiliates";

export default function AdminDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeSection = searchParams.get("tab") || "blog";
  const mode = searchParams.get("mode"); // create | edit | null
  const blogId = searchParams.get("id");

  const handleSectionChange = (section: string) => {
    router.push(`/admin/dashboard?tab=${section}`);
  };

  useEffect(() => {
    if (!searchParams.get("tab")) {
      router.replace("/admin/dashboard?tab=blog");
    }
  }, []);

  // Default components
  const sections: Record<string, React.ComponentType> = {
    blog: AdminBlog,
    courses: AdminCourses,
    events: AdminEvents,
    affiliates: AdminAffiliates,
    analytics: AdminAnalytics,
  };

  const ActiveComponent = sections[activeSection];

  return (
    <AdminRoute>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">

          <AdminSidebar
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />

          <div className="flex-1 flex flex-col min-w-0">

            <header className="h-14 border-b border-border bg-card flex items-center gap-3 px-4 shrink-0">
              <SidebarTrigger />
              <h1 className="font-heading font-semibold text-foreground capitalize">
                {activeSection.toUpperCase()}
              </h1>
            </header>

            <main className="flex-1 p-6 overflow-auto">

              {/* CREATE BLOG */}
              {activeSection === "blog" && mode === "create" && (
                <BlogEditor/>
              )}

              {/* EDIT BLOG */}
              {activeSection === "blog" && mode === "edit" && (
                <BlogEditor/>
              )}

              {/* DEFAULT VIEW */}
              {!mode && <ActiveComponent />}

            </main>

          </div>
        </div>
      </SidebarProvider>
    </AdminRoute>
  );
}