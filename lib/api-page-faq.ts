import type { FaqItem } from "@/lib/homepage-faq";

export const API_PAGE_FAQS: FaqItem[] = [
  {
    question: "Is the email verification API separate from bulk credits?",
    answer:
      "No. Real-time API checks use the same credit balance as bulk verification, single checks, Find Emails, and Find Leads. Credits never expire.",
  },
  {
    question: "What does a response include?",
    answer:
      "Responses include status, overall score, deliverability, and risk flags such as catch-all, disposable, and role-based — the same signals you see in the dashboard.",
  },
  {
    question: "Do I need an SDK?",
    answer:
      "No. Call the HTTPS endpoint with your API key from curl, Node, or any HTTP client. Register to create a key — there is no fake key generator on this site.",
  },
  {
    question: "Where should I use the API?",
    answer:
      "At signup forms, CRM imports, enrichment pipelines, and any flow where you need to email verify before an address lands in your database.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Pay-once credits from $1.80 per 1,000 at the 25,000-credit pack. Larger packs cost less per email. Start with 100 free credits — no credit card.",
  },
];
