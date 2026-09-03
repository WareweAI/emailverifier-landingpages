import type {
  BlogAuthor,
  BlogCategory,
  BlogPost,
} from "./types";

const PLACEHOLDER = "/blog/placeholder.svg";

export const MOCK_CATEGORIES: BlogCategory[] = [
  {
    id: 1,
    name: "List Cleaning",
    slug: "list-cleaning",
    description:
      "Guides on cleaning email lists with a bulk email verifier before you send.",
    count: 3,
  },
  {
    id: 2,
    name: "Email Verification API",
    slug: "email-verification-api",
    description:
      "How to email verify in real time with the EmailVerifier.io API.",
    count: 2,
  },
  {
    id: 3,
    name: "Deliverability",
    slug: "deliverability",
    description:
      "Practical tips to protect inbox placement with an email verifier.",
    count: 1,
  },
];

export const MOCK_AUTHORS: BlogAuthor[] = [
  {
    id: 1,
    name: "Alex Rivera",
    slug: "alex-rivera",
    description:
      "Writes about list hygiene, bulk verification, and deliverability for EmailVerifier.io.",
    avatarUrl: PLACEHOLDER,
  },
  {
    id: 2,
    name: "Jordan Lee",
    slug: "jordan-lee",
    description:
      "Covers email verification API patterns and developer workflows.",
    avatarUrl: PLACEHOLDER,
  },
];

function cat(...slugs: string[]): BlogCategory[] {
  return MOCK_CATEGORIES.filter((c) => slugs.includes(c.slug));
}

function author(slug: string): BlogAuthor {
  const found = MOCK_AUTHORS.find((a) => a.slug === slug);
  if (!found) throw new Error(`Mock author missing: ${slug}`);
  return found;
}

