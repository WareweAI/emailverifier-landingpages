import { CheckCircle2 } from "lucide-react";
import VerifierDemo from "@/Components/VerifierDemo";
import ProofBar from "@/Components/home/ProofBar";
import DashboardVerifyDemo from "@/Components/FreeValidationPage/DashboardVerifyDemo";
import MethodSection from "@/Components/home/MethodSection";
import NextPaths from "@/Components/FreeValidationPage/NextPaths";
import { DesktopMockup } from "@/Components/ui/DesktopMockup";
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
import { VALIDATE_EMAIL_FAQS } from "@/lib/validate-email-faq";
import { RATE_PER_THOUSAND } from "@/lib/pricing";

const METRICS = [
  {
    id: "free-page",
    value: "3",
    countTo: 3,
    label: "Free checks on this page",
  },
  {
    id: "signup",
    value: "100",
    countTo: 100,
    label: "Free credits on signup",
  },
  {
    id: "rate",
    value: `$${RATE_PER_THOUSAND.toFixed(2)}`,
    label: "Per 1,000 after free credits",
  },
  {
    id: "delete",
    value: "30 days",
    label: "File deletion after processing",
  },
] as const;

const PROBLEMS = [
  {
    title: "One bad send burns trust",
    body: "A single hard bounce or spam-trap hit can train providers to doubt your domain.",
  },
  {
    title: "Forms leak junk",
    body: "Typos, disposables, and role inboxes slip into CRMs and look like real demand.",
  },
  {
    title: "Guessing is not verification",
    body: "Pattern-based guesses and purchased lists need an email verifier before outreach.",
  },
] as const;

const STEPS = [
  {
    step: "1",
    title: "Enter an address",
    body: "Paste any email into the live tool above — up to 3 free checks on this page.",
  },
  {
    step: "2",
    title: "We run the checks",
    body: "Syntax, domain/MX, mailbox, disposable, role, and risk signals — without sending mail.",
  },
  {
    step: "3",
    title: "Read the status",
    body: "See deliverable, risky, or undeliverable plus flags you can act on.",
  },
  {
    step: "4",
    title: "Scale when ready",
    body: "Sign up for 100 credits, then bulk-clean CSVs or call the email verification API.",
  },
] as const;

const WHY_ROWS = [
  {
    feature: "Live check on the marketing site",
    ours: "yes" as const,
    others: "partial" as const,
  },
  {
    feature: "No email sent to verify",
    ours: "yes" as const,
    others: "yes" as const,
  },
  {
    feature: "Bulk + API on the same credits",
    ours: "yes" as const,
    others: "partial" as const,
  },
  {
    feature: "Credits that never expire",
    ours: "yes" as const,
    others: "no" as const,
  },
  {
    feature: "Transparent $1.80/1K entry rate",
    ours: "yes" as const,
    others: "no" as const,
  },
] as const;

