"use client";

import { useId, useState } from "react";
import type { TocItem } from "@/lib/wordpress/types";
import { PinnedSticky } from "./PinnedSticky";

type ArticleTocProps = {
  items: TocItem[];
  /** Desktop sidebar pin (left rail). Mobile accordion ignores this. */
  variant?: "mobile" | "desktop";
};

export function ArticleToc({ items, variant = "desktop" }: ArticleTocProps) {
  const panelId = useId();
  const [open, setOpen] = useState(false);

  if (items.length === 0) return null;

  const list = (
    <ol className="space-y-2 text-sm">
      {items.map((item) => (
        <li
          key={item.id}
          className={item.level === 3 ? "ml-3 border-l border-line pl-3" : ""}
        >
          <a
            href={`#${item.id}`}
            className="text-ink-muted transition hover:text-primary"
            onClick={() => setOpen(false)}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );

  if (variant === "mobile") {
    return (
      <div className="mb-8 rounded-2xl border border-line bg-surface">
        <button
          type="button"
          className="flex min-h-11 w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-ink"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          Table of contents
          <span aria-hidden className="text-ink-muted">
            {open ? "−" : "+"}
          </span>
        </button>
        {open ? (
          <div id={panelId} className="border-t border-line px-4 py-4">
            {list}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <PinnedSticky
      minWidthPx={1024}
      stickyClassName="sticky top-6 w-full max-h-[calc(100vh-3rem)] overflow-y-auto"
    >
      <nav aria-label="Table of contents">
        <p className="text-sm font-semibold text-ink">On this page</p>
        <div className="mt-4">{list}</div>
      </nav>
    </PinnedSticky>
  );
}
