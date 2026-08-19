import Link from "next/link";
import ApiSnippet from "@/Components/ui/ApiSnippet";
import { Button } from "@/Components/ui/Button";
import { SectionShell } from "@/Components/ui/SectionShell";
import { StatusChip } from "@/Components/ui/StatusChip";
import { REGISTER_URL } from "@/lib/api-snippet";
import { FileSpreadsheet } from "lucide-react";

const EXAMPLE_ROWS = [
  { email: "maya@studio.co", label: "Valid", variant: "success" as const },
  { email: "info@agency.io", label: "Role", variant: "warning" as const },
  { email: "bounce@old.host", label: "Invalid", variant: "danger" as const },
];

function BulkPreview() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]"
      aria-hidden
    >
      <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-muted px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <FileSpreadsheet className="h-4 w-4 shrink-0 text-primary" />
          <span className="truncate text-sm font-semibold text-ink">
            email_list.csv
          </span>
        </div>
        <span className="text-xs text-ink-muted">Example mix</span>
      </div>
      <div className="flex flex-wrap gap-2 px-4 py-3">
        <StatusChip label="Valid" variant="success" />
        <StatusChip label="Risky" variant="warning" />
        <StatusChip label="Invalid" variant="danger" />
      </div>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-t border-line bg-surface-muted text-xs text-ink-muted">
            <th className="px-4 py-2 font-medium">Email</th>
            <th className="px-4 py-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {EXAMPLE_ROWS.map((row) => (
            <tr key={row.email} className="border-t border-line">
              <td className="px-4 py-2.5 text-ink">{row.email}</td>
              <td className="px-4 py-2.5">
                <StatusChip label={row.label} variant={row.variant} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ApiSection() {
  return (
    <SectionShell>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-x-12 xl:gap-x-16">
        <article
          className="flex min-w-0 flex-col"
          aria-labelledby="api-section-heading"
        >
          <h2
            id="api-section-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-4xl"
          >
            Verify signups in real time
          </h2>
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
          <h2
            id="bulk-section-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-4xl"
          >
            Bulk email verifier
          </h2>
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
