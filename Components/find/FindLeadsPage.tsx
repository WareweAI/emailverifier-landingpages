import Link from "next/link";
import { Building2, Filter, ListPlus, Sparkles } from "lucide-react";
import { FindLeadsMockup } from "@/Components/home/feature-pillars/PillarMockups";
import { FinderChecks, FinderCtas } from "@/Components/find/FinderPageParts";
import { HeroWash } from "@/Components/ui/HeroWash";
import { PageBreadcrumb } from "@/Components/ui/PageBreadcrumb";
import { SectionShell } from "@/Components/ui/SectionShell";
import { Reveal } from "@/Components/landing/Reveal";
import { MetricStrip } from "@/Components/landing/MetricStrip";
import { HowSteps } from "@/Components/landing/HowSteps";
import { WhyUsTable } from "@/Components/landing/WhyUsTable";
import { CreditPricingTeaser } from "@/Components/landing/CreditPricingTeaser";
import { LandingFaq } from "@/Components/landing/LandingFaq";
import { LandingFinalCta } from "@/Components/landing/LandingFinalCta";
import { FIND_LEADS_FAQS } from "@/lib/find-leads-faq";
import { RATE_PER_THOUSAND } from "@/lib/pricing";

const METRICS = [
  {
    id: "modes",
    value: "2 live",
    label: "Person + company search",
  },
  {
    id: "local",
    value: "Soon",
    label: "Local search (not live yet)",
  },
  {
    id: "rate",
    value: `$${RATE_PER_THOUSAND.toFixed(2)}`,
    label: "Per 1,000 on shared credits",
  },
  {
    id: "free",
    value: "100",
    countTo: 100,
    label: "Free credits on signup",
  },
] as const;

const CAPABILITIES = [
  {
    title: "Plain-language brief",
    body: "Describe role, company type, and size. Get people or companies back — no filter maze to start.",
    icon: Sparkles,
  },
  {
    title: "Person or company",
    body: "Switch between people and company search. Local search stays marked Soon until it ships.",
    icon: Building2,
  },
  {
    title: "Saveable lead lists",
    body: "Filter results, save the list, and keep only the contacts you want to email.",
    icon: ListPlus,
  },
  {
    title: "Verify before outreach",
    body: "When a row includes an email, email verify it on the same credits. No email found = not charged.",
    icon: Filter,
  },
] as const;

const STEPS = [
  {
    step: "1",
    title: "Write the brief",
    body: "Describe who you want in plain language — role, company type, and size.",
  },
  {
    step: "2",
    title: "Choose people or companies",
    body: "Person and company search are available. Local search is marked Soon and is not live yet.",
  },
  {
    step: "3",
    title: "Filter and save",
    body: "Narrow the results, save the lead list, and drop rows you will not contact.",
  },
  {
    step: "4",
    title: "Email verify what you keep",
    body: "Check attached addresses on the same credit balance before the sequence goes out.",
  },
] as const;

const WHY_ROWS = [
  {
    feature: "Prospecting + verification in one product",
    ours: "yes" as const,
    others: "partial" as const,
  },
  {
    feature: "Not charged when no email is found",
    ours: "yes" as const,
    others: "no" as const,
  },
  {
    feature: "Honest credit pricing (never expire)",
    ours: "yes" as const,
    others: "no" as const,
  },
  {
    feature: "Clear about what is Soon vs live",
    ours: "yes" as const,
    others: "no" as const,
  },
] as const;

