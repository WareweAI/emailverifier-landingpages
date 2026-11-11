import { StarRating } from "@/Components/ui/StarRating";
import { cn } from "@/lib/utils";
import { MailCheck, Shield, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

const STATS = [
  {
    id: "emails-verified",
    value: "1B+",
    label: "Email verified",
    icon: MailCheck,
  },
  {
    id: "deliverability",
    value: "99.7%",
    label: "Deliverability Guarantee",
    icon: ShieldCheck,
  },
  {
    id: "compliance",
    value: "GDPR & CCPA",
    label: "Compliant",
    icon: Shield,
  },
] as const satisfies ReadonlyArray<{
  id: string;
  value: string;
  label: string;
  icon: LucideIcon;
}>;

const REVIEW_PLATFORMS = [
  {
    id: "trustpilot",
    src: "/assets/trustpilot-icon.svg",
    alt: "Trustpilot",
  },
  {
    id: "capterra",
    src: "/assets/capterra.svg",
    alt: "Capterra",
  },
  {
    id: "g2",
    src: "/assets/g2.png",
    alt: "G2",
  },
  {
    id: "reddit",
    src: "/assets/reddit.svg",
    alt: "Reddit",
  },
] as const;

type TrustStatsRowProps = {
  className?: string;
  /** Smaller type/icons to sit under a max-w-3xl hero mockup. */
  compact?: boolean;
};

/** Shared 1B+ / 99.7% / GDPR / 4.8 ratings row used on home and product heroes. */
export function TrustStatsRow({ className, compact = false }: TrustStatsRowProps) {
  return (
    <ul
      className={cn(
        "mx-auto flex flex-col items-center sm:flex-row sm:flex-wrap sm:items-center sm:justify-between lg:flex-nowrap",
        compact
          ? "max-w-3xl gap-5 sm:gap-x-3 sm:gap-y-5"
          : "max-w-5xl gap-8 sm:gap-x-6 sm:gap-y-8",
        className,
      )}
    >
      {STATS.map((stat) => {
        const Icon = stat.icon;
        return (
          <li
            key={stat.id}
            className={cn(
              "flex items-start text-left",
              compact ? "min-w-0 flex-1 gap-2.5" : "max-w-xs gap-3",
            )}
          >
            <span
              className={cn(
                "flex shrink-0 items-center justify-center rounded-xl border border-line bg-surface-muted",
                compact ? "h-9 w-9" : "h-11 w-11",
              )}
            >
              <Icon
                className={cn(
                  "text-primary",
                  compact ? "h-4 w-4" : "h-5 w-5",
                )}
                aria-hidden
              />
            </span>
            <div className="min-w-0 pt-0.5">
              <p
                className={cn(
                  "font-display font-bold tracking-tight text-ink",
                  compact
                    ? "text-xl"
                    : "text-2xl lg:text-3xl",
                )}
              >
                {stat.value}
              </p>
              <p
                className={cn(
                  "leading-snug text-ink-muted",
                  compact ? "mt-0.5 text-xs" : "mt-1 text-sm",
                )}
              >
                {stat.label}
              </p>
            </div>
          </li>
        );
      })}

      <li
        className={cn(
          "flex flex-col text-left",
          compact ? "min-w-0 shrink-0" : "max-w-xs",
        )}
      >
        <div
          className="flex items-center gap-2"
          aria-label="4.8 out of 5 rating"
        >
          <p
            className={cn(
              "font-display font-bold tracking-tight text-ink",
              compact ? "text-xl" : "text-2xl lg:text-3xl",
            )}
          >
            4.8
          </p>
          {/* 1-off: review gold for yellow rating stars */}
          <StarRating
            rating={4.8}
            size={compact ? 14 : 18}
            activeColor="#e4b200"
          />
        </div>
        <ul
          className={cn(
            "flex flex-wrap items-center",
            compact ? "mt-1.5 gap-2" : "mt-2 gap-3",
          )}
          aria-label="Rated on Trustpilot, Capterra, G2, and Reddit"
        >
          {REVIEW_PLATFORMS.map((platform) => (
            <li key={platform.id} className="shrink-0">
              <Image
                src={platform.src}
                alt={platform.alt}
                width={compact ? 16 : 20}
                height={compact ? 16 : 20}
                unoptimized={platform.src.endsWith(".svg")}
                className={cn(
                  "object-contain",
                  compact ? "h-4 w-4" : "h-5 w-5",
                )}
              />
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
}

export default function HomeStatsStrip() {
  return (
    <section
      className="relative bg-surface"
      aria-label="Email verification stats"
    >
      <div
        className="h-px bg-linear-to-r from-transparent via-line to-transparent"
        aria-hidden
      />

      <div className="site-container py-8 md:py-10">
        <TrustStatsRow />
      </div>
    </section>
  );
}
