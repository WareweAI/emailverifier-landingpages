import type { FaqItem } from "@/lib/homepage-faq";

export const INTEGRATIONS_FAQS: FaqItem[] = [
  {
    question: "Which import sources does the email verifier support?",
    answer:
      "In the dashboard you can import lists from Google Drive, OneDrive, Dropbox, and Airtable, or upload CSV, TXT, and XLSX files directly.",
  },
  {
    question: "Do HubSpot and Salesforce imports work?",
    answer:
      "HubSpot and Salesforce appear as import options in the product UI for connected workflows. Use them when available in your account, or export a CSV and upload it to the bulk email verifier.",
  },
  {
    question: "Is there a separate integration fee?",
    answer:
      "No. Imports use the same verification credits as manual uploads and the email verification API. Credits never expire.",
  },
  {
    question: "Can I verify at signup without a CRM import?",
    answer:
      "Yes. Use the email verification API to email verify addresses in real time at form submit — same credit balance as bulk.",
  },
  {
    question: "What about Zapier, webhooks, or MCP?",
    answer:
      "This page documents import sources and the HTTPS API that ship today. Do not assume additional connectors unless they appear in your dashboard.",
  },
];
