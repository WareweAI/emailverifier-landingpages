import type { FaqItem } from "@/lib/homepage-faq";

export const FIND_EMAILS_FAQS: FaqItem[] = [
  {
    question: "What is an email finder tool?",
    answer:
      "An email finder tool is B2B prospecting software that uncovers professional email addresses using a person's full name, company domain, or social profile. Unlike basic scraping tools that pull outdated addresses from old web pages, EmailVerifier.io combines live corporate email pattern matching (first.last@company.com) with real-time SMTP mailbox verification so every returned address is active and safe to contact.",
  },
  {
    question: "How do I find a person's email?",
    answer:
      "Enter the person's first and last name along with their company name or website domain into the lookup bar at the top of this page, or click our email finder Chrome extension while viewing their LinkedIn profile. Within seconds, EmailVerifier.io detects the company's email format, runs a silent live SMTP check, and returns their verified business email with a confidence score.",
  },
  {
    question: "Is there a free email finder?",
    answer:
      "Yes. You can test lookups directly on this page and claim 100 free credits on signup with no credit card required. Unfound or invalid lookups never cost you credits, and when you are ready to scale, Pay-As-You-Go packs start at $20 for 10,000 non-expiring credits.",
  },
  {
    question: "Is there such a thing as a free unlimited email finder?",
    answer:
      'Be cautious of browser plugins advertising a "free unlimited email finder." Those tools typically recycle scraped, unverified public lists filled with dead inboxes and honeypot spam traps that quickly get your sending domain blacklisted. EmailVerifier.io gives you free starter credits to test live SMTP-verified lookups and never charges credits when a verified email cannot be found—protecting both your budget and your sender reputation.',
  },
  {
    question:
      "Can I use EmailVerifier.io as a reverse email finder or Instagram/social email finder?",
    answer:
      "Yes. Our enrichment engine supports reverse email lookup to identify the person, job title, and company behind an email address, and helps agencies, recruiters, and partnerships teams find verified business emails linked to LinkedIn profiles, company domains, and creator or brand Instagram business profiles.",
  },
  {
    question: "Do I need to verify emails separately after finding them here?",
    answer:
      "No. Unlike standalone tools such as Hunter.io, GetProspect, or Anymail Finder where outbound teams often export lists into a second verification tool, every email discovered on EmailVerifier.io is automatically pre-checked across syntax, MX records, disposable databases, and live SMTP—backed by our 99.7% deliverability guarantee and instant credit-refund promise.",
  },
];
