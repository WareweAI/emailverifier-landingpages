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
        <ul className="mx-auto flex max-w-5xl flex-col items-center gap-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6 sm:gap-y-8 lg:flex-nowrap">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <li
                key={stat.id}
                className="flex max-w-xs items-start gap-3 text-left"
              >
                <span
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                    "border border-line bg-surface-muted"
                  )}
                >
                  <Icon className="h-5 w-5 text-primary" aria-hidden />
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="font-display text-2xl font-bold tracking-tight text-ink lg:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm leading-snug text-ink-muted">
                    {stat.label}
                  </p>
                </div>
              </li>
            );
          })}

          <li className="flex max-w-xs flex-col text-left">
            <div
              className="flex items-center gap-2"
              aria-label="4.8 out of 5 rating"
            >
              <p className="font-display text-2xl font-bold tracking-tight text-ink lg:text-3xl">
                4.8
              </p>
              {/* 1-off: review gold for yellow rating stars */}
              <StarRating rating={4.8} size={18} activeColor="#e4b200" />
            </div>
            <ul
              className="mt-2 flex flex-wrap items-center gap-3"
              aria-label="Rated on Trustpilot, Capterra, G2, and Reddit"
            >
              {REVIEW_PLATFORMS.map((platform) => (
                <li key={platform.id} className="shrink-0">
                  <Image
                    src={platform.src}
                    alt={platform.alt}
                    width={20}
                    height={20}
                    unoptimized={platform.src.endsWith(".svg")}
                    className="h-5 w-5 object-contain"
                  />
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );
}
