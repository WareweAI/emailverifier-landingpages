export type GuideProductSlug =
  | "email-validator"
  | "bulk-email-verifier"
  | "email-validation-api"
  | "email-finder"
  | "lead-finder"
  | "data-enrichment";

export type GuideGoalSlug =
  | "list-cleaning"
  | "deliverability"
  | "api-integrations"
  | "lead-generation"
  | "getting-started";

export type GuideProduct = {
  slug: GuideProductSlug;
  name: string;
  href: string;
  description: string;
};

export type GuideGoal = {
  slug: GuideGoalSlug;
  name: string;
};

export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  product: GuideProductSlug;
  goals: GuideGoalSlug[];
  readTimeMinutes: number;
  featured?: boolean;
  quickStartOrder?: number;
  image: {
    url: string;
    alt: string;
  };
  /** Short how-to body for the guide detail page (paragraphs). */
  steps: { heading: string; body: string }[];
};

export const GUIDE_PRODUCTS: GuideProduct[] = [
  {
    slug: "email-validator",
    name: "Email Validator",
    href: "/validate-email",
    description: "Verify a single address before you send or import.",
  },
  {
    slug: "bulk-email-verifier",
    name: "Bulk Email Verifier",
    href: "/bulk-email-verifier",
    description: "Clean CSV lists and remove risky contacts at scale.",
  },
  {
    slug: "email-validation-api",
    name: "Email Validation API",
    href: "/email-verification-api",
    description: "Real-time checks for forms, CRMs, and apps.",
  },
  {
    slug: "email-finder",
    name: "Email Finder",
    href: "/email-finder",
    description: "Find verified emails by name and company.",
  },
  {
    slug: "lead-finder",
    name: "Lead Finder",
    href: "/find-leads",
    description: "Discover B2B leads matched to your ICP.",
  },
  {
    slug: "data-enrichment",
    name: "Data Enrichment",
    href: "/data-enrichment",
    description: "Add roles and company data to existing lists.",
  },
];

export const GUIDE_GOALS: GuideGoal[] = [
  { slug: "list-cleaning", name: "List Cleaning" },
  { slug: "deliverability", name: "Deliverability" },
  { slug: "api-integrations", name: "API & Integrations" },
  { slug: "lead-generation", name: "Lead Generation" },
  { slug: "getting-started", name: "Getting Started" },
];

const PLACEHOLDER = "/blog/placeholder.svg";

