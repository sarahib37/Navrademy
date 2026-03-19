import { Instagram, Twitter } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

export const socials = [
  { label: "TikTok", href: "https://www.tiktok.com/@navrademy", icon: FaTiktok },
  { label: "Instagram", href: "https://www.instagram.com/navrademy", icon: Instagram },
  { label: "Twitter", href: "https://x.com/navrademy", icon: Twitter },
];

interface SocialLinksProps {
  variant?: "light" | "dark" | "pill";
  size?: number;
}

const SocialLinks = ({ variant = "dark", size = 18 }: SocialLinksProps) => {
  const baseClass = "transition-colors duration-200";
  const variantClass =
    variant === "light"
      ? "text-white/30 hover:text-primary"
      : variant === "pill"
        ? "inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30"
        : "text-foreground/40 hover:text-primary";

  return (
    <div className="flex items-center gap-4">
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className={`${baseClass} ${variantClass}`}
        >
          <s.icon className={`h-[${size}px] w-[${size}px]`} style={{ width: size, height: size }} />
          {variant === "pill" && <span className="text-sm">{s.label}</span>}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
