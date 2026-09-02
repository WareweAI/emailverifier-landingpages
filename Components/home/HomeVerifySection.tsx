import VerifierDemo from "@/Components/VerifierDemo";
import { DesktopMockup } from "@/Components/ui/DesktopMockup";
import { SectionShell } from "@/Components/ui/SectionShell";
import { cn } from "@/lib/utils";
import { MailCheck, ShieldCheck, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const TRY_SECTION_GRADIENT =
  "linear-gradient(to top right, var(--color-ink) 22%, var(--color-primary-deep) 100%)";

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

export default function HomeVerifySection() {
  return (
    <SectionShell
      id="try"
      ariaLabelledBy="home-verify-heading"
      className="relative overflow-hidden py-12 md:py-16 lg:py-20"
      style={{ backgroundImage: TRY_SECTION_GRADIENT }}
      innerClassName="relative z-10"
    >

      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="home-verify-heading"
          className="font-display text-2xl font-semibold tracking-tight text-primary-foreground lg:text-4xl"
        >
          Free Email verifier
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-primary-foreground/75">
          Paste an address to email verify deliverability in seconds
        </p>
      </div>

      <div className="relative mx-auto mt-10 max-w-2xl rounded-2xl py-4 md:mt-12">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
          aria-hidden
        >
          <div className="absolute inset-0 bg-primary/10" />
          <div className="absolute -left-8 -top-8 h-32 w-36 rounded-full bg-primary/25 blur-2xl" />
          <div className="absolute -right-8 -bottom-8 h-28 w-32 rounded-full bg-success/15 blur-2xl" />
        </div>
        <div className="relative px-3 sm:px-4">
          <DesktopMockup chromeLabel="Enter an email address to check its deliverability">
            <VerifierDemo variant="hero" location="home-verify" />
          </DesktopMockup>
        </div>
      </div>

      <ul className="mx-auto mt-10 grid max-w-4xl justify-items-center gap-8 sm:grid-cols-3 md:mt-12">
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
                  "border border-primary-foreground/10 bg-primary-foreground/10"
                )}
              >
                <Icon
                  className="h-5 w-5 text-primary-foreground"
                  aria-hidden
                />
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="font-display text-2xl font-bold tracking-tight text-primary-foreground lg:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm leading-snug text-primary-foreground/70">
                  {stat.label}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}
