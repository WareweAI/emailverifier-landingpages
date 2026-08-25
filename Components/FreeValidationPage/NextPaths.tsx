import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ApiSnippet from "@/Components/ui/ApiSnippet";
import { BulkPreview } from "@/Components/ui/BulkPreview";
import { SectionShell } from "@/Components/ui/SectionShell";

const PATHS = [
  {
    title: "Bulk email verifier",
    desc: "Upload CSV, TXT, or XLSX and download statuses for every address. Same credits as single checks.",
    href: "/bulk-email-verifier",
    cta: "See bulk email verifier",
    mockup: "bulk" as const,
  },
  {
    title: "Email verification API",
    desc: "Call the real-time email verification API to block disposable, catch-all, and role-based addresses before they enter your product.",
    href: "/email-verification-api",
    cta: "View API Docs",
    event: "api_docs_click",
    mockup: "api" as const,
  },
];

export default function NextPaths() {
  return (
    <SectionShell
      className="bg-linear-to-t from-primary-soft via-primary-soft via-55% to-surface"
      ariaLabelledBy="next-paths-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="next-paths-heading"
          className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
        >
          Email Validation for Every Use Case
        </h2>
        <p className="mt-3 text-ink-muted">
          Use the same credits for bulk list cleaning or real-time API
          verification.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2 md:items-stretch">
        {PATHS.map((path) => (
          <article
            key={path.href}
            className="flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)]"
          >
            {path.mockup === "bulk" ? (
              <div className="mb-5 h-64">
                <BulkPreview
                  compact
                  className="h-full overflow-hidden rounded-2xl border border-line bg-surface-muted shadow-none"
                />
              </div>
            ) : null}
            {path.mockup === "api" ? (
              <div className="mb-5 h-64">
                <ApiSnippet
                  showCtas={false}
                  showNote={false}
                  fillHeight
                />
              </div>
            ) : null}
            <h3 className="font-semibold tracking-tight text-ink lg:text-lg">
              {path.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
              {path.desc}
            </p>
            <Link
              href={path.href}
              className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:underline"
              data-ev-event={path.event}
            >
              {path.cta}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
