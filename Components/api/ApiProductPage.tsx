import Link from "next/link";
import { CheckCircle2, ShieldAlert, UserX, MailWarning } from "lucide-react";
import ApiSnippet from "@/Components/ui/ApiSnippet";
import { Button } from "@/Components/ui/Button";
import { HeroWash } from "@/Components/ui/HeroWash";
import { SectionShell } from "@/Components/ui/SectionShell";
import { StatusChip } from "@/Components/ui/StatusChip";
import { Reveal } from "@/Components/landing/Reveal";
import { MetricStrip } from "@/Components/landing/MetricStrip";
import { HowSteps } from "@/Components/landing/HowSteps";
import { WhyUsTable } from "@/Components/landing/WhyUsTable";
import { CreditPricingTeaser } from "@/Components/landing/CreditPricingTeaser";
import { LandingFaq } from "@/Components/landing/LandingFaq";
import { LandingFinalCta } from "@/Components/landing/LandingFinalCta";
import { API_PAGE_FAQS } from "@/lib/api-page-faq";
import { REGISTER_URL } from "@/lib/api-snippet";
import { RATE_PER_THOUSAND } from "@/lib/pricing";

const METRICS = [
  {
    id: "rate",
    value: `$${RATE_PER_THOUSAND.toFixed(2)}`,
    label: "Per 1,000 credits (25K pack)",
  },
  {
    id: "same",
    value: "1 balance",
    label: "Same credits as bulk & finder",
  },
  {
    id: "free",
    value: "100",
    countTo: 100,
    label: "Free credits on signup",
  },
  {
    id: "expire",
    value: "Never",
    label: "Credits expire",
  },
] as const;

const FLAG_CARDS = [
  {
    title: "Disposable",
    body: "Block throwaway inboxes before they pollute your CRM.",
    icon: MailWarning,
    chip: { label: "Disposable", variant: "danger" as const },
  },
  {
    title: "Catch-all",
    body: "Flag domains that accept any address so you can treat them as risky.",
    icon: ShieldAlert,
    chip: { label: "Catch-all", variant: "warning" as const },
  },
  {
    title: "Role-based",
    body: "Spot info@, sales@, and other shared inboxes that rarely convert.",
    icon: UserX,
    chip: { label: "Role-based", variant: "warning" as const },
  },
] as const;

const STEPS = [
  {
    step: "1",
    title: "Register",
    body: "Create an account and get 100 free credits — no card required.",
  },
  {
    step: "2",
    title: "Create an API key",
    body: "Generate a key in the dashboard. Use it only from your server or trusted app.",
  },
  {
    step: "3",
    title: "Call verify",
    body: "Send the email address. Get status, score, and risk flags back in one response.",
  },
  {
    step: "4",
    title: "Gate the signup",
    body: "Accept deliverable addresses; challenge or reject risky and invalid ones.",
  },
] as const;

const WHY_ROWS = [
  {
    feature: "Same credits as bulk list cleaning",
    ours: "yes" as const,
    others: "no" as const,
  },
  {
    feature: "Real status + score + risk flags",
    ours: "yes" as const,
    others: "partial" as const,
  },
  {
    feature: "Credits that never expire",
    ours: "yes" as const,
    others: "no" as const,
  },
  {
    feature: "Docs-lite HTTPS (no forced SDK)",
    ours: "yes" as const,
    others: "partial" as const,
  },
  {
    feature: "Transparent $1.80/1K entry rate",
    ours: "yes" as const,
    others: "no" as const,
  },
] as const;

