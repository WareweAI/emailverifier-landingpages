import { StarRating } from "@/Components/ui/StarRating";
import { cn } from "@/lib/utils";
import { MailCheck, Shield, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

/** Short phrases taken from the homepage testimonial quotes. */
const REVIEW_HIGHLIGHTS = [
  {
    id: "bounce",
    label: "Lower bounce rates",
    bar: "bg-primary",
  },
  {
    id: "risky",
    label: "Fewer risky sends",
    bar: "bg-success",
  },
  {
    id: "price",
    label: "Good for the price",
    bar: "bg-cta",
  },
  {
    id: "bulk",
    label: "Bulk verification",
    bar: "bg-primary-deep",
  },
] as const;

const STATS = [
  {
    id: "emails-checked",
    value: "1+ billion",
    label: "Emails Checked",
    icon: MailCheck,
  },
  {
    id: "deliverability",
    value: "99.9%",
    label: "Deliverability Guarantee",
    icon: ShieldCheck,
  },
  {
    id: "gdpr",
    value: "GDPR",
    label: "Compliant",
    icon: Shield,
  },
] as const satisfies ReadonlyArray<{
  id: string;
  value: string;
  label: string;
  icon: LucideIcon;
}>;

export default function HomeStatsStrip() {
  return (
    <section
      className="relative bg-surface"
      aria-label="Email verification stats"
    >
      <div className="site-container flex flex-col items-center justify-center gap-6 pt-8 pb-6 md:flex-row md:gap-10 md:pt-10">
        <div
          className="flex items-center gap-3"
          aria-label="Capterra 4.8 rating"
        >
          <Image
            src="/assets/capterra.svg"
            alt="Capterra logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <div>
            <p className="text-sm font-semibold text-ink">Capterra</p>
            <div className="mt-0.5 flex items-center gap-2">
              <span className="font-display text-3xl font-bold leading-none tracking-tight text-ink">
                4.8
              </span>
              {/* 1-off: darker gold than --color-cta for these review stars */}
              <StarRating
                rating={4.8}
                size={18}
                activeColor="#e4b200"
              />
            </div>
          </div>
        </div>

        <ul
          className="flex flex-wrap items-end justify-center gap-3"
          aria-label="Highlights from customer comments"
        >
          {REVIEW_HIGHLIGHTS.map((item) => (
            <li key={item.id} className="w-[5.25rem] sm:w-24">
              {/* 1-off: shield silhouette for the review highlight */}
              <div className="flex h-[4.75rem] flex-col overflow-hidden border border-line bg-surface shadow-[var(--shadow-card)] [clip-path:polygon(0_0,100%_0,100%_76%,50%_100%,0_76%)]">
                <p className="flex flex-1 items-center justify-center px-1.5 pt-1.5 text-center text-[10px] font-semibold leading-tight text-ink sm:text-xs">
                  {item.label}
                </p>
                <span className={cn("h-5 shrink-0", item.bar)} aria-hidden />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="h-px bg-linear-to-r from-transparent via-line to-transparent"
        aria-hidden
      />

      <div className="site-container py-10 md:py-12">
      <ul className="mx-auto grid max-w-5xl justify-items-center gap-8 sm:grid-cols-3">
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
      </ul>
      </div>
    </section>
  );
}
