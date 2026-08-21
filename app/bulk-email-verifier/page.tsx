import Link from "next/link";
import { Button } from "@/Components/ui/Button";
import { HeroWash } from "@/Components/ui/HeroWash";
import JsonLd from "@/Components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Bulk Email Verifier — Clean CSV Lists from $1.80/1K",
  description:
    "Bulk email verifier for CSV lists: upload a file and download deliverability statuses. $1.80 per 1,000 — credits never expire. Same credits as the email verification API.",
  path: "/bulk-email-verifier",
  imageAlt: "Bulk email verifier CSV upload with deliverability status results",
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
      <main className="relative flex-1">
        <section className="relative px-4 pt-16 pb-16 sm:px-6 lg:px-8 lg:pt-24 lg:pb-24">
          <HeroWash />
          <div className="relative z-10 mx-auto max-w-3xl">
            <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">
              Bulk email verifier
            </h1>
            <p className="mt-4 text-lg text-ink-muted">
              Use this email verifier to clean an entire list: export from your
              CRM, upload CSV/TXT/XLSX, and download statuses for every address.
              Same $1.80 per 1,000 pricing — credits never expire.
            </p>

            <h2 className="mt-10 font-display text-2xl font-semibold tracking-tight text-ink">
              How to email verify a full list
            </h2>
            <ol className="mt-4 space-y-4 text-ink-muted">
              <li>
                <strong className="text-ink">1. Export</strong> — pull emails
                from your CRM or spreadsheet.
              </li>
              <li>
                <strong className="text-ink">2. Upload</strong> — drop your file
                in the dashboard.
              </li>
              <li>
                <strong className="text-ink">3. Download</strong> — get
                deliverable, risky, and undeliverable results.
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
                <Link href="/email-verification-api">
                  Prefer the email verification API?
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
