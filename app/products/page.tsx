import ProductsHubPage from "@/Components/products/ProductsHubPage";
import JsonLd, {
  breadcrumbJsonLd,
  itemListJsonLd,
  organizationJsonLd,
} from "@/Components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { PRODUCTS_ITEM_LIST } from "@/lib/products-item-list";

export const metadata = buildMetadata({
  title:
    "Products | EmailVerifier.io: Email Verifier, Bulk Cleaning & Lead Tools",
  description:
    "Browse EmailVerifier.io products: email verifier, bulk email verifier, email verification API, email finder, lead finder, and data enrichment. 100 free credits.",
  path: "/products",
  imageAlt:
    "EmailVerifier.io products category - email verifier and lead generation tools",
});

export default function Page() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
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
