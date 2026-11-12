import type { FaqItem } from "@/lib/homepage-faq";

export const DATA_ENRICHMENT_FAQS: FaqItem[] = [
  {
    question: "What does data enrichment mean here?",
    answer:
      "You upload a CSV of names and company domains (optional role or company fields). We attach verified work emails to rows that match, then you download the completed task. Enrichment fields stay optional.",
  },
  {
    question: "Am I charged for rows with no match?",
    answer:
      "No. Rows that return nothing are not charged. You only spend credits on addresses that come back.",
  },
  {
    question: "Does enrichment use separate pricing?",
    answer:
      "No. Bulk find / data enrichment uses the same credits as the email verifier, Find Emails, Find Leads, and the email verification API. Credits never expire. The entry rate is $1.80 per 1,000 at the 25,000-credit pack.",
  },
  {
    question: "How is this different from Find Emails?",
    answer:
      "Find Emails is for one-off lookups (name + company or LinkedIn). Data enrichment is the CSV bulk path when you already have a list of people to fill in.",
  },
  {
    question: "What if I already have email addresses?",
    answer:
      "Skip enrichment and use the bulk email verifier to email verify every row before you send.",
  },
];
