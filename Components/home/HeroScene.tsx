"use client";

import { useRef, type ReactNode } from "react";
import { HeroBackground } from "@/Components/ui/HeroBackground";
import { gsap, useGSAP } from "@/lib/gsap";

type HeroSceneProps = {
  children: ReactNode;
};

export default function HeroScene({ children }: HeroSceneProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-hero-el]", root);
        gsap.from(items, {
          autoAlpha: 0,
          y: 16,
          duration: 0.45,
          stagger: 0.08,
          ease: "power2.out",
        });
      });

      return () => mm.revert();
    },
    { scope }
  );

  return (
    <div ref={scope} className="relative">
      <HeroBackground />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
