"use client";

import { type ReactNode } from "react";
import { PinnedSticky } from "./PinnedSticky";

type StickyRailProps = {
  children: ReactNode;
  className?: string;
};

/** Right-rail product CTA — pinned while the article scrolls. */
export function StickyRail({ children, className }: StickyRailProps) {
  return (
    <PinnedSticky
      as="aside"
      className={className}
      minWidthPx={1280}
      stickyClassName="sticky top-6 w-full rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)]"
    >
      {children}
    </PinnedSticky>
  );
}
