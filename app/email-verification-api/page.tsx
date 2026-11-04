import ApiProductPage from "@/Components/api/ApiProductPage";
import JsonLd, {
  breadcrumbJsonLd,
  faqPageJsonLd,
  organizationJsonLd,
  softwareApplicationJsonLd,
} from "@/Components/seo/JsonLd";
import { API_PAGE_FAQS } from "@/lib/api-page-faq";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Email Verification API — Real-Time Email Verifier",
  description:
    "Email verification API powered by the same email verifier credits as bulk. Block disposable, catch-all, and invalid addresses at signup. $1.80/1K, credits never expire.",
  path: "/email-verification-api",
  imageAlt: "Email verification API request and response for real-time checks",
});

export default function EmailVerificationApiPage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={softwareApplicationJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Email Verification API", path: "/email-verification-api" },
        ])}
      />
      <JsonLd data={faqPageJsonLd([...API_PAGE_FAQS])} />
      <ApiProductPage />
    </>
  );
}
