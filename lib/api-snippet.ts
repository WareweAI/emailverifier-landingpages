export const API_EXAMPLE_RESPONSE = {
  success: true,
  email: "user@company.com",
  result: "safe",
  status: "valid",
  overall_score: 100,
  is_deliverable: true,
  is_catch_all: false,
  is_disposable: false,
  is_role_account: false,
} as const;

export const API_SNIPPETS = {
  curl: `curl -X POST 'https://api.emailverifier.io/api/v1/verify' \\
  -H 'X-API-Key: YOUR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{"email": "user@company.com"}'`,
  node: `const res = await fetch("https://api.emailverifier.io/api/v1/verify", {
  method: "POST",
  headers: {
    "X-API-Key": process.env.EMAILVERIFIER_API_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email }),
});
const data = await res.json();`,
} as const;

export type ApiSnippetTab = keyof typeof API_SNIPPETS;

export const REGISTER_URL = "https://app.emailverifier.io/register";
export const API_DOCS_PATH = "/email-verification-api";
