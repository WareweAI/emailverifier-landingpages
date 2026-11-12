"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "@/Components/find/verification-footer.module.css";

const PHASES = [
  { id: "syntax", label: "Syntax", checked: true },
  { id: "mx", label: "MX Found", checked: true },
  { id: "smtp", label: "SMTP Mailbox Live", checked: true },
  { id: "score", label: "99% Confidence · Safe to Send", checked: false },
] as const;

const TICK_MS = 1100;

export function VerificationFooter() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [phase, setPhase] = useState(PHASES.length - 1);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let current = 0;
    let timer = 0;

    const stop = () => window.clearInterval(timer);

    const start = () => {
      stop();
      current = 0;
      setPhase(0);
      timer = window.setInterval(() => {
        current = current >= PHASES.length - 1 ? 0 : current + 1;
        setPhase(current);
      }, TICK_MS);
    };

    const node = ref.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) start();
        else stop();
      },
      { threshold: 0.5 }
    );
    io.observe(node);

    return () => {
      stop();
      io.disconnect();
    };
  }, []);

  const current = PHASES[phase] ?? PHASES[PHASES.length - 1];

  return (
    <p
      ref={ref}
      className="flex h-12 items-center border-t border-line px-4 text-sm"
    >
      <span className="sr-only">
        Syntax, MX Found, SMTP Mailbox Live, 99% Confidence, Safe to Send
      </span>
      <span
        key={current.id}
        aria-hidden
        className={cn(
          styles.phase,
          "inline-flex items-center gap-1.5 font-semibold",
          current.checked ? "text-ink" : "text-success"
        )}
      >
        {current.label}
        {current.checked ? (
          <Check className="h-3.5 w-3.5 text-success" />
        ) : null}
      </span>
    </p>
  );
}