export default function FindLeadsPage() {
  return (
    <main id="main-page" className="relative flex-1">
      <section
        className="relative pt-12 pb-16 lg:pt-16 lg:pb-20"
        aria-labelledby="find-leads-heading"
      >
        <HeroWash />
        <div className="site-container relative z-10 min-w-0">
          <PageBreadcrumb
            className="mb-6"
            items={[
              { label: "Home", href: "/" },
              { label: "Find Leads" },
            ]}
          />
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            <p className="text-sm font-medium text-ink-muted">Find Leads</p>
            <h1
              id="find-leads-heading"
              className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink lg:text-5xl"
            >
              Find B2B leads the email verifier can keep
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              Write a plain-language brief — who you want, and at what kind of
              company — and get people or companies back. Person and company
              search are live; local search is Soon. When a row includes an
              email, email verify it on the same credits as the bulk email
              verifier (${RATE_PER_THOUSAND.toFixed(2)}/1K). No email found means
              that row is not charged.
            </p>
            <FinderCtas loc="find-leads-hero" />
            <FinderChecks
              items={[
                "Person or company",
                "Plain-language brief",
                "Saveable lead lists",
                "Not charged when no email is found",
              ]}
            />
          </div>
          <figure className="min-w-0">
            <figcaption className="mb-3 text-sm text-ink-muted">
              Example lead list. Names and counts are illustrative.
            </figcaption>
            <FindLeadsMockup />
          </figure>
          </div>
        </div>
      </section>

      <MetricStrip items={[...METRICS]} eyebrow="Find Leads facts" />

      <SectionShell
        className="bg-surface-muted"
        ariaLabelledBy="find-leads-problem-heading"
      >
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2
              id="find-leads-problem-heading"
              className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
            >
              Prospecting without verification is half a workflow
            </h2>
            <p className="mt-4 text-ink-muted">
              Buying a raw lead dump and hoping is how domains get burned. Find
              Leads sits next to the email verifier so discovery and list quality
              share one credit pool — and one honest rule: no email found, no
              charge.
            </p>
          </div>
          <Reveal>
            <div className="rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)]">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
                Example brief
              </p>
              <p className="mt-3 text-base leading-relaxed text-ink">
                VPs of Engineering at companies with 50–200 employees
              </p>
              <ul className="mt-4 divide-y divide-line text-sm">
                <li className="flex items-center justify-between gap-3 py-3">
                  <span className="min-w-0">
                    <span className="block font-medium text-ink">Jordan Hale</span>
                    <span className="block truncate text-xs text-ink-muted">
                      VP of Engineering · Northpeak
                    </span>
                  </span>
                  <span className="shrink-0 text-xs font-medium text-ink">
                    Email attached
                  </span>
                </li>
                <li className="flex items-center justify-between gap-3 py-3">
                  <span className="font-medium text-ink-muted">No email found</span>
                  <span className="shrink-0 text-xs font-medium text-ink-muted">
                    Not charged
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      <SectionShell ariaLabelledBy="find-leads-caps-heading">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="find-leads-caps-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
          >
            Built for prospecting next to verification
          </h2>
          <p className="mt-3 text-ink-muted">
            Capabilities that match the dashboard — including what is still Soon.
          </p>
        </div>
        <Reveal className="mt-10" staggerSelector="[data-cap]">
          <ul className="grid gap-4 sm:grid-cols-2">
            {CAPABILITIES.map((cap) => {
              const Icon = cap.icon;
              return (
                <li
                  key={cap.title}
                  data-cap
                  className="flex gap-4 rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] transition hover:border-primary/35"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{cap.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                      {cap.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </SectionShell>

      <HowSteps
        className="bg-surface-muted"
        title="How Search Leads works"
        steps={[...STEPS]}
      />

      <WhyUsTable
        title="Why Find Leads here"
        intro="Prospect, save lists, and email verify without juggling another suite seat."
        rows={[...WHY_ROWS]}
      />

      <CreditPricingTeaser
        title="Prospect on the same credits you clean with"
        eventLoc="find-leads-pricing"
      />

      <LandingFaq title="Find Leads questions" items={FIND_LEADS_FAQS} />

      <LandingFinalCta
        title="Build the list. Verify before you send."
        body="Start with 100 free credits. Person and company search are live — local search stays Soon until it ships."
        secondaryHref="/find-emails"
        secondaryLabel="Already have a name?"
        eventLoc="find-leads-final"
      />

      <p className="sr-only">
        Prefer cleaning addresses you already have? Use the{" "}
        <Link href="/bulk-email-verifier">bulk email verifier</Link>.
      </p>
    </main>
  );
}
