import FindLeadsPage, { FIND_LEADS_FAQS } from "@/Components/find/FindLeadsPage";
import JsonLd, {
  breadcrumbJsonLd,
  faqPageJsonLd,
  organizationJsonLd,
} from "@/Components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Find Leads — Search People and Companies with an Email Verifier",
  description:
    "Turn a plain-language brief into people or companies, then email verify the addresses you keep. Person and company search on the same email verifier credits.",
  path: "/find-leads",
  imageAlt:
    "Email verifier lead search with an example person list and email results",
});

export default function Page() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Find Leads", path: "/find-leads" },
        ])}
      />
      <JsonLd data={faqPageJsonLd([...FIND_LEADS_FAQS])} />
      <FindLeadsPage />
    </>
  );
}
