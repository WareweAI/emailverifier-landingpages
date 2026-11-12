import FindEmailsPage from "@/Components/find/FindEmailsPage";
import JsonLd, {
  breadcrumbJsonLd,
  faqPageJsonLd,
  organizationJsonLd,
} from "@/Components/seo/JsonLd";
import { FIND_EMAILS_FAQS } from "@/lib/find-emails-faq";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title:
    "Email Finder Tool | Find Verified Business Emails by Name, Company or LinkedIn Profile",
  description:
    "Find emails by name, company, or LinkedIn, then email verify each match. Same credits as the bulk email verifier and data enrichment. Not charged when nothing is found.",
  path: "/email-finder",
  imageAlt:
    "Email finder tool searching verified business emails by name, company, or LinkedIn",
});

export default function Page() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products" },
          { name: "Email Finder", path: "/email-finder" },
        ])}
      />
      <JsonLd data={faqPageJsonLd([...FIND_EMAILS_FAQS])} />
      <FindEmailsPage />
    </>
  );
}
