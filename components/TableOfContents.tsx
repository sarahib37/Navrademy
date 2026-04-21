"use client"

import { useEffect, useState } from "react";
import { List } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export const TableOfContents = ({ items }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="elevated-card p-5">
      <div className="flex items-center gap-2 mb-3 text-foreground">
        <List className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-heading font-semibold">Table of Contents</h3>
      </div>
      <ul className="space-y-1.5 text-sm">
        {items.map((item) => (
          <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 12}px` }}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.id);
                if (el) {
                  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
                  history.replaceState(null, "", `#${item.id}`);
                }
              }}
              className={`block py-1 border-l-2 pl-3 transition-all hover:text-primary ${
                activeId === item.id
                  ? "border-primary text-primary font-medium"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
