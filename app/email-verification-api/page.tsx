import Link from "next/link";
import ApiSnippet from "@/Components/ui/ApiSnippet";
import { Button } from "@/Components/ui/Button";
import JsonLd from "@/Components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { REGISTER_URL } from "@/lib/api-snippet";

export const metadata = buildMetadata({
  title: "Email Verification API — Real-Time Validation",
  description:
    "Verify signups in real time with the EmailVerifier.io API. Same credits as bulk. curl and Node examples included.",
  path: "/email-verification-api",
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
      name: "Email Verification API",
      item: "https://emailverifier.io/email-verification-api",
    },
  ],
};

export default function EmailVerificationApiPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <main className="mx-auto max-w-4xl flex-1 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">
          Email verification API
        </h1>
        <p className="mt-4 text-lg text-ink-muted">
          Verify at signup in real time. Block disposable, catch-all, and
          role-based addresses before they enter your database.
        </p>

        <div className="mt-8">
          <Button asChild size="lg">
            <Link
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ev-event="cta_register_click"
            >
              Get API key
            </Link>
          </Button>
        </div>

        <div className="mt-10">
          <ApiSnippet showCtas={false} />
        </div>

        <p className="mt-6 text-ink-muted">
          API uses the same credits as bulk verification.{" "}
          <Link href="/pricing" className="font-medium text-primary hover:underline">
            See pricing
          </Link>
        </p>
      </main>
    </>
  );
}
