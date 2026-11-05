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

function initials(username: string): string {
  const clean = username.replace(/^u\//i, "");
  const letters = clean.replace(/[^a-zA-Z0-9]/g, "");
  if (letters.length >= 2) return letters.slice(0, 2).toUpperCase();
  return (letters || "?").slice(0, 2).toUpperCase();
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
        "flex h-full min-h-[280px] w-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] sm:p-7",
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
        <div className="min-w-0 flex-1 pt-0.5">
          <a
            href={review.userUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block truncate text-sm font-bold text-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            u/{review.username}
          </a>
          <p className="mt-0.5 text-xs leading-snug text-ink-muted">
            commented on{" "}
            <a
              href={review.subredditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink-muted hover:text-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              r/{review.subreddit}
            </a>
          </p>
        </div>
        <RedditBadge subreddit={review.subreddit} />
      </header>

      <blockquote className="mt-5 flex-1">
        <p className="text-sm leading-relaxed text-ink">
          &ldquo;{review.quote}&rdquo;
        </p>
      </blockquote>

      <footer className="mt-6 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold tracking-widest text-ink-muted uppercase">
          r/{review.subreddit} / {review.year}
        </p>
        <a
          href={review.commentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 shrink-0 cursor-pointer text-xs font-medium text-ink underline underline-offset-2 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          View on Reddit
        </a>
      </footer>
    </article>
  );
}

export default function TestimonialsLedger() {
  return (
    <ul
      aria-label="Reddit customer reviews"
      className="mx-auto flex list-none flex-wrap justify-center gap-4 p-0"
    >
      {REVIEWS.map((review) => (
        <li
          key={review.commentUrl}
          className="w-full min-w-0 sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.7rem)]"
        >
          <TestimonialCard review={review} />
        </li>
      ))}
    </ul>
  );
}