export const MOCK_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "how-to-clean-an-email-list",
    title: "How to Clean an Email List with an Email Verifier",
    excerpt:
      "Use a bulk email verifier to remove invalid, disposable, and risky addresses before your next campaign.",
    date: "2026-03-01T10:00:00.000Z",
    modified: "2026-03-10T12:00:00.000Z",
    featuredImage: {
      url: PLACEHOLDER,
      alt: "Email verifier results after cleaning a CSV list",
      width: 1200,
      height: 630,
    },
    categories: cat("list-cleaning"),
    author: author("alex-rivera"),
    contentHtml: `
<p>An <strong>email verifier</strong> checks whether addresses can receive mail without sending a campaign. Paste one address, upload a CSV, or call the API — then keep the valid rows and drop the rest.</p>
<h2 id="why-clean-first">Why clean your list first</h2>
<p>Hard bounces and spam traps damage sender reputation. Running a <strong>bulk email verifier</strong> before you send is the fastest way to cut risk.</p>
<h3 id="what-gets-flagged">What gets flagged</h3>
<ul>
<li>Invalid syntax and dead mailboxes</li>
<li>Disposable domains</li>
<li>Role-based inboxes (info@, support@)</li>
<li>Catch-all and other risky statuses</li>
</ul>
<h2 id="steps-to-email-verify">Steps to email verify a full list</h2>
<ol>
<li>Export your list as CSV.</li>
<li>Upload it to EmailVerifier.io (100 free credits on signup, no card).</li>
<li>Download results and keep valid / review risky.</li>
</ol>
<h2 id="pricing-that-never-expires">Credits that never expire</h2>
<p>Pay once at $1.80 per 1,000 verifications. The same credits power bulk checks and the email verification API.</p>
`,
  },
  {
    id: 2,
    slug: "bulk-email-verifier-vs-single-check",
    title: "Bulk Email Verifier vs Single Check: When to Use Each",
    excerpt:
      "Single checks for spot decisions; a bulk email verifier when you need to clean thousands of rows fast.",
    date: "2026-02-18T09:00:00.000Z",
    modified: "2026-02-20T11:00:00.000Z",
    featuredImage: {
      url: PLACEHOLDER,
      alt: "Bulk email verifier uploading a CSV file",
      width: 1200,
      height: 630,
    },
    categories: cat("list-cleaning"),
    author: author("alex-rivera"),
    contentHtml: `
<p>Marketers use an <strong>email verifier</strong> in two modes: paste one address for a quick decision, or run a <strong>bulk email verifier</strong> on a full CSV.</p>
<h2 id="single-check">When single check wins</h2>
<p>Use single check when you need to email verify a lead in a CRM note, sales call, or form review.</p>
<h2 id="bulk-mode">When bulk mode wins</h2>
<p>Upload once, get status counts, and export clean rows. Same credits, same statuses — just scaled for lists.</p>
`,
  },
  {
    id: 3,
    slug: "email-verification-api-getting-started",
    title: "Email Verification API: Getting Started",
    excerpt:
      "Call the email verification API with the same credits as bulk. Real-time status, score, and risk flags.",
    date: "2026-02-05T14:00:00.000Z",
    modified: "2026-02-12T16:00:00.000Z",
    featuredImage: {
      url: PLACEHOLDER,
      alt: "Email verification API request and JSON response",
      width: 1200,
      height: 630,
    },
    categories: cat("email-verification-api"),
    author: author("jordan-lee"),
    contentHtml: `
<p>The <strong>email verification API</strong> lets you email verify on signup, import, or enrichment — using the same credits as the bulk email verifier.</p>
<h2 id="get-an-api-key">Get an API key</h2>
<p>Register for 100 free credits (no credit card), then create a key in the app.</p>
<h2 id="example-response">Example response fields</h2>
<p>Responses include status, score, and flags such as disposable, catch-all, and role-based — not marketing fluff.</p>
<pre><code>{
  "status": "valid",
  "overall_score": 92,
  "is_disposable": false
}</code></pre>
`,
  },
  {
    id: 4,
    slug: "catch-all-disposable-role-flags",
    title: "Catch-All, Disposable, and Role Flags Explained",
    excerpt:
      "How an email verifier labels catch-all, disposable, and role-based addresses so you can decide what to keep.",
    date: "2026-01-22T11:00:00.000Z",
    modified: "2026-01-28T09:00:00.000Z",
    featuredImage: {
      url: PLACEHOLDER,
      alt: "Email verifier status chips for catch-all and disposable",
      width: 1200,
      height: 630,
    },
    categories: cat("list-cleaning", "deliverability"),
    author: author("alex-rivera"),
    contentHtml: `
<p>A good <strong>email verifier</strong> does more than valid/invalid. Flags tell you <em>why</em> an address is risky.</p>
<h2 id="catch-all">Catch-all domains</h2>
<p>The server accepts any local part. Deliverability is uncertain — review before large sends.</p>
<h2 id="disposable">Disposable addresses</h2>
<p>Temporary inboxes often bounce later or never engage. Most teams suppress them.</p>
<h2 id="role-based">Role-based inboxes</h2>
<p>Addresses like sales@ or admin@ are shared. Useful for B2B outreach rules, risky for drip sequences.</p>
`,
  },
  {
    id: 5,
    slug: "realtime-email-verify-at-signup",
    title: "Real-Time Email Verify at Signup",
    excerpt:
      "Block bad signups with the email verification API before they land in your CRM.",
    date: "2026-01-10T08:00:00.000Z",
    modified: "2026-01-15T10:00:00.000Z",
    featuredImage: {
      url: PLACEHOLDER,
      alt: "Signup form protected by email verification API",
      width: 1200,
      height: 630,
    },
    categories: cat("email-verification-api"),
    author: author("jordan-lee"),
    contentHtml: `
<p>Wire an <strong>email verification API</strong> into signup so you email verify before the row hits your database.</p>
<h2 id="why-realtime">Why real-time</h2>
<p>Stopping disposable and invalid addresses at the form saves credits later and keeps your CRM cleaner.</p>
<h2 id="same-credits">Same credits as bulk</h2>
<p>One wallet for the bulk email verifier and API — $1.80 per 1,000, never expire.</p>
`,
  },
  {
    id: 6,
    slug: "deliverability-checklist-before-send",
    title: "Deliverability Checklist Before You Send",
    excerpt:
      "Run this checklist — including an email verifier pass — before every campaign.",
    date: "2025-12-12T13:00:00.000Z",
    modified: "2026-01-05T13:00:00.000Z",
    featuredImage: {
      url: PLACEHOLDER,
      alt: "Deliverability checklist with email verifier step",
      width: 1200,
      height: 630,
    },
    categories: cat("deliverability", "list-cleaning"),
    author: author("alex-rivera"),
    contentHtml: `
<p>Protect inbox placement with a short pre-send checklist. Step one: run your list through an <strong>email verifier</strong>.</p>
<h2 id="checklist">The checklist</h2>
<ul>
<li>Bulk email verifier pass on the send segment</li>
<li>Suppress known complainers and unsubscribes</li>
<li>Warm volume if the domain is new</li>
<li>Authenticate SPF, DKIM, and DMARC</li>
</ul>
<h2 id="verify-then-send">Verify, then send</h2>
<p>Email verify first. Sending to a dirty list is the expensive way to learn the same lesson.</p>
`,
  },
];
