import Link from "next/link";
import { FindEmailsMockup } from "@/Components/home/feature-pillars/PillarMockups";
import { FinderChecks, FinderCtas, FinderFaq } from "@/Components/find/FinderPageParts";
import { HeroWash } from "@/Components/ui/HeroWash";
import { SectionShell } from "@/Components/ui/SectionShell";

const STEPS = [
  {
    step: "1",
    title: "Look up one person",
    body: "Enter a name and company domain, or use the LinkedIn tab when you already have a profile.",
  },
  {
    step: "2",
    title: "Or upload a CSV",
    body: "Bulk find takes a file of names and domains and returns the rows that matched.",
  },
  {
    step: "3",
    title: "Keep what verifies",
    body: "Each match is checked before you download it. A row with no email is not charged.",
  },
] as const;

const FAQS = [
  {
    question: "Am I charged if no email is found?",
    answer:
      "No. A lookup that returns nothing is not charged. You only spend credits on addresses that come back.",
  },
  {
    question: "Does Find Emails use a separate price?",
    answer:
      "No. Find Emails uses the same credits as the bulk email verifier. Credits never expire. The entry rate is $1.80 per 1,000 at the 25,000-credit pack.",
  },
  {
    question: "Can I find emails from a spreadsheet?",
    answer:
      "Yes. Upload a CSV of names and domains, then download the completed task. Enrichment is optional.",
  },
] as const;

export const FIND_EMAILS_FAQS = FAQS;

export default function FindEmailsPage() {
  return (
    <main id="main-page" className="relative flex-1">
      <section
        className="relative px-4 pt-12 pb-16 sm:px-6 lg:px-20 lg:pt-16 lg:pb-20"
        aria-labelledby="find-emails-heading"
      >
        <HeroWash />
        <div className="relative z-10 mx-auto grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            <p className="text-sm font-medium text-ink-muted">Find Emails</p>
            <h1
              id="find-emails-heading"
              className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink lg:text-5xl"
            >
              Find work emails with the email verifier
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              The email verifier does more than clean a list you already have.
              Find Emails looks up a work address from a name and company, a
              LinkedIn profile, or a CSV of names and domains, then checks the
              match before you keep it. You email verify only what comes back.
              A row with no match is not charged, and enrichment stays optional.
              Lookups use the same credits as the bulk email verifier — $1.80
              per 1,000 at the 25,000-credit pack, and credits never expire.
              Start with 100 free credits. No card required.
            </p>
            <FinderCtas loc="find-emails-hero" />
            <FinderChecks
              items={[
                "Name and company",
                "LinkedIn",
                "CSV of names and domains",
                "Not charged when nothing is found",
              ]}
            />
          </div>
          <figure className="min-w-0">
            <figcaption className="mb-3 text-sm text-ink-muted">
              Example search and bulk task. Counts are illustrative.
            </figcaption>
            <FindEmailsMockup />
          </figure>
        </div>
      </section>

      <SectionShell
        id="bulk-find"
        className="bg-surface-muted"
        ariaLabelledBy="find-emails-how-heading"
      >
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2
              id="find-emails-how-heading"
              className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
            >
              How the email verifier checks a found address
            </h2>
            <ol className="mt-6 space-y-5">
              {STEPS.map((item) => (
                <li key={item.step} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {item.step}
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{item.title}</p>
                    <p className="mt-1 text-ink-muted">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)]">
            <p className="text-sm font-semibold text-ink">What a finished row looks like</p>
            <ul className="mt-4 divide-y divide-line text-sm">
              <li className="flex items-center justify-between gap-3 py-3">
                <span className="min-w-0 truncate font-medium text-ink">
                  alex.morgan@northpeak.io
                </span>
                <span className="shrink-0 rounded-full bg-success-soft px-2.5 py-1 text-xs font-semibold text-ink">
                  Safe to send
                </span>
              </li>
              <li className="flex items-center justify-between gap-3 py-3">
                <span className="text-ink-muted">No email found</span>
                <span className="shrink-0 text-xs font-medium text-ink-muted">
                  Not charged
                </span>
              </li>
            </ul>
            <p className="mt-2 text-xs text-ink-muted">
              Example rows, not a live lookup.
            </p>
          </div>
        </div>
      </SectionShell>

      <SectionShell ariaLabelledBy="find-emails-faq-heading">
        <h2
          id="find-emails-faq-heading"
          className="text-center font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
        >
          Find Emails questions
        </h2>
        <FinderFaq id="find-emails-faq" items={FAQS} />
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-ink-muted">
          Need a list you already have cleaned?{" "}
          <Link href="/bulk-email-verifier" className="font-medium text-ink underline-offset-2 hover:underline">
            Use the bulk email verifier
          </Link>
          . Building a list of people first?{" "}
          <Link href="/find-leads" className="font-medium text-ink underline-offset-2 hover:underline">
            Find leads
          </Link>
          .
        </p>
      </SectionShell>
    </main>
  );
}
