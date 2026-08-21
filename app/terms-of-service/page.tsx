import { HeroWash } from "@/Components/ui/HeroWash";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Terms & Conditions — Email Verifier",
  description:
    "Terms and conditions for using our email verifier website and services, including accounts, acceptable use, and liability.",
  path: "/terms-of-service",
  imageAlt: "Email verifier terms and conditions",
});

export default function TermsPage() {
  return (
    <main
      id="terms-main-content"
      role="main"
      aria-labelledby="terms-heading"
      className="relative grow bg-surface text-ink"
    >
      <header className="relative px-6 pt-16 pb-8">
        <HeroWash />
        <div className="relative z-10 mx-auto max-w-4xl">
          <h1
            id="terms-heading"
            className="mb-4 font-display text-4xl font-bold tracking-tight text-ink"
          >
            Email Verifier Terms & Conditions
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
          aria-label="Terms and conditions"
          role="region"
        >
          <p>
            Welcome to our <strong>email verifier</strong>. These Terms &amp;
            Conditions outline the rules and regulations for using our website
            and services. By accessing or using our platform, you accept these
            terms in full. If you disagree with any part of these terms, please
            do not use our service.
          </p>

          <h2 id="use-of-services" className="mt-8 mb-3 text-2xl font-semibold">
            1. Use of Email Verifier Services
          </h2>
          <p>
            You agree to use our services only for lawful purposes and in
            accordance with these Terms. You must not misuse our platform,
            attempt unauthorized access, or interfere with its functionality in
            any way.
          </p>

          <h2 id="accounts" className="mt-8 mb-3 text-2xl font-semibold">
            2. Accounts
          </h2>
          <p>
            To access certain features, you may be required to create an
            account. You are responsible for maintaining the confidentiality of
            your login credentials and for all activities under your account.
          </p>

          <h2
            id="intellectual-property"
            className="mt-8 mb-3 text-2xl font-semibold"
          >
            3. Intellectual Property
          </h2>
          <p>
            All content, trademarks, and materials on this website are the
            property of Email Verifier or its licensors. You may not copy,
            modify, or redistribute any part of the site without prior written
            consent.
          </p>

          <h2
            id="limitation-of-liability"
            className="mt-8 mb-3 text-2xl font-semibold"
          >
            4. Limitation of Liability
          </h2>
          <p>
            We are not responsible for any damages resulting from your use or
            inability to use our services. All services are provided “as is”
            without any warranties, express or implied.
          </p>

          <h2 id="termination" className="mt-8 mb-3 text-2xl font-semibold">
            5. Termination
          </h2>
          <p>
            We reserve the right to suspend or terminate your access to our
            services at any time, without prior notice, if we believe you have
            violated these Terms.
          </p>

          <h2 id="governing-law" className="mt-8 mb-3 text-2xl font-semibold">
            6. Governing Law
          </h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of India.
          </p>

          <h2 id="contact-us" className="mt-8 mb-3 text-2xl font-semibold">
            7. Contact Us
          </h2>
          <address className="not-italic">
            If you have any questions about these Terms, please contact us at{" "}
            <a
              href="mailto:support@emailverifier.io"
              className="text-primary underline"
              aria-label="Email support at support at email verifier dot io"
            >
              support@emailverifier.io
            </a>
            .
          </address>
        </section>
      </div>
    </main>
  );
}
