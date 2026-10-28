import Image from "next/image";
import { cn } from "@/lib/utils";

export const PRESS_LOGOS = [
  {
    src: "/logos/press/business-insider.png",
    alt: "Business Insider",
    width: 140,
    height: 28,
  },
  {
    src: "/logos/press/yahoo-finance.svg",
    alt: "Yahoo Finance",
    width: 150,
    height: 28,
  },
  {
    src: "/logos/press/financial-post-wordmark.png",
    alt: "Financial Post",
    width: 372,
    height: 61,
    // Tight crop reads larger than the other marks at the shared height.
    heroClassName: "max-w-[5.75rem] sm:max-w-[6.625rem]",
    barClassName: "max-w-[6.625rem] sm:max-w-[7.5rem] md:max-w-[7.875rem]",
  },
  {
    src: "/logos/press/national-post.svg",
    alt: "National Post",
    width: 140,
    height: 28,
  },
] as const;

/** Compact press row for the hero column under the primary CTA. */
export function HeroAsSeenOn({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)} aria-labelledby="hero-as-seen-on">
      <p
        id="hero-as-seen-on"
        className="text-xs font-medium uppercase tracking-[0.2em] text-ink-muted"
      >
        As seen on
      </p>
      <ul
        className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 lg:justify-start"
        aria-label="Press logos"
      >
        {PRESS_LOGOS.map((logo) => (
          <li key={logo.src} className="shrink-0">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              unoptimized={logo.src.endsWith(".svg")}
              sizes={`${logo.width}px`}
              className={cn(
                "h-5 w-auto max-w-[6.5rem] object-contain opacity-70 brightness-0 sm:h-6 sm:max-w-[7.5rem]",
                "heroClassName" in logo ? logo.heroClassName : undefined
              )}
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProofBar() {
  return (
    <section
      className="bg-surface py-0"
      aria-labelledby="proof-bar-heading"
    >
      <p
        id="proof-bar-heading"
        className="mb-8 py-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-ink-muted md:text-sm"
      >
        As seen on
      </p>

      <div className="mx-auto max-w-6xl overflow-x-auto px-4 py-3 sm:px-6 lg:px-20">
        <ul
          className="flex flex-nowrap items-center justify-center gap-x-6 sm:gap-x-8 md:gap-x-10 lg:gap-x-12"
          aria-label="Press logos"
        >
          {PRESS_LOGOS.map((logo) => (
            <li key={logo.src} className="shrink-0">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                unoptimized={logo.src.endsWith(".svg")}
                sizes={`${logo.width}px`}
                className={cn(
                  "h-5 w-auto max-w-[7.5rem] object-contain opacity-100 brightness-0 sm:h-6 sm:max-w-[8.5rem] md:h-7 md:max-w-[9rem]",
                  "barClassName" in logo ? logo.barClassName : undefined
                )}
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
