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

export default function AdminDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get tab from URL
  const activeSection = searchParams.get("tab") || "blog";

  // Component map
  const sections: Record<string, React.ComponentType> = {
    blog: AdminBlog,
    courses: AdminCourses,
    events: AdminEvents,
    analytics: AdminAnalytics,
  };

  // Update URL when sidebar changes
  const handleSectionChange = (section: string) => {
    router.push(`/admin/dashboard?tab=${section}`);
  };

  // Ensure URL always has a tab
  useEffect(() => {
    if (!searchParams.get("tab")) {
      router.replace("/admin/dashboard?tab=blog");
    }
  }, [searchParams, router]);

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
              <BlogEditor
                isEditing={false}
                onSave={(data) => console.log("Save blog", data)}
                onCancel={() => console.log("Cancel editing")}
              />;
            </main>
          </div>

        </div>
      </SidebarProvider>
    </AdminRoute>
  );
}