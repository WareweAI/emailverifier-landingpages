import type { FaqItem } from "@/lib/homepage-faq";

export const BULK_PAGE_FAQS: FaqItem[] = [
  {
    question: "How do I verify a bulk email list?",
    answer:
      "Export your contacts as CSV, TXT, or Excel (or import from Google Sheets, HubSpot, or Salesforce). Upload the file to the bulk email verifier, run the job, then review statuses — valid, invalid, catch-all, role-based, disposable, syntax errors, and spam traps. Download the clean rows you will send. Sign up for 100 free credits with no credit card.",
  },
  {
    question: "What file types does the bulk email verifier accept?",
    answer:
      "Upload CSV, TXT, or XLSX. You can also import from Google Drive, OneDrive, Dropbox, or Airtable in the dashboard, and sync from Google Sheets, HubSpot, or Salesforce when connected.",
  },
  {
    question: "What statuses do I get back?",
    answer:
      "Every row maps to deliverability outcomes such as valid, invalid, catch-all, role-based, disposable, syntax error, and spam-trap flags — without sending mail.",
  },
  {
    question: "Does bulk use different credits than the API?",
    answer:
      "No. Bulk email verifier jobs use the same credits as single checks and the email verification API. Credits never expire.",
  },
  {
    question: "How much does list cleaning cost?",
    answer:
      "Pay-as-you-go packs start at $1.80 per 1,000 at the 25,000-credit pack ($45). Larger monthly volumes cost less per email. Sign up for 100 free credits — no credit card.",
  },
  {
    question: "What happens to my uploaded file?",
    answer:
      "We follow GDPR and CCPA practices. Uploaded files are deleted 30 days after processing. See our Privacy Policy for details.",
  },
];
