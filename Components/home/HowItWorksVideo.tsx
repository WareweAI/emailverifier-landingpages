"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Play, X } from "lucide-react";

/** Hero “How it works” lightbox — EmailVerifier.io channel */
export const HERO_HOW_IT_WORKS_YOUTUBE_ID = "T5MNsvlYG0U";

export default function HowItWorksVideo() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-ev-event="hero_how_it_works_click"
        data-ev-loc="hero"
        className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-base font-semibold text-ink transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-primary bg-primary-soft text-primary"
          aria-hidden
        >
          <Play className="h-4 w-4 fill-current" />
        </span>
        How it works
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="fixed inset-0 z-50 m-auto w-[min(100%-2rem,56rem)] max-w-4xl rounded-2xl border border-line bg-surface p-0 shadow-[var(--shadow-card)] open:flex open:flex-col backdrop:bg-ink/60"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setOpen(false);
        }}
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-5">
          <h2 id={titleId} className="font-display text-base font-semibold text-ink">
            How it works
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-full text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Close video"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="aspect-video w-full bg-ink">
          {open ? (
            <iframe
              title="How EmailVerifier.io works"
              src={`https://www.youtube-nocookie.com/embed/${HERO_HOW_IT_WORKS_YOUTUBE_ID}?autoplay=1&rel=0`}
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : null}
        </div>
      </dialog>
    </>
  );
}
