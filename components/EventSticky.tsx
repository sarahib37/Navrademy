import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  title: string;
  meta: string;
  onRegister: () => void;
}

export default function StickyRegisterBar({ title, meta, onRegister }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-2xl"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0D1B2A]/90 px-4 py-3 shadow-2xl backdrop-blur-xl">
            <div className="hidden sm:block flex-1 min-w-0">
              <p className="text-sm font-heading font-semibold text-white truncate">{title}</p>
              <p className="text-xs text-white/50 truncate">{meta}</p>
            </div>
            <Button
              variant="hero"
              size="default"
              onClick={onRegister}
              className="rounded-full shrink-0 ml-auto sm:ml-0"
            >
              Reserve Spot
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
