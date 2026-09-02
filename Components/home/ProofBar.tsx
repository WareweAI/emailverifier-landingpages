import Image from "next/image";
import { cn } from "@/lib/utils";

const PRESS_LOGOS = [
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
    src: "/logos/press/financial-post.png",
    alt: "Financial Post",
    width: 180,
    height: 36,
    className: "h-8 max-w-[11rem] sm:h-9",
  },
  {
    src: "/logos/press/national-post.svg",
    alt: "National Post",
    width: 140,
    height: 28,
  },
  {
    src: "/logos/press/ottawa-citizen.png",
    alt: "Ottawa Citizen",
    width: 150,
    height: 28,
  },
  {
    src: "/logos/press/vancouver-sun.png",
    alt: "Vancouver Sun",
    width: 140,
    height: 28,
  },
] as const;

type PressLogo = (typeof PRESS_LOGOS)[number];

function LogoRow({
  logos,
  ariaHidden,
}: {
  logos: readonly PressLogo[];
  ariaHidden?: boolean;
}) {
  return (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={ariaHidden}
      aria-label={ariaHidden ? undefined : "Press logos"}
    >
      {logos.map((logo, i) => (
        <li key={`${logo.src}-${i}`} className="shrink-0 px-8 md:px-12">
          <Image
            src={logo.src}
            alt={ariaHidden ? "" : logo.alt}
            width={logo.width}
            height={logo.height}
            unoptimized={logo.src.endsWith(".svg")}
            sizes={`${logo.width}px`}
            className={cn(
              "h-6 w-auto max-w-[9rem] object-contain opacity-70 grayscale sm:h-7",
              "className" in logo ? logo.className : undefined
            )}
            loading="lazy"
          />
        </li>
      ))}
    </ul>
  );
}

export default function ProofBar() {
  const track = [...PRESS_LOGOS, ...PRESS_LOGOS];

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

      <div className="group relative mx-auto max-w-3xl overflow-hidden py-3 mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max motion-safe:animate-logo-marquee group-hover:motion-safe:[animation-play-state:paused] motion-reduce:w-full motion-reduce:justify-center motion-reduce:flex-wrap">
          <LogoRow logos={track} />
          <div className="motion-reduce:hidden">
            <LogoRow logos={track} ariaHidden />
          </div>
        </div>
      </div>
    </section>
  );
}
