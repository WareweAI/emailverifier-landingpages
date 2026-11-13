/**
 * Single source of truth for /integrations.
 *
 * Status baseline (owner must confirm against the live dashboard):
 * - Homepage VerifyEmailsDemo: Google Drive live; OneDrive, Dropbox, Airtable = Soon
 * - HubSpot / Salesforce: existing product copy = connected path when enabled for account
 * - Google Sheets: shown on bulk page logo strip — treat as available via Drive / file export until confirmed
 * - Pipedrive: logo-only on bulk page; omitted here until a live import path is confirmed
 */

export type IntegrationCategory =
  | "cloud"
  | "crm"
  | "spreadsheet"
  | "api";

export type IntegrationStatus = "available" | "soon" | "on-request";

export type Integration = {
  id: string;
  name: string;
  category: IntegrationCategory;
  /** Brand mark path; omit for icon-only cards (e.g. API). */
  logo?: string;
  status: IntegrationStatus;
  description: string;
  /** Short setup / limit lines shown on cards */
  howItWorks: readonly string[];
  href?: string;
};

export const INTEGRATION_STATUS_LABEL: Record<IntegrationStatus, string> = {
  available: "Available",
  soon: "Soon",
  "on-request": "Enabled on request",
};

export const INTEGRATION_CATEGORY_LABEL: Record<IntegrationCategory, string> = {
  cloud: "Cloud storage",
  crm: "CRM",
  spreadsheet: "Spreadsheets",
  api: "API",
};

export const INTEGRATIONS: readonly Integration[] = [
  {
    id: "google-drive",
    name: "Google Drive",
    category: "cloud",
    logo: "/logos/integrations/google-drive.svg",
    status: "available",
    description:
      "Pull spreadsheets and CSVs from Drive straight into a bulk verification job.",
    howItWorks: [
      "Connect Google Drive in the dashboard",
      "Pick a sheet or CSV from your Drive",
      "Run verification on the same credits as upload",
    ],
    href: "https://app.emailverifier.io/register",
  },
  {
    id: "onedrive",
    name: "OneDrive",
    category: "cloud",
    logo: "/logos/integrations/onedrive.svg",
    status: "soon",
    description:
      "Import lists stored in OneDrive without downloading to your desktop first.",
    howItWorks: [
      "OneDrive connect ships as Soon on the homepage",
      "Until then, download CSV/XLSX and upload",
      "Same credit balance once the connector is live",
    ],
  },
  {
    id: "dropbox",
    name: "Dropbox",
    category: "cloud",
    logo: "/logos/integrations/dropbox.svg",
    status: "soon",
    description:
      "Connect Dropbox folders when your team already shares list files there.",
    howItWorks: [
      "Dropbox import is marked Soon",
      "Export CSV/TXT/XLSX from Dropbox for now",
      "Upload to the bulk email verifier",
    ],
  },
  {
    id: "airtable",
    name: "Airtable",
    category: "cloud",
    logo: "/logos/integrations/airtable.svg",
    status: "soon",
    description:
      "Bring Airtable bases into a verification job when the table holds emails.",
    howItWorks: [
      "Airtable connect is marked Soon",
      "Export a CSV from your base today",
      "Upload and download statuses as usual",
    ],
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "crm",
    logo: "/logos/integrations/hubspot.svg",
    status: "on-request",
    description:
      "Available as a connected import path when enabled for your account.",
    howItWorks: [
      "Ask support or check your account for HubSpot import",
      "Or export contacts as CSV from HubSpot",
      "Upload to the bulk email verifier anytime",
    ],
  },
  {
    id: "salesforce",
    name: "Salesforce",
    category: "crm",
    logo: "/logos/integrations/salesforce.svg",
    status: "on-request",
    description:
      "Available as a connected import path when enabled for your account.",
    howItWorks: [
      "Enabled on request for connected Salesforce import",
      "CSV export from Salesforce works as a fallback",
      "Verification uses the same never-expire credits",
    ],
  },
  {
    id: "google-sheets",
    name: "Google Sheets",
    category: "spreadsheet",
    logo: "/logos/integrations/google-sheets.svg",
    status: "available",
    description:
      "Verify Sheet exports (CSV/XLSX) or open Drive-backed files when Google Drive is connected.",
    howItWorks: [
      "Download CSV/XLSX from Sheets, or open via Drive",
      "Upload or select the file in the dashboard",
      "Export deliverable / risky / invalid rows",
    ],
    href: "/bulk-email-verifier",
  },
  {
    id: "email-verification-api",
    name: "Email verification API",
    category: "api",
    status: "available",
    description:
      "HTTPS email verify at signup or in your app — curl or Node, same credits as bulk.",
    howItWorks: [
      "Register and create an API key in the dashboard",
      "POST to the verify endpoint with X-API-Key",
      "Read status, score, and risk flags in JSON",
    ],
    href: "/email-verification-api",
  },
] as const;

export type IntegrationFilterId = "all" | IntegrationCategory;

export const INTEGRATION_FILTERS: readonly {
  id: IntegrationFilterId;
  label: string;
}[] = [
  { id: "all", label: "All" },
  { id: "cloud", label: "Cloud storage" },
  { id: "crm", label: "CRM" },
  { id: "spreadsheet", label: "Spreadsheets" },
  { id: "api", label: "API" },
] as const;

export function integrationsByStatus(status: IntegrationStatus): Integration[] {
  return INTEGRATIONS.filter((item) => item.status === status);
}

export function integrationsByCategory(
  category: IntegrationCategory
): Integration[] {
  return INTEGRATIONS.filter((item) => item.category === category);
}

export function filterIntegrations(
  filter: IntegrationFilterId
): readonly Integration[] {
  if (filter === "all") return INTEGRATIONS;
  return INTEGRATIONS.filter((item) => item.category === filter);
}

export function countByStatus(status: IntegrationStatus): number {
  return INTEGRATIONS.filter((item) => item.status === status).length;
}

/** Names for FAQ / copy — excludes the API product card when listing import sources. */
export function importSourceNames(options?: {
  status?: IntegrationStatus;
  includeApi?: boolean;
}): string[] {
  return INTEGRATIONS.filter((item) => {
    if (!options?.includeApi && item.category === "api") return false;
    if (options?.status && item.status !== options.status) return false;
    return true;
  }).map((item) => item.name);
}

export function formatNameList(names: readonly string[]): string {
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}
