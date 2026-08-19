"use client";

import { useRef, type ReactNode } from "react";
import { CloudBackground } from "@/Components/ui/CloudBackground";
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
      <div
        className="pointer-events-none absolute inset-x-0 -top-24 bottom-0 z-0 bg-linear-to-b from-primary-soft via-primary-soft via-55% to-surface"
        aria-hidden
      />
      <CloudBackground />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28 bg-linear-to-b from-transparent to-surface md:h-36 lg:h-44"
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
