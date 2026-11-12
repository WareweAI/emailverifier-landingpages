import DataEnrichmentProductPage from "@/Components/find/DataEnrichmentProductPage";
import JsonLd, {
  breadcrumbJsonLd,
  faqPageJsonLd,
  organizationJsonLd,
} from "@/Components/seo/JsonLd";
import { DATA_ENRICHMENT_FAQS } from "@/lib/data-enrichment-faq";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Data Enrichment — Bulk Find Emails with an Email Verifier",
  description:
    "Data enrichment for B2B lists: upload names and domains, attach verified work emails, and email verify matches on the same credits as the bulk email verifier. Not charged when nothing is found.",
  path: "/data-enrichment",
  imageAlt:
    "Data enrichment bulk find with verified email results from an email verifier",
});

export default function Page() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Data Enrichment", path: "/data-enrichment" },
        ])}
      />
      <JsonLd data={faqPageJsonLd([...DATA_ENRICHMENT_FAQS])} />
      <DataEnrichmentProductPage />
    </>
  );
}
