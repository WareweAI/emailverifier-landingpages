"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger child elements matching this selector. */
  staggerSelector?: string;
  y?: number;
  delay?: number;
};

/** Scroll-triggered fade/slide. Skips motion when prefers-reduced-motion. */
export function Reveal({
  children,
  className,
  staggerSelector,
  y = 24,
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = staggerSelector
          ? root.querySelectorAll(staggerSelector)
          : [root];

        gsap.fromTo(
          targets,
          { autoAlpha: 0, y },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            delay,
            stagger: staggerSelector ? 0.08 : 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: root,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [staggerSelector, y, delay] }
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
