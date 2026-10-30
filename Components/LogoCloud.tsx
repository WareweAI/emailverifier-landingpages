import Image from "next/image";

/** Approved LogoCloud marks allowlist (AGENTS.md). Transparent WebPs. */
const LOGOS = [
  {
    src: "/logos/google.webp",
    alt: "Google",
    width: 140,
    height: 40,
  },
  {
    src: "/logos/microsoft.webp",
    alt: "Microsoft",
    width: 160,
    height: 40,
  },
  {
    src: "/logos/slack.webp",
    alt: "Slack",
    width: 120,
    height: 40,
  },
  {
    src: "/logos/deepmind.webp",
    alt: "DeepMind",
    width: 160,
    height: 40,
  },
] as const;

/** Repeat so one marquee half is wide enough on large screens. */
const TRACK_LOGOS = [...LOGOS, ...LOGOS, ...LOGOS];

function LogoTrack({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center gap-10 px-5 sm:gap-14 sm:px-7"
      aria-hidden={ariaHidden || undefined}
      aria-label={ariaHidden ? undefined : "Brand marks"}
    >
      {TRACK_LOGOS.map((logo, index) => (
        <li
          key={`${ariaHidden ? "b" : "a"}-${logo.src}-${index}`}
          className="shrink-0"
        >
          <Image
            src={logo.src}
            alt={ariaHidden ? "" : logo.alt}
            width={logo.width}
            height={logo.height}
            unoptimized
            className="h-9 w-auto max-w-[9rem] object-contain sm:h-10"
            loading="lazy"
          />
        </li>
      ))}
    </ul>
  );
}

export default function LogoCloud() {
  return (
    <section
      className="overflow-hidden bg-background py-12 md:py-16"
      aria-labelledby="logo-cloud-heading"
    >
      <div className="site-container text-center">
        <h2
          id="logo-cloud-heading"
          className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl"
        >
          Trusted by teams at
        </h2>
      </div>

      <div
        className="group relative mt-10 mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        role="presentation"
      >
        <div className="flex w-max animate-logo-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          <LogoTrack />
          <LogoTrack ariaHidden />
        </div>
      </div>
    </section>
  );
}
