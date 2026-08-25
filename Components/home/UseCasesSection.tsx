import type { ReactNode } from "react";
import Link from "next/link";
import {
  Briefcase,
  MailCheck,
  Package,
  ShieldCheck,
  Target,
  type LucideIcon,
} from "lucide-react";
import {
  AgencyMockup,
  EcommerceMockup,
  MarketingMockup,
  SalesMockup,
  SaasMockup,
  UseCaseMockFrame,
} from "@/Components/home/use-cases/UseCaseMockups";
import { SectionShell } from "@/Components/ui/SectionShell";
import { REGISTER_URL } from "@/lib/api-snippet";
import { cn } from "@/lib/utils";

type UseCase = {
  persona: string;
  headline: string;
  description: string;
  benefit: string;
  signal: string;
  icon: LucideIcon;
  className?: string;
  tall?: boolean;
  Mockup: () => ReactNode;
};

const USE_CASES: UseCase[] = [
  {
    persona: "Marketing & Growth",
    headline: "Protect the campaign before you hit send",
    description:
      "Cold lists and old lead magnets look fine in a spreadsheet — until ESP reputation takes the hit. Clean the list first, then spend on creative, not recovery.",
    benefit:
      "Valid / risky / invalid plus disposable, catch-all, and role flags — so you know what to send, suppress, or review.",
    signal: "Before every send · Not after the bounce report",
    icon: MailCheck,
    className: "md:col-span-2",
    tall: true,
    Mockup: MarketingMockup,
  },
  {
    persona: "Sales & SDRs",
    headline: "Stop burning sequences on dead addresses",
    description:
      "Every bad email in the cadence wastes a touch and a domain. Verify prospects before outreach so reps spend time on people who can actually reply.",
    benefit:
      "Fast checks on scraped or enriched lists — catch invalids and role inboxes before the first step fires.",
    signal: "Outreach-ready lists · Same day, same credits",
    icon: Target,
    Mockup: SalesMockup,
  },
  {
    persona: "SaaS & Product",
    headline: "Keep junk out of the product at the door",
    description:
      "Disposable and catch-all signups inflate metrics and poison lifecycle email. Verify in real time at registration so your CRM stays usable.",
    benefit:
      "Email verification API on the same cheap credits as bulk — block or flag before the account is created.",
    signal: "Real-time at signup · Docs-lite, no SDK theater",
    icon: ShieldCheck,
    Mockup: SaasMockup,
  },
  {
    persona: "E-commerce & DTC",
    headline: "Fewer bounces. More room in the inbox.",
    description:
      "Abandoned-cart and promo sends only work if the address is real. Clean purchased and imported lists so welcome flows don’t train spam filters against you.",
    benefit:
      "Bulk-clean lists with a bulk email verifier at a flat $1.80 per 1,000 — credits never expire between peak seasons.",
    signal: "Seasonal lists · Credits that wait for you",
    icon: Package,
    Mockup: EcommerceMockup,
  },
  {
    persona: "Agencies & Freelancers",
    headline: "One verifier. Every client list.",
    description:
      "Clients hand over messy CSVs and expect deliverability miracles. Run the clean, show clear statuses, and ship results without burning a retainer on suite pricing.",
    benefit:
      "Upload → statuses → download. Transparent pricing you can pass through without awkward per-seat explanations.",
    signal: "Client-ready exports · Pay for what you clean",
    icon: Briefcase,
    Mockup: AgencyMockup,
  },
];

function UseCaseCard({ useCase }: { useCase: UseCase }) {
  const Icon = useCase.icon;
  const Mockup = useCase.Mockup;

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]",
        "transition-[transform,border-color,box-shadow] duration-200 ease-out",
        "hover:-translate-y-px hover:border-primary/30 motion-reduce:hover:translate-y-0",
        useCase.className
      )}
    >
      <UseCaseMockFrame tall={useCase.tall}>
        <Mockup />
      </UseCaseMockFrame>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary"
            aria-hidden
          >
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <p className="pt-2 text-xs font-medium uppercase tracking-wide text-ink-muted">
            {useCase.persona}
          </p>
        </div>

        <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-ink">
          {useCase.headline}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          {useCase.description}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink">{useCase.benefit}</p>
        <p className="mt-auto pt-5 text-xs text-ink-muted">{useCase.signal}</p>
      </div>
    </article>
  );
}

export default function UseCasesSection() {
  return (
    <SectionShell
      id="use-cases"
      className="bg-surface-muted"
      ariaLabelledBy="use-cases-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          Built for the teams who send
        </p>
        <h2
          id="use-cases-heading"
          className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink lg:text-4xl"
        >
          Cleaner lists for every team that can’t afford a bounce
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">
          Whether you upload a CSV or verify at signup, this email verifier
          shows what’s safe to send — and what will quietly wreck
          deliverability.
        </p>
        <p className="mt-3 text-sm text-ink-muted">
          Same credits for bulk, single checks, and the API. No monthly burn. No
          credit card to start.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3 md:gap-5">
        {USE_CASES.map((useCase) => (
          <UseCaseCard key={useCase.persona} useCase={useCase} />
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-xl text-center">
        <p className="text-sm leading-relaxed text-ink-muted">
          See your first results in seconds — then clean a full list with 100
          free credits.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-medium">
          <Link
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-primary hover:underline"
            data-ev-event="cta_register_click"
          >
            Get 100 free credits
          </Link>
          <span className="text-ink-muted" aria-hidden>
            ·
          </span>
          <Link
            href="/#pricing"
            className="inline-flex min-h-11 items-center text-ink-muted hover:text-ink hover:underline"
          >
            See pricing
          </Link>
          <span className="text-ink-muted" aria-hidden>
            ·
          </span>
          <Link
            href="/email-verification-api"
            className="inline-flex min-h-11 items-center text-ink-muted hover:text-ink hover:underline"
            data-ev-event="api_docs_click"
          >
            View API docs
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}
