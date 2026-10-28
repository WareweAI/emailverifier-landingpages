import FindEmailsPage, {
  FIND_EMAILS_FAQS,
} from "@/Components/find/FindEmailsPage";
import JsonLd, {
  breadcrumbJsonLd,
  faqPageJsonLd,
  organizationJsonLd,
} from "@/Components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Find Emails — Work Addresses Checked by an Email Verifier",
  description:
    "Find emails by name, company, or LinkedIn, then email verify each match. Bulk CSV finder on the same credits as the email verifier. Not charged when nothing is found.",
  path: "/find-emails",
  imageAlt:
    "Email verifier find-emails search by name and company with example results",
});

export default function Page() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Find Emails", path: "/find-emails" },
        ])}
      />
      <JsonLd data={faqPageJsonLd([...FIND_EMAILS_FAQS])} />
      <FindEmailsPage />
    </>
  );
}
