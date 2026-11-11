import ValidateEmailProductPage from "@/Components/validate/ValidateEmailProductPage";
import JsonLd, {
  breadcrumbJsonLd,
  faqPageJsonLd,
  organizationJsonLd,
} from "@/Components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { VALIDATE_EMAIL_FAQS } from "@/lib/validate-email-faq";

export const metadata = buildMetadata({
  title: "Free Email Validator and Checker | EmailVerifier.io",
  description:
    "Free email verifier: check if an address is deliverable, risky, or invalid. Syntax, domain, mailbox, and risk flags — without sending mail. 3 free checks, 100 more on signup.",
  path: "/validate-email",
  imageAlt: "Free email verifier checking deliverability without sending mail",
});

export default function ValidateEmailPage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Free Email Verifier", path: "/validate-email" },
        ])}
      />
      <JsonLd data={faqPageJsonLd([...VALIDATE_EMAIL_FAQS])} />
      <ValidateEmailProductPage />
    </>
  );
}
