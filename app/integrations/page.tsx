import IntegrationsPage from "@/Components/integrations/IntegrationsPage";
import JsonLd, {
  breadcrumbJsonLd,
  faqPageJsonLd,
  organizationJsonLd,
} from "@/Components/seo/JsonLd";
import { INTEGRATIONS_FAQS } from "@/lib/integrations-faq";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title:
    "Integrations | EmailVerifier.io: Import Lists from Drive, OneDrive, HubSpot & More",
  description:
    "Import lists from Google Drive, OneDrive, Dropbox, Airtable, HubSpot and Salesforce, or use the API. Verify on the same credits from $1.80 per 1,000.",
  path: "/integrations",
  imageAlt:
    "Email verifier integrations for Drive, OneDrive, HubSpot, and CSV upload",
});

export default function Page() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Resources" },
          { name: "Integrations", path: "/integrations" },
        ])}
      />
      <JsonLd data={faqPageJsonLd([...INTEGRATIONS_FAQS])} />
      <IntegrationsPage />
    </>
  );
}
