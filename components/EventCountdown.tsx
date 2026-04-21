"use client"

import { useEffect, useState } from "react";

interface Props {
  target?: string; // ISO datetime
  tbc?: boolean;
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function EventCountdown({ target, tbc }: Props) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (tbc || !target) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [target, tbc]);

  if (tbc || !target) {
    return (
      <div className="inline-flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-5 py-3 backdrop-blur-sm">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
        </span>
        <span className="text-sm font-medium text-white/85">Date dropping soon — be the first to know.</span>
      </div>
    );
  }

  const diff = Math.max(0, new Date(target).getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const mins = Math.floor((diff / 60000) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  const blocks = [
    { v: days, l: "Days" },
    { v: hours, l: "Hours" },
    { v: mins, l: "Min" },
    { v: secs, l: "Sec" },
  ];

  return (
    <div className="flex gap-2 sm:gap-3">
      {blocks.map((b) => (
        <div
          key={b.l}
          className="min-w-[64px] sm:min-w-[80px] rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 text-center backdrop-blur-md"
        >
          <div className="text-2xl sm:text-3xl font-heading font-bold tabular-nums bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            {pad(b.v)}
          </div>
          <div className="mt-0.5 text-[10px] uppercase tracking-widest text-white/45">{b.l}</div>
        </div>
      ))}
    </div>
  );
}
