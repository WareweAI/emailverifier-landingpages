import type { FaqItem } from "@/lib/homepage-faq";
import {
  formatNameList,
  importSourceNames,
  integrationsByStatus,
} from "@/lib/integrations";

const availableImports = importSourceNames({ status: "available" });
const soonImports = importSourceNames({ status: "soon" });
const onRequest = integrationsByStatus("on-request").map((item) => item.name);

export const INTEGRATIONS_FAQS: FaqItem[] = [
  {
    question: "Which import sources does the email verifier support?",
    answer: [
      availableImports.length
        ? `Available today: ${formatNameList(availableImports)}, plus direct CSV, TXT, and XLSX upload.`
        : "Upload CSV, TXT, and XLSX files directly in the dashboard.",
      soonImports.length
        ? `${formatNameList(soonImports)} are marked Soon — use file export until those connectors ship.`
        : null,
      "Statuses on this page match the homepage import marks so they stay in sync.",
    ]
      .filter(Boolean)
      .join(" "),
  },
  {
    question: "Do HubSpot and Salesforce imports work?",
    answer: `${formatNameList(onRequest)} ${
      onRequest.length === 1 ? "is" : "are"
    } available as a connected import path when enabled for your account. Prefer a file? Export CSV and use the bulk email verifier.`,
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
