export type FaqItem = {
  question: string;
  answer: string;
};

export const HOMEPAGE_FAQS: FaqItem[] = [
  {
    question: "What is an email verifier?",
    answer:
      "An email verifier checks whether an address is real, deliverable, and safe to send — without sending mail. EmailVerifier.io runs syntax, domain/MX, mailbox, disposable, catch-all, role-based, and spam-trap checks.",
  },
  {
    question: "Can I verify a bulk email list?",
    answer:
      "Yes. Upload a CSV, TXT, or XLSX file and download statuses for every address. Bulk verification uses the same credits as single checks.",
  },
  {
    question: "Do you offer an email verification API?",
    answer:
      "Yes. The real-time API uses the same credits as bulk verification.",
  },
  {
    question: "How much does email verification cost?",
    answer:
      "Pay-as-you-go credits are $1.80 per 1,000 emails. You choose your volume — 10K costs $18.00. Credits never expire.",
  },
  {
    question: "Do credits expire?",
    answer:
      "No. Seasonal one-time credits never expire. Use them today, next month, or next year.",
  },
  {
    question: "Is EmailVerifier.io GDPR compliant?",
    answer:
      "We follow GDPR and CCPA practices. Uploaded files are deleted 30 days after processing. See our Privacy Policy for details.",
  },
];
