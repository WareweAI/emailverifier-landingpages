export const API_EXAMPLE_RESPONSE = {
  status: "valid",
  overall_score: 92,
  is_deliverable: true,
  is_catch_all: false,
  is_disposable: false,
  is_role_account: false,
} as const;

export const API_SNIPPETS = {
  curl: `curl "https://app.emailverifier.io/api/v1/verify?email=user@company.com&key=YOUR_API_KEY"`,
  node: `const res = await fetch(
  \`https://app.emailverifier.io/api/v1/verify?email=\${encodeURIComponent(email)}&key=\${API_KEY}\`
);
const data = await res.json();`,
} as const;

export type ApiSnippetTab = keyof typeof API_SNIPPETS;

export const REGISTER_URL = "https://app.emailverifier.io/register";
export const API_DOCS_PATH = "/email-verification-api";