export const GUIDES: Guide[] = [
  {
    slug: "verify-an-email-address-online",
    title: "How to verify an email address online",
    excerpt:
      "Use the free email verifier to check syntax, MX, mailbox status, and risk flags in seconds — then claim 100 free credits to go further.",
    product: "email-validator",
    goals: ["getting-started", "deliverability"],
    readTimeMinutes: 4,
    featured: true,
    quickStartOrder: 1,
    image: {
      url: PLACEHOLDER,
      alt: "Email verifier result screen showing deliverable and risk flags",
    },
    steps: [
      {
        heading: "Open the free email verifier",
        body: "Go to Validate Email on EmailVerifier.io and paste a single address. No account is required for the on-page demo checks.",
      },
      {
        heading: "Read the status and flags",
        body: "Results classify the address as valid, risky, or invalid and surface disposable, catch-all, role, and related signals so you know what is safe to send.",
      },
      {
        heading: "Continue with free credits",
        body: "Create an account for 100 free credits with no credit card. The same wallet powers single checks, bulk CSV, and the email verification API.",
      },
    ],
  },
  {
    slug: "clean-a-csv-list",
    title: "How to clean a CSV email list",
    excerpt:
      "Upload a CSV to the bulk email verifier, map the email column, and export only the contacts you want to keep.",
    product: "bulk-email-verifier",
    goals: ["list-cleaning", "getting-started"],
    readTimeMinutes: 6,
    quickStartOrder: 2,
    image: {
      url: PLACEHOLDER,
      alt: "Bulk email verifier CSV upload and clean results table",
    },
    steps: [
      {
        heading: "Prepare your CSV",
        body: "Export your list with a clear email column. Remove blank rows if you can; the bulk email verifier will still skip empty cells.",
      },
      {
        heading: "Upload and map the column",
        body: "On Bulk Email Verifier, upload the file, confirm the email field, and start the job. Credits are prepaid at $1.80 per 1,000 and never expire.",
      },
      {
        heading: "Filter and export",
        body: "Review valid, risky, and invalid counts, then export the segments you plan to send — or suppress catch-all and disposable first.",
      },
    ],
  },
  {
    slug: "remove-catch-all-and-disposable-emails",
    title: "How to remove catch-all and disposable emails from your list",
    excerpt:
      "Flag catch-all and disposable addresses with a bulk email verifier so cold outreach stays off risky domains.",
    product: "bulk-email-verifier",
    goals: ["list-cleaning", "deliverability"],
    readTimeMinutes: 5,
    image: {
      url: PLACEHOLDER,
      alt: "Bulk email verifier filtering catch-all and disposable addresses",
    },
    steps: [
      {
        heading: "Run a full list check",
        body: "Upload your outreach list to the bulk email verifier so every row gets status plus risk flags — not just a green or red badge.",
      },
      {
        heading: "Filter catch-all and disposable",
        body: "Use the result flags to suppress catch-all domains and known disposable providers before you build sequences.",
      },
      {
        heading: "Protect deliverability",
        body: "Keeping risky rows out of sends supports inbox placement. Accuracy is backed by our 99.7% deliverability guarantee (terms apply).",
      },
    ],
  },
  {
    slug: "connect-google-drive-or-hubspot",
    title: "Connect Google Drive or HubSpot to verify lists",
    excerpt:
      "Import contacts from Drive or HubSpot, verify on the same credits, and push clean results back into your workflow.",
    product: "bulk-email-verifier",
    goals: ["api-integrations", "list-cleaning", "getting-started"],
    readTimeMinutes: 7,
    quickStartOrder: 3,
    image: {
      url: PLACEHOLDER,
      alt: "Email verifier integrations with Google Drive and HubSpot",
    },
    steps: [
      {
        heading: "Open Integrations",
        body: "From Integrations, choose Google Drive, HubSpot, or another supported source. You can also start from the bulk email verifier upload flow.",
      },
      {
        heading: "Authorize and pick a list",
        body: "Connect the account, select the file or CRM list, and map the email field the same way you would for a CSV upload.",
      },
      {
        heading: "Verify on shared credits",
        body: "Jobs use the same credit wallet as API and single checks — 100 free on signup, then pay-once packs that never expire.",
      },
    ],
  },
  {
    slug: "integrate-email-verification-api-in-5-minutes",
    title: "Integrate the email verification API in 5 minutes",
    excerpt:
      "Authenticate, call the real-time endpoint, and read status plus risk fields — same credits as bulk list cleaning.",
    product: "email-validation-api",
    goals: ["api-integrations", "getting-started"],
    readTimeMinutes: 5,
    quickStartOrder: 4,
    image: {
      url: PLACEHOLDER,
      alt: "Email verification API request and JSON response example",
    },
    steps: [
      {
        heading: "Get an API key",
        body: "Register at app.emailverifier.io and open API settings. Get API key always means create an account — there is no fake key generator on the marketing site.",
      },
      {
        heading: "Send a test request",
        body: "Copy the curl or Node example from the email verification API docs. Confirm the response fields your app will branch on (status, score, catch-all, disposable, role).",
      },
      {
        heading: "Wire signup or CRM hooks",
        body: "Call the API at form submit or before CRM sync so invalid and disposable addresses never enter your database. Credits match bulk pricing.",
      },
    ],
  },
  {
    slug: "make-your-first-api-call",
    title: "Make your first email verification API call",
    excerpt:
      "A checklist for your first authenticated request: headers, sample payload, and how to handle valid vs risky results.",
    product: "email-validation-api",
    goals: ["api-integrations", "getting-started"],
    readTimeMinutes: 4,
    quickStartOrder: 5,
    image: {
      url: PLACEHOLDER,
      alt: "First email verification API call checklist",
    },
    steps: [
      {
        heading: "Copy a documented snippet",
        body: "Use the homepage API band or /email-verification-api examples (curl and Node). Stick to real field names — we do not invent SDKs.",
      },
      {
        heading: "Authenticate once",
        body: "Pass your API key as documented. Treat keys like passwords; never commit them to public repos.",
      },
      {
        heading: "Branch on status",
        body: "Accept valid addresses, review risky ones, and reject invalid or disposable results before you create the user or lead.",
      },
    ],
  },
  {
    slug: "find-emails-by-name-and-company",
    title: "Find emails by name and company",
    excerpt:
      "Use Email Finder to discover likely addresses, then rely on built-in verification before you add them to outreach.",
    product: "email-finder",
    goals: ["lead-generation", "getting-started"],
    readTimeMinutes: 5,
    image: {
      url: PLACEHOLDER,
      alt: "Email finder lookup by name and company with verified result",
    },
    steps: [
      {
        heading: "Enter name and domain",
        body: "On Email Finder, provide the person’s name and company domain (or LinkedIn profile where supported) to generate candidate addresses.",
      },
      {
        heading: "Review verified results",
        body: "Candidates are checked so you see deliverability status instead of guessing patterns like first.last@company.com alone.",
      },
      {
        heading: "Export into your sequence",
        body: "Add verified finds to your CRM or outreach tool. For larger batches, pair Finder with the bulk email verifier on imported lists.",
      },
    ],
  },
  {
    slug: "build-an-icp-lead-list",
    title: "Build an ICP lead list with Lead Finder",
    excerpt:
      "Define titles, industries, and locations, then pull B2B leads that are ready to verify before cold email.",
    product: "lead-finder",
    goals: ["lead-generation"],
    readTimeMinutes: 6,
    image: {
      url: PLACEHOLDER,
      alt: "Lead Finder ICP filters for B2B prospecting",
    },
    steps: [
      {
        heading: "Describe your ICP",
        body: "In Lead Finder, set role, industry, company size, and geography filters that match who you actually sell to.",
      },
      {
        heading: "Generate and review leads",
        body: "Scan the returned prospects for fit. Prefer verified emails when the product surfaces them so bounce risk stays low.",
      },
      {
        heading: "Verify before outreach",
        body: "Run any remaining addresses through the email verifier. Same credits cover Finder workflows and bulk cleaning.",
      },
    ],
  },
  {
    slug: "enrich-a-list-in-bulk",
    title: "Enrich a list in bulk with roles and company data",
    excerpt:
      "Upload contacts to Data Enrichment to fill missing titles and company fields, then verify emails before you send.",
    product: "data-enrichment",
    goals: ["lead-generation", "list-cleaning"],
    readTimeMinutes: 6,
    image: {
      url: PLACEHOLDER,
      alt: "Data enrichment adding roles and company fields to a contact list",
    },
    steps: [
      {
        heading: "Upload your contact file",
        body: "Start from Data Enrichment with a CSV that has at least email or name + company. Map the columns you already trust.",
      },
      {
        heading: "Enrich roles and firmographics",
        body: "Run enrichment to fill titles, company names, and related firmographic fields so SDRs can personalize faster.",
      },
      {
        heading: "Verify before campaigns",
        body: "Pass enriched emails through verification so you do not mail stale or invalid addresses after enrichment.",
      },
    ],
  },
  {
    slug: "lower-bounce-rate-before-cold-outreach",
    title: "Lower bounce rate before cold outreach",
    excerpt:
      "A deliverability checklist: verify first, suppress traps and disposables, and keep sending domains off risky lists.",
    product: "bulk-email-verifier",
    goals: ["deliverability", "list-cleaning"],
    readTimeMinutes: 5,
    image: {
      url: PLACEHOLDER,
      alt: "Deliverability checklist using a bulk email verifier before outreach",
    },
    steps: [
      {
        heading: "Verify every new list",
        body: "Treat list cleaning as a required step before sequences. Hard bounces punish sender reputation faster than soft engagement metrics recover.",
      },
      {
        heading: "Suppress high-risk flags",
        body: "Remove invalid rows; segment or skip disposable, spam-trap suspects, and low-confidence catch-all when your risk tolerance is tight.",
      },
      {
        heading: "Re-check aging lists",
        body: "People change jobs. Re-run older segments through the bulk email verifier before large sends — credits never expire, so you can verify when you need to.",
      },
    ],
  },
  {
    slug: "block-disposable-emails-at-signup",
    title: "Block disposable emails at signup with the API",
    excerpt:
      "Call the email verification API on form submit to reject disposable and invalid addresses before they hit your CRM.",
    product: "email-validation-api",
    goals: ["api-integrations", "deliverability"],
    readTimeMinutes: 5,
    image: {
      url: PLACEHOLDER,
      alt: "Signup form calling the email verification API to block disposable addresses",
    },
    steps: [
      {
        heading: "Hook the signup submit path",
        body: "Before creating the user, send the submitted email to the email verification API from your backend.",
      },
      {
        heading: "Reject disposable and invalid",
        body: "If the response marks disposable or invalid, show a clear error and do not create the account. Optionally challenge risky catch-all.",
      },
      {
        heading: "Monitor credit usage",
        body: "Signup volume is bursty — prepaid credits that never expire fit better than monthly allotments that vanish unused.",
      },
    ],
  },
  {
    slug: "verify-your-first-email",
    title: "Verify your first email on EmailVerifier.io",
    excerpt:
      "A two-minute getting-started path: try the live check, then unlock 100 free credits for bulk and API.",
    product: "email-validator",
    goals: ["getting-started"],
    readTimeMinutes: 3,
    image: {
      url: PLACEHOLDER,
      alt: "Getting started with the EmailVerifier.io free email verifier",
    },
    steps: [
      {
        heading: "Try the live check",
        body: "Paste one address into the on-site email verifier. Confirm you understand valid, risky, and invalid statuses.",
      },
      {
        heading: "Create your account",
        body: "Sign up for 100 free credits with no credit card. That wallet is shared across single checks, bulk, and API.",
      },
      {
        heading: "Pick your next workflow",
        body: "Clean a CSV, connect an integration, or grab an API key — then come back to these guides when you need the next how-to.",
      },
    ],
  },
];

