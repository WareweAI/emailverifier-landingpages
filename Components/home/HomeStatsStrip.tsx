import { cn } from "@/lib/utils";
import { MailCheck, ShieldCheck, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const STATS = [
  {
    id: "emails-checked",
    value: "10+ billion",
    label: "Emails Checked",
    icon: MailCheck,
  },
  {
    id: "bad-emails",
    value: "27%",
    label: "of emails were bad",
    icon: TrendingDown,
  },
  {
    id: "deliverability",
    value: "99.9%",
    label: "Deliverability ensured",
    icon: ShieldCheck,
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
      className="relative bg-surface py-10 md:py-12"
      aria-label="Email verification stats"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-line to-transparent"
        aria-hidden
      />

      <ul className="mx-auto grid max-w-4xl justify-items-center gap-8 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
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
    </section>
  );
}
