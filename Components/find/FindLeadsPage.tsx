import Link from "next/link";
import { FindLeadsMockup } from "@/Components/home/feature-pillars/PillarMockups";
import { FinderChecks, FinderCtas, FinderFaq } from "@/Components/find/FinderPageParts";
import { HeroWash } from "@/Components/ui/HeroWash";
import { SectionShell } from "@/Components/ui/SectionShell";

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
    title: "Save the list",
    body: "Filter the results, save the lead list, and keep only the rows you want to email.",
  },
] as const;

const FAQS = [
  {
    question: "What can I search?",
    answer:
      "A plain-language brief for people or companies. Local search is marked Soon and is not available yet.",
  },
  {
    question: "What if a lead has no email?",
    answer:
      "You are not charged for that row. Credits are spent when an address comes back, on the same balance as the email verifier.",
  },
  {
    question: "Do lead searches use the same credits?",
    answer:
      "Yes. Search Leads and lead lists are included with credit packs. The entry rate is $1.80 per 1,000 at the 25,000-credit pack, and credits never expire.",
  },
] as const;

export const FIND_LEADS_FAQS = FAQS;

export default function FindLeadsPage() {
  return (
    <main id="main-page" className="relative flex-1">
      <section
        className="relative px-4 pt-12 pb-16 sm:px-6 lg:px-20 lg:pt-16 lg:pb-20"
        aria-labelledby="find-leads-heading"
      >
        <HeroWash />
        <div className="relative z-10 mx-auto grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            <p className="text-sm font-medium text-ink-muted">Find Leads</p>
            <h1
              id="find-leads-heading"
              className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink lg:text-5xl"
            >
              Find leads the email verifier can keep
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              Search Leads is the other side of the email verifier. You write a
              plain-language brief — who you want, and at what kind of company —
              and get people or companies back. Person and company search are
              available now. Local search is marked Soon and is not live yet.
              When a row includes an email, you can email verify it on the same
              credits as the bulk email verifier. If no email is found, that row
              is not charged. Filter the list, save it, and take the contacts
              you want into outreach. 100 free credits on signup, no card.
            </p>
            <FinderCtas loc="find-leads-hero" />
            <FinderChecks
              items={[
                "Person or company",
                "Plain-language brief",
                "Lead lists you can save",
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
      </section>

      <SectionShell
        className="bg-surface-muted"
        ariaLabelledBy="find-leads-how-heading"
      >
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2
              id="find-leads-how-heading"
              className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
            >
              How Search Leads sits next to the email verifier
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
        </div>
      </SectionShell>

      <SectionShell ariaLabelledBy="find-leads-faq-heading">
        <h2
          id="find-leads-faq-heading"
          className="text-center font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
        >
          Find Leads questions
        </h2>
        <FinderFaq id="find-leads-faq" items={FAQS} />
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-ink-muted">
          Already have a name and a domain?{" "}
          <Link href="/find-emails" className="font-medium text-ink underline-offset-2 hover:underline">
            Find emails
          </Link>
          . Already have the addresses?{" "}
          <Link href="/bulk-email-verifier" className="font-medium text-ink underline-offset-2 hover:underline">
            Clean the list
          </Link>
          .
        </p>
      </SectionShell>
    </main>
  );
}
