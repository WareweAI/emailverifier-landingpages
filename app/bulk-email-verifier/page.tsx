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
  title: "Bulk Email Verifier & List Cleaning Service | EmailVerifier.io",
  description:
    "Bulk email verifier and list cleaning service: drag-and-drop CSV, TXT, or Excel, get valid, invalid, catch-all, role, disposable, and spam-trap statuses. $1.80 per 1,000 — credits never expire.",
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
          { name: "Products" },
          { name: "Bulk Email Verifier", path: "/bulk-email-verifier" },
        ])}
      />
      <JsonLd data={faqPageJsonLd([...BULK_PAGE_FAQS])} />
      <BulkProductPage />
    </>
  );
}
