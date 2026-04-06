"use client"

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "/about" },
  {
    label: "Courses",
    href: "/courses",
    children: [
      { label: "Live Courses", href: "/courses/live" },
      { label: "Self-Paced Courses", href: "/courses/self-paced" },
      { label: "Upcoming Courses (Waitlist)", href: "/waitlist" },
    ],
  },
  { label: "Mentorship", href: "/mentorship" },
  { label: "Events", href: "/events" },
  { label: "Blog", href: "/blog" },
  { label: "Community", href: "/community" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Affiliate", href: "/affiliate" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="h-[3px] gradient-bg-rich" />

      <div className="bg-white/[0.97] backdrop-blur-xl border-b border-border/40 shadow-[0_1px_8px_-2px_hsl(210,55%,12%,0.06)]">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="h-10 flex items-center">            
              <img
                src="/logo.png"
                alt="Navrademy logo"
                className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => setCoursesOpen(true)}
                  onMouseLeave={() => setCoursesOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={`nav-link-premium flex items-center gap-1 ${
                      isActive("/courses") || pathname === "/waitlist"
                        ? "text-primary active"
                        : "text-foreground/65 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      className={`h-3 w-3 transition-transform duration-200 ${
                        coursesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Link>

                  <AnimatePresence>
                    {coursesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-1 w-60 rounded-xl border border-border/50 bg-white p-1.5 shadow-xl shadow-foreground/5"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className={`block rounded-lg px-3.5 py-2.5 text-sm transition-all duration-200 ${
                              pathname === child.href
                                ? "text-primary bg-primary/8 font-medium"
                                : "text-foreground/65 hover:text-foreground hover:bg-secondary/80"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`nav-link-premium ${
                    isActive(link.href)
                      ? "text-primary active"
                      : "text-foreground/65 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Button variant="hero" size="default" className="rounded-full px-6 text-[13px]">
              <Link href="/courses">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-b border-border/30 bg-white shadow-lg"
          >
            <div className="container mx-auto px-4 py-5 space-y-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive(link.href)
                        ? "text-primary bg-primary/8"
                        : "text-foreground/65 hover:text-foreground hover:bg-secondary/60"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>

                  {link.children && (
                    <div className="pl-4 mt-1 space-y-0.5 border-l-2 border-primary/20 ml-4">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-foreground/55 hover:text-foreground transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4 px-2">
                <Button variant="hero" size="lg" className="w-full rounded-full">
                  <Link href="/courses" onClick={() => setMobileOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;