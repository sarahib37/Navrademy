"use client"
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";


const About = lazy(() => import("./pages/About"));
const Courses = lazy(() => import("./pages/Courses"));
const LiveCourses = lazy(() => import("./pages/LiveCourses"));
const SelfPacedCourses = lazy(() => import("./pages/SelfPacedCourses"));
const Waitlist = lazy(() => import("./pages/Waitlist"));
const Mentorship = lazy(() => import("./pages/Mentorship"));
const Events = lazy(() => import("./pages/Events"));
const Blog = lazy(() => import("./pages/Blog"));
const Community = lazy(() => import("./pages/Community"));
const SuccessStories = lazy(() => import("./pages/SuccessStories"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/live" element={<LiveCourses />} />
            <Route path="/courses/self-paced" element={<SelfPacedCourses />} />
            <Route path="/waitlist" element={<Waitlist />} />
            <Route path="/mentorship" element={<Mentorship />} />
            <Route path="/events" element={<Events />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/community" element={<Community />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
