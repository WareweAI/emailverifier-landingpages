import type { FaqItem } from "@/lib/homepage-faq";

export const VALIDATE_EMAIL_FAQS: FaqItem[] = [
  {
    question: "How many free checks do I get?",
    answer:
      "You can email verify 3 addresses on this page. Create a free account for 100 more credits — no credit card required.",
  },
  {
    question: "Does verification send an email?",
    answer:
      "No. We check syntax, domain/MX, mailbox availability, and risk flags without delivering mail to the inbox.",
  },
  {
    question: "What do the statuses mean?",
    answer:
      "Deliverable means the address looks safe to send. Risky covers catch-all, role-based, or uncertain mailboxes. Undeliverable means the address failed verification. Disposable and role-based flags call out temporary or generic inboxes.",
  },
  {
    question: "What happens to the email I check?",
    answer:
      "We follow GDPR and CCPA practices. Uploaded files are deleted 30 days after processing. See our Privacy Policy for details.",
  },
  {
    question: "How do I clean a full list?",
    answer:
      "Sign up for 100 free credits, then upload a CSV, TXT, or XLSX in the dashboard. Bulk and API use the same credits at $1.80 per 1,000 — credits never expire.",
  },
];
