"use client"

import { useState, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  min?: number;
  max?: number;
}

export const TagInput = ({ tags, onChange, min = 3, max = 8 }: TagInputProps) => {
  const [input, setInput] = useState("");

  const addTag = () => {
    const v = input.trim().toLowerCase();
    if (!v) return;
    if (tags.length >= max) return;
    if (tags.map((t) => t.toLowerCase()).includes(v)) {
      setInput("");
      return;
    }
    onChange([...tags, v]);
    setInput("");
  };

  const removeTag = (t: string) => onChange(tags.filter((x) => x !== t));

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && !input && tags.length) {
      removeTag(tags[tags.length - 1]);
    }
  };

  const tooFew = tags.length < min;
  const tooMany = tags.length >= max;

  return (
    <div className="space-y-2">
      <Label>
        Tags <span className="text-xs text-muted-foreground font-normal">({min}–{max} required, helps SEO & related posts)</span>
      </Label>
      <div className={`min-h-10 flex flex-wrap items-center gap-1.5 p-2 rounded-md border bg-background ${tooFew ? "border-destructive/40" : "border-input"}`}>
        {tags.map((t) => (
          <span key={t} className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
            #{t}
            <button type="button" onClick={() => removeTag(t)} className="hover:text-destructive" aria-label={`Remove ${t}`}>
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          onBlur={addTag}
          placeholder={tooMany ? "Tag limit reached" : "Type and press Enter…"}
          disabled={tooMany}
          className="flex-1 min-w-[140px] border-0 shadow-none h-7 px-1 focus-visible:ring-0"
        />
      </div>
      <p className={`text-xs ${tooFew ? "text-destructive" : "text-muted-foreground"}`}>
        {tags.length}/{max} tags · {tooFew ? `add at least ${min - tags.length} more` : "looks good"}
      </p>
    </div>
  );
};
