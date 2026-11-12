import type { FaqItem } from "@/lib/homepage-faq";

export const FIND_EMAILS_FAQS: FaqItem[] = [
  {
    question: "Am I charged if no email is found?",
    answer:
      "No. A lookup that returns nothing is not charged. You only spend credits on addresses that come back.",
  },
  {
    question: "Does Find Emails use a separate price?",
    answer:
      "No. Find Emails uses the same credits as the bulk email verifier and the email verification API. Credits never expire. The entry rate is $1.80 per 1,000 at the 25,000-credit pack.",
  },
  {
    question: "Can I find emails from a spreadsheet?",
    answer:
      "Yes. Use the Data Enrichment page (CSV bulk find) to upload names and domains, then download the completed task. Enrichment fields stay optional.",
  },
  {
    question: "Can I find an email from LinkedIn?",
    answer:
      "Yes. Use the LinkedIn tab when you already have a profile URL, then keep only matches the email verifier accepts.",
  },
  {
    question: "What if I already have a list of addresses?",
    answer:
      "Skip Find Emails and use the bulk email verifier to email verify every row before you send.",
  },
];
