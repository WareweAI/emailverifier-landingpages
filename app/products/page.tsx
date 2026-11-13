import ProductsHubPage from "@/Components/products/ProductsHubPage";
import JsonLd, {
  breadcrumbJsonLd,
  itemListJsonLd,
  organizationJsonLd,
  softwareApplicationJsonLd,
} from "@/Components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { PRODUCTS_ITEM_LIST } from "@/lib/products-item-list";

export const metadata = buildMetadata({
  title:
    "Products | EmailVerifier.io: Email Verification & Lead Generation Tools",
  description:
    "Explore EmailVerifier.io products: email validator, bulk verifier, validation API, email finder, lead finder and data enrichment. 100 free credits.",
  path: "/products",
  imageAlt:
    "EmailVerifier.io products hub — email verifier, bulk cleaning, API, and lead tools",
});

export default function Page() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={softwareApplicationJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(PRODUCTS_ITEM_LIST, {
          name: "EmailVerifier.io Products",
          description:
            "Email verifier, bulk email verifier, email verification API, email finder, lead finder, and data enrichment.",
        })}
      />
      <ProductsHubPage />
    </>
  );
}
