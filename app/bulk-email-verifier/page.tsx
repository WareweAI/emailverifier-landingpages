import BulkProductPage from "@/Components/bulk/BulkProductPage";
import JsonLd, {
  organizationJsonLd,
  softwareApplicationJsonLd,
} from "@/Components/seo/JsonLd";
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
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={softwareApplicationJsonLd()} />
      <JsonLd data={breadcrumbJsonLd} />
      <BulkProductPage />
    </>
  );
}
