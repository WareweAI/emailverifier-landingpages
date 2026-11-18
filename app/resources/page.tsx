import ResourcesHubPage from "@/Components/resources/ResourcesHubPage";
import JsonLd, {
  breadcrumbJsonLd,
  itemListJsonLd,
  organizationJsonLd,
} from "@/Components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { RESOURCES_ITEM_LIST } from "@/lib/resources-item-list";

export const metadata = buildMetadata({
  title:
    "Resources | EmailVerifier.io: Guides, Integrations & Blog for Email Verification",
  description:
    "Explore EmailVerifier.io resources: email verifier guides, integrations for Drive and CRM, and the blog. Start with 100 free credits - no card.",
  path: "/resources",
  imageAlt:
    "EmailVerifier.io resources hub - guides, integrations, and blog for email verification",
});

export default function Page() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(RESOURCES_ITEM_LIST, {
          name: "EmailVerifier.io Resources",
          description:
            "Guides, integrations, and blog for list cleaning, deliverability, and the email verification API.",
        })}
      />
      <ResourcesHubPage />
    </>
  );
}
