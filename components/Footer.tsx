"use client"

import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";

const footerLinks = {
  Courses: [
    { label: "Live Courses", href: "/courses/live" },
    { label: "Self-Paced", href: "/courses/self-paced" },
    { label: "Upcoming Courses", href: "/waitlist" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Success Stories", href: "/success-stories" },
    { label: "Blog", href: "/blog" },
    { label: "Events", href: "/events" },
  ],
  Support: [
    { label: "Contact", href: "/contact" },
    { label: "Community", href: "/community" },
    { label: "Mentorship", href: "/mentorship" },
    { label: "Be an Affiliate", href: "/affiliate" },
    { label: "Admin", href: "/admin" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Refund Policy", href: "/refund-policy" },
  ],
};

const Footer = () => {
  return (
    <footer className="dark-section-deep relative overflow-hidden">
      {/* Top gradient border */}
      <div className="h-[3px] gradient-bg-rich" />

      {/* Pattern overlay */}
      <div className="absolute inset-0 pattern-overlay pointer-events-none opacity-40" />

      <div className="container relative mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="h-10 flex items-center">            
                <img
                  src="/logo.png"
                  alt="Navrademy logo"
                  className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
            <p className="mt-3 text-sm text-white/40 leading-relaxed max-w-[200px]">
              Practical digital skills for the future of work.
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-heading font-bold text-xs uppercase tracking-[0.15em] mb-5 text-white/80">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/35 hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Navrademy. All rights reserved.
          </p>
          <SocialLinks variant="light" size={16} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;