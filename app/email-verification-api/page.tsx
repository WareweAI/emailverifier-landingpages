import Link from "next/link";
import ApiSnippet from "@/Components/ui/ApiSnippet";
import { Button } from "@/Components/ui/Button";
import { HeroWash } from "@/Components/ui/HeroWash";
import JsonLd from "@/Components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { REGISTER_URL } from "@/lib/api-snippet";

export const metadata = buildMetadata({
  title: "Email Verification API — Real-Time Email Verifier",
  description:
    "Email verification API powered by the same email verifier credits as bulk. Verify signups in real time with curl and Node examples.",
  path: "/email-verification-api",
  imageAlt: "Email verification API request and response for real-time checks",
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
      <main className="relative flex-1">
        <section className="relative px-4 pt-16 pb-16 sm:px-6 lg:px-8 lg:pt-24 lg:pb-24">
          <HeroWash />
          <div className="relative z-10 mx-auto max-w-4xl">
            <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">
              Email verification API for real-time checks
            </h1>
            <p className="mt-4 text-lg text-ink-muted">
              Use this email verifier at signup: block disposable, catch-all,
              and role-based addresses before they enter your database. The
              email verification API uses the same credits as our bulk email
              verifier.
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

            <h2 className="mt-12 font-display text-2xl font-semibold tracking-tight text-ink">
              Call the email verification API
            </h2>
            <p className="mt-3 text-ink-muted">
              Copy a request, get statuses back. No separate SDK required.
            </p>
            <div className="mt-6">
              <ApiSnippet showCtas={false} />
            </div>

            <p className="mt-6 text-ink-muted">
              Need to email verify a full CSV instead?{" "}
              <Link
                href="/bulk-email-verifier"
                className="font-medium text-primary hover:underline"
              >
                See the bulk email verifier
              </Link>
              {" · "}
              <Link
                href="/pricing"
                className="font-medium text-primary hover:underline"
              >
                See pricing
              </Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
