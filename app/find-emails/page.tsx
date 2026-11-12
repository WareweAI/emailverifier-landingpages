import FindEmailsPage from "@/Components/find/FindEmailsPage";
import JsonLd, {
  breadcrumbJsonLd,
  faqPageJsonLd,
  organizationJsonLd,
} from "@/Components/seo/JsonLd";
import { FIND_EMAILS_FAQS } from "@/lib/find-emails-faq";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Find Emails — Work Addresses Checked by an Email Verifier",
  description:
    "Find emails by name, company, or LinkedIn, then email verify each match. Same credits as the bulk email verifier and data enrichment. Not charged when nothing is found.",
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
          { name: "Email Finder", path: "/find-emails" },
        ])}
      />
      <JsonLd data={faqPageJsonLd([...FIND_EMAILS_FAQS])} />
      <FindEmailsPage />
    </>
  );
}