export default function ValidateEmailProductPage() {
  return (
    <main
      className="flex-1 bg-background text-ink"
      id="main-page"
      role="main"
      aria-labelledby="validate-email-heading"
    >
      <section
        className="relative pt-10 pb-12 md:pt-14 md:pb-16 lg:pb-20"
        aria-labelledby="validate-email-heading"
      >
        <HeroWash />
        <div className="site-container relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-ink-muted">
              Free Email Verification Tool
            </p>
            <h1
              id="validate-email-heading"
              className="mt-5 font-display text-3xl font-semibold leading-snug tracking-tight text-ink sm:text-4xl lg:text-5xl"
            >
              Free email verifier — check deliverability before you send
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              Email verify deliverability, risk, and mailbox status — syntax,
              domain, and flags — without sending mail. Try 3 free checks on
              this page, then get 100 more on signup. Same credits power the
              bulk email verifier and email verification API.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-3xl md:mt-10">
            <DesktopMockup chromeLabel="Enter an email address to check its deliverability">
              <VerifierDemo variant="tool-page" location="validate-email" />
            </DesktopMockup>
          </div>
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-ink-muted">
            {(
              ["GDPR-ready", "30-day deletion", "No credit card"] as const
            ).map((label) => (
              <li key={label} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProofBar />
      <MetricStrip items={[...METRICS]} eyebrow="Free email verifier facts" />

      <SectionShell
        className="bg-surface-muted"
        ariaLabelledBy="validate-problem-heading"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="validate-problem-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
          >
            Bad addresses are a blacklist problem waiting to happen
          </h2>
          <p className="mt-3 text-ink-muted">
            Blacklist avoidance starts with not sending to invalid, disposable,
            and high-risk inboxes. An email verifier catches those rows before
            the campaign — not after the bounce report.
          </p>
        </div>
        <Reveal className="mt-10" staggerSelector="[data-problem]">
          <ul className="grid gap-4 md:grid-cols-3">
            {PROBLEMS.map((item) => (
              <li
                key={item.title}
                data-problem
                className="rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] transition hover:border-primary/35"
              >
                <p className="font-semibold text-ink">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </SectionShell>

      {/* Product-led "see it in action" — keep existing dashboard demo */}
      <DashboardVerifyDemo />

      <SectionShell ariaLabelledBy="validate-result-heading">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2
              id="validate-result-heading"
              className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
            >
              Statuses you can act on
            </h2>
            <p className="mt-4 text-ink-muted">
              Every check returns clear outcomes — not a vague score alone. Use
              deliverable rows for sends, review risky ones, and drop
              undeliverable or disposable addresses before they hurt reputation.
            </p>
          </div>
          <Reveal>
            <ul className="space-y-3 rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)]">
              {(
                [
                  {
                    email: "alex@acme.com",
                    chip: { label: "Deliverable", variant: "success" as const },
                  },
                  {
                    email: "info@shop.co",
                    chip: { label: "Risky · Role", variant: "warning" as const },
                  },
                  {
                    email: "temp@mail-drop.io",
                    chip: { label: "Disposable", variant: "danger" as const },
                  },
                  {
                    email: "bounce@old-domain.example",
                    chip: {
                      label: "Undeliverable",
                      variant: "danger" as const,
                    },
                  },
                ] as const
              ).map((row) => (
                <li
                  key={row.email}
                  className="flex items-center justify-between gap-3 rounded-xl border border-line bg-background px-3 py-3"
                >
                  <span className="truncate font-mono text-sm text-ink">
                    {row.email}
                  </span>
                  <StatusChip
                    label={row.chip.label}
                    variant={row.chip.variant}
                  />
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-ink-muted">
              Example statuses — try a real address in the live tool above.
            </p>
          </Reveal>
        </div>
      </SectionShell>

      <MethodSection />

      <HowSteps
        className="bg-surface-muted"
        title="How to email verify in seconds"
        intro="From a single paste to a full-list clean — same product, same credits."
        steps={[...STEPS]}
      />

      <SectionShell ariaLabelledBy="validate-roi-heading">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="validate-roi-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
          >
            Free to try. Cheap to scale.
          </h2>
          <p className="mt-3 text-ink-muted">
            Three checks on this page. One hundred free credits after signup.
            Then ${RATE_PER_THOUSAND.toFixed(2)} per 1,000 for bulk or API —
            credits that never expire. No suite seat required to email verify a
            list.
          </p>
        </div>
      </SectionShell>

      <WhyUsTable
        className="bg-surface-muted"
        title="Why this free email verifier"
        intro="Built for marketers and builders who want clear statuses and honest credits."
        rows={[...WHY_ROWS]}
      />

      <NextPaths />

      <CreditPricingTeaser
        title="Done with single checks? Clean the full list."
        body={`100 free credits on signup — then $${RATE_PER_THOUSAND.toFixed(2)}/1K for bulk CSV or the email verification API. Credits never expire.`}
        eventLoc="validate-pricing"
      />

      <LandingFaq title="Email verifier FAQs" items={VALIDATE_EMAIL_FAQS} />

      <LandingFinalCta
        title="Verify the next address — then the whole list"
        body="Keep using the free email verifier above, or sign up for 100 credits and upload a CSV."
        secondaryHref="/bulk-email-verifier"
        secondaryLabel="See bulk email verifier"
        eventLoc="validate-final"
      />
    </main>
  );
}
