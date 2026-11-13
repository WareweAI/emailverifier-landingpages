/** Serializable product catalog for JSON-LD ItemList (server-safe). */
export const PRODUCTS_ITEM_LIST = [
  {
    name: "Email Validator",
    path: "/validate-email",
    description:
      "Verify any email address for free in seconds before you send — without delivering a message to the inbox.",
  },
  {
    name: "Bulk Email Verifier",
    path: "/bulk-email-verifier",
    description:
      "Clean CSV lists or import directly from your Drive and CRM — valid, invalid, catch-all, role, and disposable statuses out.",
  },
  {
    name: "Email Validation API",
    path: "/email-verification-api",
    description:
      "Real-time checks for signups, forms, CRMs, and other applications on the same credits as bulk.",
  },
  {
    name: "Email Finder",
    path: "/email-finder",
    description:
      "Find verified emails by name, company, or LinkedIn profile — free if no email is found.",
  },
  {
    name: "Lead Finder",
    path: "/find-leads",
    description:
      "Discover enriched B2B leads tailored to your ICP with AI — then verify before you send.",
  },
  {
    name: "Data Enrichment",
    path: "/data-enrichment",
    description:
      "Enrich lists in bulk with verified emails, roles, and company data on one credit balance.",
  },
] as const;
