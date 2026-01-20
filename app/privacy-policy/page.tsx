

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Email Verifier",
  description: "Read our privacy policy to understand how Email Verifier collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="grow bg-white px-6 py-16 text-gray-800"
      id="privacy-main-content" role="main" aria-labelledby="privacy-heading">


      <div className="max-w-4xl mx-auto">
        <h1 id="privacy-heading" className="text-4xl font-bold mb-4 text-gray-900">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-10 ">
          Last updated:&nbsp;<time dateTime="2025-10-23" className="not-italic">
            October 23, 2025
          </time>
        </p>

        <section className="space-y-6 leading-relaxed"
          aria-label="Privacy policy content" role="region">
          <p>
            This Privacy Policy explains how <strong>Email Verifier</strong> collects, uses,
            and protects your personal information when you use our website and services.
            By accessing or using our platform, you agree to the terms described here.
          </p>

          <h2 id="information-we-collect" className="text-2xl font-semibold mt-8 mb-3">1. Information We Collect</h2>
          <p>
            We may collect information you provide directly, such as your email address,
            name, and contact details when you create an account or contact support.
            Additionally, we automatically collect certain information such as IP addresses,
            browser type, and device identifiers for analytics and performance monitoring.
          </p>

          <h2 id="how-we-use-information" className="text-2xl font-semibold mt-8 mb-3">2. How We Use Information</h2>
          <p>
            The information we collect is used to provide, improve, and personalize our
            services. We may use your data to send service-related updates, respond to
            inquiries, and ensure compliance with our terms and policies.
          </p>

          <h2 id="data-security" className="text-2xl font-semibold mt-8 mb-3">3. Data Security</h2>
          <p>
            We implement reasonable security measures to protect your personal data from
            unauthorized access or disclosure. However, please note that no method of
            transmission over the internet is 100% secure.
          </p>

          <h2 id="your-rights" className="text-2xl font-semibold mt-8 mb-3">4. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your information. You can
            contact us at <a href="mailto:support@emailverifier.io"
              aria-label="Email support at support at email verifier dot io"
              className="text-blue-600 underline" >
              support@emailverifier.io</a> to make a request regarding your data.
          </p>

          <h2 id="changes-to-this-policy" className="text-2xl font-semibold mt-8 mb-3">5. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted
            on this page with an updated revision date. We encourage you to review it
            periodically.
          </p>
        </section>
      </div>
    </main>
  );
}
