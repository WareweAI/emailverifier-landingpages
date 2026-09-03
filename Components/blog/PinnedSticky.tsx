"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

/** Gap from viewport top while pinned/sticky (matches CTA rail). */
export const BLOG_STICKY_TOP = "24px";

type PinnedStickyProps = {
  children: ReactNode;
  className?: string;
  stickyClassName?: string;
  /** Tailwind `lg` = 1024, `xl` = 1280 */
  minWidthPx?: number;
  as?: ElementType;
};

/**
 * CSS sticky fails under ScrollSmoother. Pin with ScrollTrigger when
 * smooth scroll is on; fall back to CSS sticky for reduced motion.
 */
export function PinnedSticky({
  children,
  className,
  stickyClassName = "sticky top-6 w-full",
  minWidthPx = 1024,
  as: Tag = "div",
}: PinnedStickyProps) {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const pinEl = pinRef.current;
      if (!root || !pinEl) return;

      const mm = gsap.matchMedia();

      mm.add(
        `(min-width: ${minWidthPx}px) and (prefers-reduced-motion: no-preference)`,
        () => {
          const grid = root.closest("[data-blog-article-grid]");
          const article = grid?.querySelector<HTMLElement>(
            "[data-blog-article-main]",
          );
          if (!article) return;

          const st = ScrollTrigger.create({
            trigger: pinEl,
            start: `top ${BLOG_STICKY_TOP}`,
            endTrigger: article,
            end: "bottom bottom",
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          });

          const refresh = () => ScrollTrigger.refresh();
          requestAnimationFrame(refresh);
          const t1 = window.setTimeout(refresh, 100);
          const t2 = window.setTimeout(refresh, 500);
          void document.fonts?.ready.then(refresh);

          return () => {
            window.clearTimeout(t1);
            window.clearTimeout(t2);
            st.kill();
          };
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [minWidthPx] },
  );

  return (
    <Tag ref={rootRef} className={className}>
      <div ref={pinRef} className={stickyClassName}>
        {children}
      </div>
    </Tag>
  );
}