export function getGuideProduct(slug: GuideProductSlug): GuideProduct {
  const product = GUIDE_PRODUCTS.find((p) => p.slug === slug);
  if (!product) throw new Error(`Unknown guide product: ${slug}`);
  return product;
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getGuideCountByProduct(slug: GuideProductSlug): number {
  return GUIDES.filter((g) => g.product === slug).length;
}

export function getFeaturedGuide(): Guide {
  return GUIDES.find((g) => g.featured) ?? GUIDES[0];
}

export function getQuickStartGuides(): Guide[] {
  return GUIDES.filter((g) => g.quickStartOrder != null).sort(
    (a, b) => (a.quickStartOrder ?? 0) - (b.quickStartOrder ?? 0),
  );
}

export type GuideFilters = {
  product?: string;
  goal?: string;
  q?: string;
};

export function filterGuides(filters: GuideFilters = {}): Guide[] {
  const product = filters.product?.trim();
  const goal = filters.goal?.trim();
  const q = filters.q?.trim().toLowerCase();

  return GUIDES.filter((guide) => {
    if (product && guide.product !== product) return false;
    if (goal && !guide.goals.includes(goal as GuideGoalSlug)) return false;
    if (q) {
      const productName = getGuideProduct(guide.product).name.toLowerCase();
      const haystack = `${guide.title} ${guide.excerpt} ${productName}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export function buildGuidesHref(filters: GuideFilters = {}): string {
  const params = new URLSearchParams();
  if (filters.product) params.set("product", filters.product);
  if (filters.goal) params.set("goal", filters.goal);
  if (filters.q) params.set("q", filters.q);
  const qs = params.toString();
  return qs ? `/guides?${qs}` : "/guides";
}