export default function ApiProductPage() {
  return (
    <main id="main-page" className="relative flex-1">
      <section
        className="relative pt-12 pb-16 lg:pt-16 lg:pb-20"
        aria-labelledby="api-hero-heading"
      >
        <HeroWash />
        <div className="site-container relative z-10">
          <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-xl lg:text-left">
            <p className="text-sm font-medium text-ink-muted">
              Email verification API
            </p>
            <h1
              id="api-hero-heading"
              className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink lg:text-5xl"
            >
              Real-time email verifier for signups and apps
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              Stop disposable, catch-all, and invalid addresses at the form.
              This email verification API uses the same credits as our bulk
              email verifier — one balance, from ${RATE_PER_THOUSAND.toFixed(2)}{" "}
              per 1,000, credits that never expire.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Button
                asChild
                size="lg"
                className="transition-transform hover:scale-[1.02] active:scale-[0.99] motion-reduce:transform-none"
              >
                <Link
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ev-event="cta_register_click"
                  data-ev-loc="api-hero"
                >
                  Get API key
                </Link>
              </Button>
              <Button variant="secondary" asChild size="lg">
                <Link href="#api-example" data-ev-event="api_docs_click">
                  View API example
                </Link>
              </Button>
            </div>
            <ul className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-ink-muted lg:justify-start">
              {(
                [
                  "Same credits as bulk",
                  "status · score · flags",
                  "100 free · no card",
                ] as const
              ).map((label) => (
                <li key={label} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div id="api-example" className="mx-auto mt-10 max-w-3xl scroll-mt-28 lg:mx-0 lg:max-w-none">
            <ApiSnippet />
          </div>
        </div>
      </section>

      <MetricStrip items={[...METRICS]} eyebrow="Email verification API facts" />

      <SectionShell
        className="bg-surface-muted"
        ariaLabelledBy="api-problem-heading"
      >
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2
              id="api-problem-heading"
              className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
            >
              Bad signups become expensive lists
            </h2>
            <p className="mt-4 text-ink-muted">
              Every fake, disposable, or mistyped address that slips through
              signup burns sales time, inflates your CRM, and raises bounce risk
              later. An email verifier at the form catches the problem before it
              compounds.
            </p>
            <p className="mt-3 text-ink-muted">
              Call the email verification API on submit. Keep deliverable
              contacts. Challenge or reject the rest — without sending mail.
            </p>
          </div>
          <Reveal>
            <div className="rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)]">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
                Example signup gate
              </p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-background px-3 py-3">
                  <span className="truncate font-mono text-sm text-ink">
                    alex@acme.com
                  </span>
                  <StatusChip label="Valid" variant="success" />
                </div>
                <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-background px-3 py-3">
                  <span className="truncate font-mono text-sm text-ink">
                    temp@mail-drop.io
                  </span>
                  <StatusChip label="Disposable" variant="danger" />
                </div>
                <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-background px-3 py-3">
                  <span className="truncate font-mono text-sm text-ink">
                    info@shop.co
                  </span>
                  <StatusChip label="Role-based" variant="warning" />
                </div>
              </div>
              <p className="mt-3 text-xs text-ink-muted">
                Illustrative rows — field names match live API responses.
              </p>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      <SectionShell ariaLabelledBy="api-flags-heading">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="api-flags-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
          >
            Flags that match the dashboard
          </h2>
          <p className="mt-3 text-ink-muted">
            The email verification API returns the same risk signals marketers
            already use when they email verify a CSV — not a watered-down
            “valid/invalid” boolean.
          </p>
        </div>
        <Reveal
          className="mt-10"
          staggerSelector="[data-flag-card]"
        >
          <ul className="grid gap-4 md:grid-cols-3">
            {FLAG_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <li
                  key={card.title}
                  data-flag-card
                  className="flex flex-col rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-primary/35 motion-reduce:transform-none"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary-soft text-primary">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                  </span>
                  <div className="mt-4 flex items-center gap-2">
                    <p className="font-semibold text-ink">{card.title}</p>
                    <StatusChip
                      label={card.chip.label}
                      variant={card.chip.variant}
                    />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {card.body}
                  </p>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </SectionShell>

      <HowSteps
        className="bg-surface-muted"
        title="How to email verify in real time"
        intro="Four steps from register to a gated signup — no SDK package required."
        steps={[...STEPS]}
      />

      <SectionShell ariaLabelledBy="api-roi-heading">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2
              id="api-roi-heading"
              className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
            >
              One credit pool. Clear math.
            </h2>
            <p className="mt-4 text-ink-muted">
              Suites often sell a separate “API plan” with expiring seats. Here,
              builders and list-cleaners share the same pay-once credits. A
              25,000 pack is $45 — that is ${RATE_PER_THOUSAND.toFixed(2)} per
              1,000 email verify calls, whether they run in bulk or at signup.
            </p>
          </div>
          <Reveal>
            <dl className="space-y-3 rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)]">
              {(
                [
                  ["25,000 credits", "$45"],
                  ["Per 1,000", `$${RATE_PER_THOUSAND.toFixed(2)}`],
                  ["Free on signup", "100 credits"],
                  ["Expiry", "Never"],
                ] as const
              ).map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between gap-4 border-b border-line py-3 last:border-0"
                >
                  <dt className="text-sm text-ink-muted">{k}</dt>
                  <dd className="font-display text-lg font-semibold tabular-nums text-ink">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </SectionShell>

      <WhyUsTable
        className="bg-surface-muted"
        title="Why this email verification API"
        intro="Built for teams that want real checks and honest credits — not another suite seat."
        rows={[...WHY_ROWS]}
      />

      <CreditPricingTeaser
        title="Get an API key with 100 free credits"
        body={`Register, create a key, and start calling the email verification API. Same $${RATE_PER_THOUSAND.toFixed(2)}/1K credits as bulk — they never expire.`}
        primaryLabel="Get API key"
        eventLoc="api-pricing-teaser"
      />

      <LandingFaq
        title="Email verification API questions"
        items={API_PAGE_FAQS}
      />

      <LandingFinalCta
        title="Ship the check. Keep the list clean."
        body="Add the email verifier to signup today. 100 free credits, no card, same balance as bulk."
        primaryLabel="Get API key"
        secondaryHref="/bulk-email-verifier"
        secondaryLabel="Prefer bulk CSV?"
        eventLoc="api-final-cta"
      />
    </main>
  );
}
