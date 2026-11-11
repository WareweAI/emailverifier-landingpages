/**
 * Marketing API explorer content — field names and endpoints match
 * https://app.emailverifier.io/api-docs (live product docs).
 */

export const API_BASE_URL = "https://api.emailverifier.io";

export type ApiLang = "curl" | "node";

export type ApiEndpointDoc = {
  id: string;
  title: string;
  summary: string;
  description: string;
  method: string;
  path: string;
  credits: string;
  timeout?: string;
  snippets: Record<ApiLang, string>;
  responseExample: string;
};

export type ApiProductTab = {
  id: string;
  label: string;
  description: string;
  endpoints: readonly ApiEndpointDoc[];
};

const VERIFY_SINGLE_RESPONSE = `{
  "success": true,
  "email": "john.doe@example.com",
  "result": "safe",
  "status": "valid",
  "subresult": "mailbox_verified",
  "score": 100,
  "overall_score": 100,
  "is_deliverable": true,
  "is_safe_to_send": true,
  "is_disposable": false,
  "is_catch_all": false,
  "accept_all": "resolved",
  "is_role_account": false
}`;

const VERIFY_BATCH_RESPONSE = `{
  "success": true,
  "total": 3,
  "verified": 3,
  "failed": 0,
  "credits_used": 3,
  "results": [
    { "email": "user1@example.com", "result": "safe", "score": 100 },
    { "email": "user2@example.com", "result": "invalid", "score": 10 },
    { "email": "user3@example.com", "result": "risky", "status": "catch-all", "score": 75 }
  ]
}`;

const VERIFY_BULK_RESPONSE = `{
  "message": "Batches are created and sent to Queue !",
  "projectId": "b1f2c3d4-…",
  "emailCount": 4820
}`;

const FIND_RESPONSE = `{
  "success": true,
  "found": true,
  "email": "john.smith@acme.com",
  "verified": true,
  "confidence": 95,
  "pattern": "first.last",
  "firstName": "John",
  "lastName": "Smith",
  "domain": "acme.com",
  "creditsCharged": 5,
  "creditsRemaining": 4821
}`;

export const API_PRODUCT_TABS = [
  {
    id: "verify",
    label: "Verify Emails API",
    description: "Single, batch, and bulk verification with the same credits.",
    endpoints: [
      {
        id: "single",
        title: "Single Email Verifier",
        summary: "One email, verified instantly",
        description:
          "Real-time result, fast enough for a signup form. One address in, one result out.",
        method: "POST",
        path: "/api/v1/verify",
        credits: "1 per email",
        timeout: "30 seconds",
        snippets: {
          curl: `curl -X POST '${API_BASE_URL}/api/v1/verify' \\
  -H 'X-API-Key: YOUR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{"email": "user@example.com"}'`,
          node: `const res = await fetch("${API_BASE_URL}/api/v1/verify", {
  method: "POST",
  headers: {
    "X-API-Key": process.env.EMAILVERIFIER_API_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email: "user@example.com" }),
});
const data = await res.json();`,
        },
        responseExample: VERIFY_SINGLE_RESPONSE,
      },
      {
        id: "batch",
        title: "Batch Email Verifier",
        summary: "Up to 100 emails in one batch",
        description:
          "Synchronous batch of up to 100 addresses. Each result uses the same fields as single verify.",
        method: "POST",
        path: "/api/v1/verify/batch",
        credits: "1 per email",
        timeout: "Synced response",
        snippets: {
          curl: `curl -X POST '${API_BASE_URL}/api/v1/verify/batch' \\
  -H 'X-API-Key: YOUR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{"emails": ["user1@example.com", "user2@example.com"]}'`,
          node: `const res = await fetch("${API_BASE_URL}/api/v1/verify/batch", {
  method: "POST",
  headers: {
    "X-API-Key": process.env.EMAILVERIFIER_API_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    emails: ["user1@example.com", "user2@example.com"],
  }),
});
const data = await res.json();`,
        },
        responseExample: VERIFY_BATCH_RESPONSE,
      },
      {
        id: "bulk",
        title: "Bulk Email Verifier",
        summary: "Multiple files, unlimited emails",
        description:
          "Upload CSV/XLS/XLSX, poll progress, then page or download results. Requires bulk_verification permission.",
        method: "POST",
        path: "/api/v1/bulk",
        credits: "1 per unique email",
        timeout: "Async job",
        snippets: {
          curl: `curl -X POST '${API_BASE_URL}/api/v1/bulk' \\
  -H 'X-API-Key: YOUR_API_KEY' \\
  -F 'file=@contacts.csv' \\
  -F 'targetColumn=email'`,
          node: `const form = new FormData();
form.append("file", file); // File / Blob
form.append("targetColumn", "email");

const res = await fetch("${API_BASE_URL}/api/v1/bulk", {
  method: "POST",
  headers: { "X-API-Key": process.env.EMAILVERIFIER_API_KEY },
  body: form,
});
const data = await res.json(); // { projectId, emailCount, … }`,
        },
        responseExample: VERIFY_BULK_RESPONSE,
      },
    ],
  },
  {
    id: "find",
    label: "Find Emails API",
    description: "Find work emails from a name, company, or LinkedIn URL.",
    endpoints: [
      {
        id: "find",
        title: "Email Finder",
        summary: "Name + company → verified work email",
        description:
          "Find someone's work address from their name and employer, a company domain, or a LinkedIn profile URL. Searches that find nothing are free.",
        method: "POST",
        path: "/api/v1/find",
        credits: "5 found · 10 with enrich",
        timeout: "Synced response",
        snippets: {
          curl: `curl -X POST '${API_BASE_URL}/api/v1/find' \\
  -H 'X-API-Key: YOUR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{"full_name": "John Smith", "domain": "acme.com"}'`,
          node: `const res = await fetch("${API_BASE_URL}/api/v1/find", {
  method: "POST",
  headers: {
    "X-API-Key": process.env.EMAILVERIFIER_API_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    full_name: "John Smith",
    domain: "acme.com",
  }),
});
const data = await res.json();`,
        },
        responseExample: FIND_RESPONSE,
      },
    ],
  },
  {
    id: "account",
    label: "Account API",
    description: "Base URL, API key auth, and permission scopes.",
    endpoints: [
      {
        id: "auth",
        title: "Base URL & Authentication",
        summary: "X-API-Key on every request",
        description:
          "All requests go to the base URL. Authenticate with the X-API-Key header. Bulk file endpoints need bulk_verification; the finder needs finder access. Keep keys on the server — never in client-side code.",
        method: "HEADER",
        path: "X-API-Key: YOUR_API_KEY",
        credits: "Same pool as bulk",
        snippets: {
          curl: `# Base URL
${API_BASE_URL}

# Authenticate every request
curl -X POST '${API_BASE_URL}/api/v1/verify' \\
  -H 'X-API-Key: YOUR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{"email": "user@example.com"}'`,
          node: `const API_BASE = "${API_BASE_URL}";
const API_KEY = process.env.EMAILVERIFIER_API_KEY;

const res = await fetch(\`\${API_BASE}/api/v1/verify\`, {
  method: "POST",
  headers: {
    "X-API-Key": API_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email: "user@example.com" }),
});`,
        },
        responseExample: `{
  "success": true,
  "email": "user@example.com",
  "result": "safe",
  "status": "valid"
}`,
      },
    ],
  },
] as const satisfies readonly ApiProductTab[];
