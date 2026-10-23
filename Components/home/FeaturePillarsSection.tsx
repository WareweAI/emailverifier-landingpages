import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  MailCheck,
  Search,
  UserSearch,
  type LucideIcon,
} from "lucide-react";
import {
  ApiKeysMockup,
  FindEmailsMockup,
  FindLeadsMockup,
  VerifyEmailsMockup,
} from "@/Components/home/feature-pillars/PillarMockups";
import { Button } from "@/Components/ui/Button";
import { SectionShell } from "@/Components/ui/SectionShell";
import { cn } from "@/lib/utils";

type Pillar = {
  id: string;
  icon: LucideIcon;
  iconClass: string;
  iconWrapClass: string;
  title: string;
  description: string;
  href: string;
  cardClass: string;
  Mockup: () => ReactNode;
};

const PILLARS: Pillar[] = [
  {
    id: "verify",
    icon: MailCheck,
    iconClass: "text-success",
    iconWrapClass: "bg-success/15",
    title: "Verify Emails",
    description:
      "Bulk-upload CSV, XLS, or XLSX, or verify a single inbox. Get valid, risky, and invalid with catch-all, disposable, and role flags so you know what is safe to send.",
    href: "https://app.emailverifier.io/dashboard/verify",
    cardClass: "bg-success-soft",
    Mockup: VerifyEmailsMockup,
  },
  {
    id: "find",
    icon: Search,
    iconClass: "text-primary",
    iconWrapClass: "bg-primary/15",
    title: "Find Emails",
    description:
      "Search by name and domain or LinkedIn, or bulk-find from a CSV. Only keep addresses that verify — enrichment is optional, and you are not charged when nothing is found.",
    href: "https://app.emailverifier.io/dashboard/find",
    cardClass: "bg-lavender-soft",
    Mockup: FindEmailsMockup,
  },
  {
    id: "leads",
    icon: UserSearch,
    iconClass: "text-primary-deep",
    iconWrapClass: "bg-primary-deep/10",
    title: "Find Leads",
    description:
      "Search Leads turns a plain-language brief into people or companies to pursue. Filter, save lists, and move qualified contacts into outreach without leaving the product.",
    href: "https://app.emailverifier.io/dashboard/leads",
    cardClass: "bg-teal-soft",
    Mockup: FindLeadsMockup,
  },
  {
    id: "api",
    icon: Code2,
    iconClass: "text-warning",
    iconWrapClass: "bg-warning/15",
    title: "API",
    description:
      "A docs-lite email verification API plus finder and leads endpoints — same credit balance as bulk. Create keys, try requests, and ship signup checks without an SDK maze.",
    href: "https://app.emailverifier.io/dashboard/api-keys",
    cardClass: "bg-peach-soft",
    Mockup: ApiKeysMockup,
  },
];

export default function FeaturePillarsSection() {
  return (
    <SectionShell
      id="features"
      className="bg-background pb-8 md:pb-12 lg:pb-16"
      ariaLabelledBy="feature-pillars-heading"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2.5 text-sm font-medium text-ink-muted">
            <span
              className="h-1 w-5 shrink-0 rounded-full bg-ink-muted"
              aria-hidden
            />
            What EmailVerifier does
          </p>
          <h2
            id="feature-pillars-heading"
            className="mt-3 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-4xl lg:text-5xl"
          >
            Four ways our email verifier works.
          </h2>
        </div>
        <p className="max-w-md text-lg leading-relaxed text-ink-muted lg:pb-1 lg:text-right">
        Your must have tool in your email outreach that saves sender reputation, prevents bounces and enrich fresh leads with valid emails.
        </p>
      </div>

      <ol className="mt-12 list-none space-y-0 p-0 lg:mt-16">
        {PILLARS.map((pillar, index) => (
          <li
            key={pillar.id}
            className={cn(
              "relative",
              index > 0 && "-mt-4 sm:-mt-5 lg:-mt-6"
            )}
            style={{ zIndex: index + 1 }}
          >
            <article
              className={cn(
                /* 1-off: 5px white edge so stacked pastel cards separate cleanly */
                "grid items-center gap-8 rounded-3xl border-[5px] border-surface p-6 shadow-[var(--shadow-card)] sm:p-8 lg:grid-cols-2 lg:gap-10 lg:p-10",
                pillar.cardClass
              )}
            >
              <div className="min-w-0">
                <span
                  className={cn(
                    "inline-flex h-12 w-12 items-center justify-center rounded-2xl sm:h-14 sm:w-14",
                    pillar.iconWrapClass
                  )}
                  aria-hidden
                >
                  <pillar.icon
                    className={cn("h-7 w-7 sm:h-8 sm:w-8", pillar.iconClass)}
                    strokeWidth={1.75}
                  />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  {pillar.title}
                </h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-ink-muted">
                  {pillar.description}
                </p>
                <Button
                  size="lg"
                  asChild
                  className="group mt-6 rounded-full border border-ink bg-ink text-primary-foreground hover:bg-ink/90 active:bg-ink"
                >
                  <Link
                    href={pillar.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ev-event="feature_pillar_cta"
                    data-ev-loc={`pillar-${pillar.id}`}
                  >
                    Start for free
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                      aria-hidden
                    />
                  </Link>
                </Button>
              </div>

              <div className="min-w-0 lg:pl-2" aria-hidden>
                <pillar.Mockup />
              </div>
            </article>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
