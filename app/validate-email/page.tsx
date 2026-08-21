import VerifierDemo from "@/Components/VerifierDemo";
import ProofBar from "@/Components/home/ProofBar";
import DashboardVerifyDemo from "@/Components/FreeValidationPage/DashboardVerifyDemo";
import WhyValidate from "@/Components/FreeValidationPage/WhyValidate";
import WhyChoose from "@/Components/FreeValidationPage/WhyChoose";
import MethodSection from "@/Components/home/MethodSection";
import NextPaths from "@/Components/FreeValidationPage/NextPaths";
import ValidateEmailFaq from "@/Components/FreeValidationPage/ValidateEmailFaq";
import CTA from "@/Components/CTA";
import JsonLd, {
  faqPageJsonLd,
  organizationJsonLd,
} from "@/Components/seo/JsonLd";
import { DesktopMockup } from "@/Components/ui/DesktopMockup";
import { HeroWash } from "@/Components/ui/HeroWash";
import { buildMetadata } from "@/lib/metadata";
import { VALIDATE_EMAIL_FAQS } from "@/lib/validate-email-faq";
import { CheckCircle2 } from "lucide-react";

export const metadata = buildMetadata({
  title: "Free Email Verifier — Check Deliverability Instantly",
  description:
    "Free email verifier: check if an address is deliverable, risky, or invalid. Syntax, domain, mailbox, and risk flags — without sending mail. 3 free checks, 100 more on signup.",
  path: "/validate-email",
  imageAlt: "Free email verifier checking deliverability without sending mail",
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
      name: "Free Email Verifier",
      item: "https://emailverifier.io/validate-email",
    },
  ],
};

export default function ValidateEmailPage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqPageJsonLd(VALIDATE_EMAIL_FAQS)} />

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
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium text-ink-muted">
                Free Email Verification Tool
              </p>
              <h1
                id="validate-email-heading"
                className="mt-5 font-display text-3xl font-semibold leading-snug tracking-tight text-ink sm:text-4xl lg:text-5xl"
              >
                Free Email Verifier Tool for{" "}
                <span className="relative inline-block pb-1">
                  accurate Email Validation
                  <svg
                    className="pointer-events-none absolute -bottom-0.5 left-0 h-3 w-full text-primary"
                    viewBox="0 0 220 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M3 8.5C28 4.2 52 11.8 78 7.4C104 3 128 11.2 156 6.8C178 3.6 198 9.4 217 5.2"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                Email verify deliverability, risk, and mailbox status — syntax,
                domain, and flags — without sending mail. Try 3 free checks,
                then get 100 more on signup.
              </p>
            </div>

            <div className="mx-auto mt-8 max-w-3xl md:mt-10">
              <DesktopMockup chromeLabel="Enter an email address to check its deliverability">
                <VerifierDemo variant="tool-page" location="validate-email" />
              </DesktopMockup>
            </div>
            <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-ink-muted">
                {(
                  [
                    "GDPR-ready",
                    "30-day deletion",
                    "No credit card",
                  ] as const
                ).map((label) => (
                  <li key={label} className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
                    {label}
                  </li>
                ))}
              </ul>
          </div>
        </section>
        <ProofBar />
        <WhyValidate />
        <DashboardVerifyDemo />
        <MethodSection />
        <WhyChoose />
        <NextPaths />
        <ValidateEmailFaq />
        <CTA />
      </main>
    </>
  );
}
