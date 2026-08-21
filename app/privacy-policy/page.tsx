import { HeroWash } from "@/Components/ui/HeroWash";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Privacy Policy — Email Verifier",
  description:
    "Privacy policy for our email verifier: how we collect, use, and protect personal information. Uploaded files are deleted 30 days after processing.",
  path: "/privacy-policy",
  imageAlt: "Email verifier privacy policy",
});

export default function PrivacyPage() {
  return (
    <main
      className="relative grow bg-surface text-ink"
      id="privacy-main-content"
      role="main"
      aria-labelledby="privacy-heading"
    >
      <header className="relative px-6 pt-16 pb-8">
        <HeroWash />
        <div className="relative z-10 mx-auto max-w-4xl">
          <h1
            id="privacy-heading"
            className="mb-4 font-display text-4xl font-bold tracking-tight text-ink"
          >
            Email Verifier Privacy Policy
          </h1>
          <p className="text-ink-muted">
            Last updated:&nbsp;
            <time dateTime="2025-10-23" className="not-italic">
              October 23, 2025
            </time>
          </p>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-16">
        <section
          className="space-y-6 leading-relaxed"
          aria-label="Privacy policy content"
          role="region"
        >
          <p>
            This Privacy Policy explains how our <strong>email verifier</strong>{" "}
            collects, uses, and protects your personal information when you use
            our website and services. By accessing or using our platform, you
            agree to the terms described here.
          </p>

          <h2
            id="information-we-collect"
            className="mt-8 mb-3 text-2xl font-semibold"
          >
            1. Information Our Email Verifier Collects
          </h2>
          <p>
            We may collect information you provide directly, such as your email
            address, name, and contact details when you create an account or
            contact support. Additionally, we automatically collect certain
            information such as IP addresses, browser type, and device
            identifiers for analytics and performance monitoring.
          </p>

          <h2
            id="how-we-use-information"
            className="mt-8 mb-3 text-2xl font-semibold"
          >
            2. How We Use Information
          </h2>
          <p>
            The information we collect is used to provide, improve, and
            personalize our services. We may use your data to send
            service-related updates, respond to inquiries, and ensure compliance
            with our terms and policies.
          </p>

          <h2 id="data-security" className="mt-8 mb-3 text-2xl font-semibold">
            3. Data Security
          </h2>
          <p>
            We implement reasonable security measures to protect your personal
            data from unauthorized access or disclosure. However, please note
            that no method of transmission over the internet is 100% secure.
          </p>

          <h2 id="your-rights" className="mt-8 mb-3 text-2xl font-semibold">
            4. Your Rights
          </h2>
          <p>
            You have the right to access, update, or delete your information.
            You can contact us at{" "}
            <a
              href="mailto:support@emailverifier.io"
              aria-label="Email support at support at email verifier dot io"
              className="text-primary underline"
            >
              support@emailverifier.io
            </a>{" "}
            to make a request regarding your data.
          </p>

          <h2
            id="changes-to-this-policy"
            className="mt-8 mb-3 text-2xl font-semibold"
          >
            5. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated revision date. We
            encourage you to review it periodically.
          </p>
        </section>
      </div>
    </main>
  );
}
