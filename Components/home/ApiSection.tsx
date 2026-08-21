import Link from "next/link";
import ApiSnippet from "@/Components/ui/ApiSnippet";
import { BulkPreview } from "@/Components/ui/BulkPreview";
import { Button } from "@/Components/ui/Button";
import { SectionShell } from "@/Components/ui/SectionShell";
import { REGISTER_URL } from "@/lib/api-snippet";

type ApiSectionProps = {
  /** Optional page-level heading above the API + bulk columns */
  sectionTitle?: string;
  title?: string;
};

export default function ApiSection({
  sectionTitle,
  title = "Email verification API for signups",
}: ApiSectionProps) {
  const ColumnHeading = sectionTitle ? "h3" : "h2";

  return (
    <SectionShell ariaLabelledBy={sectionTitle ? "api-use-case-heading" : undefined}>
      {sectionTitle ? (
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <h2
            id="api-use-case-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
          >
            {sectionTitle}
          </h2>
        </div>
      ) : null}

      <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-x-12 xl:gap-x-16">
        <article
          className="flex min-w-0 flex-col"
          aria-labelledby="api-section-heading"
        >
          <ColumnHeading
            id="api-section-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-4xl"
          >
            {title}
          </ColumnHeading>
          <p className="mt-3 text-ink-muted">
            Block fake addresses at the form. The API uses the same credits as
            bulk — one balance for lists and live checks.
          </p>
          <div className="mt-6 flex flex-1 flex-col">
            <ApiSnippet />
          </div>
        </article>

        <article
          className="flex min-w-0 flex-col lg:border-l lg:border-line lg:pl-12 xl:pl-16"
          aria-labelledby="bulk-section-heading"
        >
          <ColumnHeading
            id="bulk-section-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-4xl"
          >
            Bulk email verifier
          </ColumnHeading>
          <p className="mt-3 text-ink-muted">
            Upload a CSV and download statuses for every address. Same $1.80
            per 1,000 as the API — credits never expire.
          </p>
          <div className="mt-6">
            <BulkPreview />
          </div>
          <p className="mt-3 text-sm text-ink-muted">
            Upload CSV, TXT, or XLSX. Download valid, risky, and invalid results.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild size="md">
              <Link
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ev-event="cta_register_click"
              >
                Get 100 free credits
              </Link>
            </Button>
            <Button asChild variant="secondary" size="md">
              <Link href="/bulk-email-verifier">See bulk verifier</Link>
            </Button>
          </div>
        </article>
      </div>
    </SectionShell>
  );
}
