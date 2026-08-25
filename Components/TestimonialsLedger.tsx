"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Quotes sourced from Reddit comment JSON via arctic-shift archive
 * (comment IDs match the five embed permalinks previously in TestimonialsCarousel).
 * Authors corrected from archive — embed markup usernames were wrong.
 */
type LedgerReview = {
  username: string;
  userUrl: string;
  subreddit: string;
  subredditUrl: string;
  commentUrl: string;
  quote: string;
  year: number;
  avatarTone: string;
};

const REVIEWS: LedgerReview[] = [
  {
    username: "sridevira87",
    userUrl: "https://www.reddit.com/user/sridevira87/",
    subreddit: "Coldemailing",
    subredditUrl: "https://www.reddit.com/r/Coldemailing/",
    commentUrl:
      "https://www.reddit.com/r/Coldemailing/comments/1trpu7m/comment/ot33947/",
    quote:
      "Emailverifier io works great for agentic workflows and bulk verifications",
    year: 2026,
    avatarTone: "bg-orange-100 text-orange-800",
  },
  {
    username: "mp4162585",
    userUrl: "https://www.reddit.com/user/mp4162585/",
    subreddit: "Coldemailing",
    subredditUrl: "https://www.reddit.com/r/Coldemailing/",
    commentUrl:
      "https://www.reddit.com/r/Coldemailing/comments/1trpu7m/comment/oou3iks/",
    quote:
      "We've actually been using emailverifier io recently and it's been surprisingly good for the price.",
    year: 2026,
    avatarTone: "bg-sky-100 text-sky-800",
  },
  {
    username: "sridevira87",
    userUrl: "https://www.reddit.com/user/sridevira87/",
    subreddit: "AutomatedMarketing",
    subredditUrl: "https://www.reddit.com/r/AutomatedMarketing/",
    commentUrl:
      "https://www.reddit.com/r/AutomatedMarketing/comments/1per4z8/comment/oqbpxpe/",
    quote:
      "We liked that EmailVerifier io focused heavily on reducing risky sends instead of maximizing approval rates. Compared with Hunter io verification, it felt much more tuned for bulk campaign health. That became important once we scaled operations. Lower bounce rates mattered more than slightly larger lists.",
    year: 2026,
    avatarTone: "bg-rose-100 text-rose-800",
  },
  {
    username: "ajitsan76",
    userUrl: "https://www.reddit.com/user/ajitsan76/",
    subreddit: "Coldemailing",
    subredditUrl: "https://www.reddit.com/r/Coldemailing/",
    commentUrl:
      "https://www.reddit.com/r/Coldemailing/comments/1t56hve/comment/omoc84o/",
    quote: "been using emailverifier io recently too, works well",
    year: 2026,
    avatarTone: "bg-emerald-100 text-emerald-800",
  },
  {
    username: "mp4162585",
    userUrl: "https://www.reddit.com/user/mp4162585/",
    subreddit: "Coldemailing",
    subredditUrl: "https://www.reddit.com/r/Coldemailing/",
    commentUrl:
      "https://www.reddit.com/r/Coldemailing/comments/1t56hve/comment/olxodsk/",
    quote:
      "Been using it for a while mainly to clean cold email lists before campaigns. Pretty straightforward and catches a lot of bad addresses other tools miss. Not magic obv, but bounce rates definitely improved.",
    year: 2026,
    avatarTone: "bg-amber-100 text-amber-900",
  },
];

/** Interleaved split so each row shows a mix of quotes. */
const ROW_TOP = REVIEWS.filter((_, i) => i % 2 === 0);
const ROW_BOTTOM = REVIEWS.filter((_, i) => i % 2 === 1);

const GAP_PX = 16;
const MIN_SEQUENCE_CARDS = 4;

function initials(username: string): string {
  const clean = username.replace(/^u\//i, "");
  const letters = clean.replace(/[^a-zA-Z0-9]/g, "");
  if (letters.length >= 2) return letters.slice(0, 2).toUpperCase();
  return (letters || "?").slice(0, 2).toUpperCase();
}

/** Pad short rows so the sequence is wide enough before the seamless 2× duplicate. */
function padSequence(items: LedgerReview[]): LedgerReview[] {
  if (items.length === 0) return [];
  if (items.length >= MIN_SEQUENCE_CARDS) return items;
  const out: LedgerReview[] = [];
  let i = 0;
  while (out.length < MIN_SEQUENCE_CARDS) {
    out.push(items[i % items.length]);
    i += 1;
  }
  return out;
}

function RedditBadge({ subreddit }: { subreddit: string }) {
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white"
      aria-hidden
      title={`r/${subreddit}`}
    >
      r/
    </span>
  );
}

