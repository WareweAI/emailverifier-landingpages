export type FaqItem = {
  question: string;
  answer: string;
};

export const HOMEPAGE_FAQS: FaqItem[] = [
  {
    question: "How do I verify an email address online?",
    answer:
      "Enter the address into an email verifier and run the check. A good verifier confirms the syntax, checks that the domain exists and publishes MX records, flags disposable, role-based and catch-all addresses, and then asks the receiving mail server whether the mailbox exists. On EmailVerifier.io you can run the first checks free on this page with no sign-up, and the mailbox-level SMTP check in the full app with 100 free credits.",
  },
  {
    question:
      "How do I remove catch-all, disposable and invalid emails to lower bounce rate?",
    answer:
      "Upload your list to a bulk email verifier, delete every address marked invalid, remove disposable addresses and spam traps, and move catch-all and role-based addresses into a separate, lower-volume segment. Re-check unknown results later, then add real-time validation to your signup forms so new bad addresses never enter the list.",
  },
  {
    question: "What is an email verifier?",
    answer:
      "An email verifier is a tool that checks whether an email address is real, correctly formatted and able to receive mail, without sending a message to it. It returns a status such as safe, invalid, risky or unknown so you can decide whether to send.",
  },
  {
    question: "Does email verification send an email to the address?",
    answer:
      "No. Verification checks the address format, the domain's DNS and MX records and, in the full app, the mail server's response to a mailbox query. No message is ever delivered to the recipient.",
  },
  {
    question:
      "What is the difference between email verification and email validation?",
    answer:
      "The terms are often used interchangeably. Validation usually means checking that an address is correctly formed and that its domain can receive mail. Verification goes one step further and confirms that the specific mailbox exists. EmailVerifier.io does both.",
  },
  {
    question: "Is EmailVerifier.io free?",
    answer:
      "The single-email checker on this page is free to use without an account. New users also get 100 free verification credits after sign-up, with no credit card needed. After that, pay-as-you-go credits start at $1.80 per 1,000 and never expire.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Yes. EmailVerifier.io is GDPR and CCPA compliant. Verified lists are kept for 30 days so you can download them, then they are deleted automatically.",
  },
];
