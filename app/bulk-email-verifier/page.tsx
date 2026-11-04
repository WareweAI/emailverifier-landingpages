import BulkProductPage from "@/Components/bulk/BulkProductPage";
import JsonLd, {
  breadcrumbJsonLd,
  faqPageJsonLd,
  organizationJsonLd,
  softwareApplicationJsonLd,
} from "@/Components/seo/JsonLd";
import { BULK_PAGE_FAQS } from "@/lib/bulk-page-faq";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Bulk Email Verifier — Clean CSV Lists from $1.80/1K",
  description:
    "Bulk email verifier for CSV lists: upload a file and download deliverability statuses. $1.80 per 1,000 — credits never expire. Same credits as the email verification API.",
  path: "/bulk-email-verifier",
  imageAlt: "Bulk email verifier CSV upload with deliverability status results",
});

export default function BulkEmailVerifierPage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={softwareApplicationJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Bulk Email Verifier", path: "/bulk-email-verifier" },
        ])}
      />
      <JsonLd data={faqPageJsonLd([...BULK_PAGE_FAQS])} />
      <BulkProductPage />
    </>
  );
}
