import IntegrationsPage from "@/Components/integrations/IntegrationsPage";
import JsonLd, {
  breadcrumbJsonLd,
  faqPageJsonLd,
  organizationJsonLd,
} from "@/Components/seo/JsonLd";
import { INTEGRATIONS_FAQS } from "@/lib/integrations-faq";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Integrations — Import Lists into the Email Verifier",
  description:
    "Connect Google Drive, OneDrive, Dropbox, or Airtable — or upload CSV — and email verify with the same credits as bulk and the email verification API.",
  path: "/integrations",
  imageAlt: "Email verifier integrations for Drive, Dropbox, Airtable, and CSV",
});

export default function Page() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Integrations", path: "/integrations" },
        ])}
      />
      <JsonLd data={faqPageJsonLd([...INTEGRATIONS_FAQS])} />
      <IntegrationsPage />
    </>
  );
}
