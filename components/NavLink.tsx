import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  className?: string;
  activeClassName?: string;
  // pendingClassName is not applicable without router
  children: React.ReactNode;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, className, activeClassName, children, ...props }, ref) => {
    // Simple way to mark active: compare current location
    const isActive = typeof window !== "undefined" && window.location.pathname === href;

    return (
      <a
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName)}
        {...props}
      >
        {children}
      </a>
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };