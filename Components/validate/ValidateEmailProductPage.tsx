import {
  AtSign,
  Gauge,
  MailCheck,
  Server,
  ShieldCheck,
  UserCog,
  type LucideIcon,
} from "lucide-react";
import VerifierDemo from "@/Components/VerifierDemo";
import ProofBar from "@/Components/home/ProofBar";
import { TrustStatsRow } from "@/Components/home/HomeStatsStrip";
import NextPaths from "@/Components/FreeValidationPage/NextPaths";
import { DesktopMockup } from "@/Components/ui/DesktopMockup";
import { HeroWash } from "@/Components/ui/HeroWash";
import { PageBreadcrumb } from "@/Components/ui/PageBreadcrumb";
import { SectionShell } from "@/Components/ui/SectionShell";
import { StatusChip } from "@/Components/ui/StatusChip";
import { Reveal } from "@/Components/landing/Reveal";
import { WhyUsTable } from "@/Components/landing/WhyUsTable";
import CTA from "@/Components/CTA";
import { LandingFaq } from "@/Components/landing/LandingFaq";
import { VALIDATE_EMAIL_FAQS } from "@/lib/validate-email-faq";

const ACCURACY_CHECKS = [
  {
    step: "01",
    title: "Advanced Syntax Validation",
    body: "Instantly detects malformed and invalid email addresses.",
    icon: AtSign,
  },
  {
    step: "02",
    title: "Domain & MX Record Checks",
    body: "Confirms the domain exists and is configured to receive email.",
    icon: Server,
  },
  {
    step: "03",
    title: "Real-Time SMTP Verification",
    body: "Verifies mailbox availability without sending an email.",
    icon: MailCheck,
  },
  {
    step: "04",
    title: "Disposable Email Detection",
    body: "Filters out temporary and throwaway inboxes.",
    icon: ShieldCheck,
  },
  {
    step: "05",
    title: "Role-Based Email Detection",
    body: "Identifies risky addresses like info@, admin@, and support@.",
    icon: UserCog,
  },
  {
    step: "06",
    title: "Smart Risk Scoring",
    body: "Classifies emails as Deliverable, Risky, Undeliverable, or Unknown so you can send with confidence.",
    icon: Gauge,
  },
] as const satisfies ReadonlyArray<{
  step: string;
  title: string;
  body: string;
  icon: LucideIcon;
}>;

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

const STATUS_GUIDE = [
  {
    status: "safe",
    variant: "success" as const,
    means: "Syntax passed, MX was found, and SMTP accepted the recipient.",
    handling: "Eligible to mail, still subject to your own sending rules.",
  },
  {
    status: "invalid",
    variant: "danger" as const,
    means: "Syntax failed, MX was missing, or SMTP rejected the mailbox.",
    handling: "Suppress. These are the usual hard bounces.",
  },
  {
    status: "catch-all",
    variant: "warning" as const,
    means:
      "The domain accepted a probe that should not have been a real mailbox.",
    handling: "Do not treat as valid. Decide with a separate policy.",
  },
  {
    status: "do_not_mail",
    variant: "danger" as const,
    means: "The domain is on the disposable list loaded by the server.",
    handling: "Suppress. Disposable addresses are a poor list to keep.",
  },
  {
    status: "unknown",
    variant: "neutral" as const,
    means: "The check could not decide, including some filtered MX hosts.",
    handling: "Retry or leave out. Fallback may recheck when it is configured.",
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
          <PageBreadcrumb
            className="mb-6"
            items={[
              { label: "Home", href: "/" },
              { label: "Products" },
              { label: "Free Email Verifier" },
            ]}
          />
          <div className="mx-auto max-w-4xl text-center">
            <p className="whitespace-nowrap text-sm font-medium text-ink-muted">
              Verify email address online
            </p>
            {/* 1-off clamp: keep H1 on one line from mobile through desktop */}
            <h1
              id="validate-email-heading"
              className="mt-5 whitespace-nowrap font-display text-[clamp(1.125rem,4.8vw,3rem)] font-semibold capitalize leading-snug tracking-tight text-ink"
            >
              <span className="text-primary">Free Email Verifier</span>
              {" "}
              & Validation Tool
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
              Checks whether a single email address is correctly formatted and
              able to receive mail, at no cost.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-3xl md:mt-10">
            <DesktopMockup chromeLabel="Enter an email address to check its deliverability">
              <VerifierDemo variant="tool-page" location="validate-email" />
            </DesktopMockup>
            <TrustStatsRow compact className="mt-8 w-full max-w-none" />
          </div>
        </div>
      </section>

      <ProofBar />

      <SectionShell
        className="bg-background"
        ariaLabelledBy="validate-accuracy-heading"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="validate-accuracy-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
          >
            What Makes{" "}
            <span className="text-primary">emailverifier.io</span> the Most
            Accurate Email Verifier
          </h2>
          <p className="mt-3 text-ink-muted">
            Unlike basic email checkers, EmailVerifier.io doesn&apos;t rely on
            cached data or assumptions. Every email is verified live.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-6xl">
          <Reveal staggerSelector="[data-accuracy-check]">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ACCURACY_CHECKS.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.step}
                    data-accuracy-check
                    className="relative overflow-hidden rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] transition hover:border-primary/35"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-display text-3xl font-bold tracking-tight text-primary">
                        {item.step}
                      </p>
                      <Icon
                        className="h-10 w-10 shrink-0 text-primary/20"
                        aria-hidden
                      />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {item.body}
                    </p>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-2xl bg-primary px-5 py-5 text-primary-foreground shadow-[var(--shadow-card)] sm:px-7 sm:py-6">
          <ShieldCheck
            className="pointer-events-none absolute -right-6 -bottom-8 h-40 w-40 text-primary-foreground/15"
            aria-hidden
          />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/15">
              <ShieldCheck className="h-6 w-6" aria-hidden />
            </span>
            <p className="text-sm leading-relaxed sm:text-base">
              <span className="mr-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                99.7%
              </span>
              Lower bounce rates, higher inbox placement, and a protected
              sender reputation — backed by our deliverability guarantee.
            </p>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        className="bg-background"
        ariaLabelledBy="validate-result-heading"
      >
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2
              id="validate-result-heading"
              className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
            >
              Verification status results you can act on
            </h2>
            <p className="mt-4 text-ink-muted">
              Read the verification status results before you send
            </p>
          </div>
          <Reveal>
            <div className="overflow-x-auto rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]">
              <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Email verifier status meanings and practical handling
                </caption>
                <thead>
                  <tr className="border-b border-line bg-surface-muted">
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-muted"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-muted"
                    >
                      What it means here
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-muted"
                    >
                      Practical handling
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {STATUS_GUIDE.map((row) => (
                    <tr
                      key={row.status}
                      className="border-b border-line last:border-b-0"
                    >
                      <th
                        scope="row"
                        className="whitespace-nowrap px-4 py-3.5 align-top font-medium text-ink"
                      >
                        <StatusChip
                          label={row.status}
                          variant={row.variant}
                          className="font-mono"
                        />
                      </th>
                      <td className="px-4 py-3.5 align-top leading-relaxed text-ink-muted">
                        {row.means}
                      </td>
                      <td className="px-4 py-3.5 align-top leading-relaxed text-ink-muted">
                        {row.handling}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      <WhyUsTable
        className="bg-background"
        title="Why this free email verifier"
        intro="Built for marketers and builders who want clear statuses and honest credits."
        rows={[...WHY_ROWS]}
      />

      <NextPaths />

      <LandingFaq
        className="bg-background"
        title="Email verifier FAQs"
        items={VALIDATE_EMAIL_FAQS}
      />

      <CTA />
    </main>
  );
}
