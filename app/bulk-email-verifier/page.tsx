import Link from "next/link";
import { Button } from "@/Components/ui/Button";
import JsonLd from "@/Components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Bulk Email Verifier — Clean CSV Lists from $1.80/1K",
  description:
    "Upload a CSV and download deliverability statuses. Bulk email verification at $1.80 per 1,000. Credits never expire.",
  path: "/bulk-email-verifier",
});

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://emailverifier.io",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Bulk Email Verifier",
      item: "https://emailverifier.io/bulk-email-verifier",
    },
  ],
};

export default function BulkEmailVerifierPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">
          Bulk email verifier
        </h1>
        <p className="mt-4 text-lg text-ink-muted">
          Export your list, upload CSV/TXT/XLSX, and download statuses for every
          address. Same $1.80 per 1,000 pricing — credits never expire.
        </p>

        <ol className="mt-8 space-y-4 text-ink-muted">
          <li>
            <strong className="text-ink">1. Export</strong> — pull emails from
            your CRM or spreadsheet.
          </li>
          <li>
            <strong className="text-ink">2. Upload</strong> — drop your file in
            the dashboard.
          </li>
          <li>
            <strong className="text-ink">3. Download</strong> — get deliverable,
            risky, and undeliverable results.
          </li>
        </ol>

        <p className="mt-8 rounded-xl bg-primary-soft px-4 py-3 text-ink">
          10,000 emails = <strong>$18.00</strong>
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link
              href="https://app.emailverifier.io/register"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get 100 free credits
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/pricing">See pricing</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/email-verification-api">Need real-time API instead?</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