function TestimonialCard({
  review,
  className,
}: {
  review: LedgerReview;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex min-h-[280px] w-[min(300px,82vw)] shrink-0 flex-col rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] sm:min-h-[300px] sm:w-[300px] sm:p-6 lg:w-[320px]",
        className
      )}
    >
      <header className="flex items-start gap-3">
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
            review.avatarTone
          )}
          aria-hidden
        >
          {initials(review.username)}
        </span>
        <div className="min-w-0 flex-1">
          <a
            href={review.userUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block truncate text-sm font-semibold text-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            u/{review.username}
          </a>
          <p className="mt-0.5 text-xs text-ink-muted">
            commented on{" "}
            <a
              href={review.subredditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              r/{review.subreddit}
            </a>
          </p>
        </div>
        <RedditBadge subreddit={review.subreddit} />
      </header>

      <div className="my-4 h-px w-full bg-line" aria-hidden />

      <blockquote className="flex-1">
        <p className="text-sm leading-relaxed text-ink">
          &ldquo;{review.quote}&rdquo;
        </p>
      </blockquote>

      <footer className="mt-5 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold tracking-widest text-ink-muted uppercase">
          r/{review.subreddit} / {review.year}
        </p>
        <a
          href={review.commentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-xs font-medium text-ink-muted underline-offset-2 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          View on Reddit
        </a>
      </footer>
    </article>
  );
}

function SequenceCards({
  items,
  keyPrefix,
}: {
  items: LedgerReview[];
  keyPrefix: string;
}) {
  return (
    <>
      {items.map((review, i) => (
        <TestimonialCard
          key={`${keyPrefix}-${review.commentUrl}-${i}`}
          review={review}
        />
      ))}
    </>
  );
}

function TestimonialMarquee({
  items,
  direction,
  duration,
}: {
  items: LedgerReview[];
  direction: "left" | "right";
  duration: number;
}) {
  const scope = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const sequence = padSequence(items);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const viewport = scope.current;
        const track = trackRef.current;
        const seq = sequenceRef.current;
        if (!viewport || !track || !seq) return;

        let tween: gsap.core.Tween | null = null;
        const finePointer = window.matchMedia(
          "(hover: hover) and (pointer: fine)"
        );

        const build = () => {
          tween?.kill();
          const gap =
            Number.parseFloat(getComputedStyle(track).columnGap || "") ||
            Number.parseFloat(getComputedStyle(track).gap || "") ||
            GAP_PX;
          const seqWidth = seq.offsetWidth + gap;
          if (seqWidth <= 0) return;

          const startX = direction === "left" ? 0 : -seqWidth;
          const endX = direction === "left" ? -seqWidth : 0;

          gsap.set(track, { x: startX });
          tween = gsap.to(track, {
            x: endX,
            duration,
            ease: "none",
            repeat: -1,
          });
        };

        build();

        const pause = () => tween?.pause();
        const resume = () => tween?.resume();

        const onFocusOut = (e: FocusEvent) => {
          if (!viewport.contains(e.relatedTarget as Node | null)) {
            resume();
          }
        };

        if (finePointer.matches) {
          viewport.addEventListener("pointerenter", pause);
          viewport.addEventListener("pointerleave", resume);
        }
        viewport.addEventListener("focusin", pause);
        viewport.addEventListener("focusout", onFocusOut);
        window.addEventListener("resize", build);

        return () => {
          tween?.kill();
          tween = null;
          viewport.removeEventListener("pointerenter", pause);
          viewport.removeEventListener("pointerleave", resume);
          viewport.removeEventListener("focusin", pause);
          viewport.removeEventListener("focusout", onFocusOut);
          window.removeEventListener("resize", build);
        };
      });

      return () => mm.revert();
    },
    { scope, dependencies: [direction, duration, items] }
  );

  return (
    <div
      ref={scope}
      className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
    >
      <div
        ref={trackRef}
        className="flex w-max will-change-transform"
        style={{ gap: GAP_PX }}
      >
        <div
          ref={sequenceRef}
          className="flex items-stretch"
          style={{ gap: GAP_PX }}
        >
          <SequenceCards items={sequence} keyPrefix="a" />
        </div>
        <div
          className="flex items-stretch"
          style={{ gap: GAP_PX }}
          aria-hidden="true"
          inert
        >
          <SequenceCards items={sequence} keyPrefix="b" />
        </div>
      </div>
    </div>
  );
}

function StaticReviewsGrid() {
  return (
    <ul className="mx-auto grid max-w-6xl list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {REVIEWS.map((review) => (
        <li key={review.commentUrl} className="min-w-0">
          <TestimonialCard review={review} className="h-full w-full sm:w-full lg:w-full" />
        </li>
      ))}
    </ul>
  );
}

export default function TestimonialsLedger() {
  return (
    <div
      role="region"
      aria-label="Reddit customer reviews"
      className="relative"
    >
      {/* Continuous marquee — full-bleed within section padding; hidden when reduced motion */}
      <div className="-mx-4 flex flex-col gap-4 sm:-mx-6 lg:-mx-14 motion-reduce:hidden">
        <TestimonialMarquee
          items={ROW_TOP}
          direction="left"
          duration={45}
        />
        <TestimonialMarquee
          items={ROW_BOTTOM}
          direction="right"
          duration={52}
        />
      </div>

      {/* Static readable fallback — only shown with prefers-reduced-motion */}
      <div className="hidden motion-reduce:block">
        <StaticReviewsGrid />
      </div>
    </div>
  );
}
