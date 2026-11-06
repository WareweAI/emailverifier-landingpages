import {
  CREDIT_PACKS,
  calculatePrice,
  getCreditPack,
} from "@/lib/pricing";

export type Confidence = "high" | "medium" | "low";

export type CellKind =
  | "yes"
  | "no"
  | "partial"
  | "text"
  | "price"
  | "unverified";

export type Val<T> = {
  value: T;
  confirmed?: boolean;
  confidence?: Confidence;
  note?: string;
  sourceIds?: string[];
  footnoteIds?: string[];
};

export type ComparisonCell =
  | ({ kind: "yes" | "no" | "unverified" } & Val<null>)
  | ({ kind: "partial" | "text" } & Val<string>)
  | ({ kind: "price" } & Val<number | null>);

export type VendorId =
  | "emailverifier"
  | "zerobounce"
  | "neverbounce"
  | "bouncer"
  | "emailable"
  | "millionverifier"
  | "kickbox"
  | "hunter";

export type Vendor = {
  id: VendorId;
  name: string;
  hiddenByDefault?: boolean;
  footnote?: string;
};

export type VolumeOption = 10_000 | 50_000 | 100_000 | 1_000_000;

export type RowId =
  | "pricingModel"
  | "startingPrice"
  | "costToVerify"
  | "minimumPurchase"
  | "freeCredits"
  | "creditsExpire"
  | "chargedUnknown"
  | "chargedCatchAll"
  | "smtpMailbox"
  | "catchAllHandling"
  | "disposable"
  | "roleBased"
  | "spamTrap"
  | "deliverabilityScore"
  | "bulkCsv"
  | "realtimeApi"
  | "unlimitedApiKeys"
  | "integrations"
  | "emailFinder"
  | "leadSearch"
  | "bulkEnrichment"
  | "teamAccess"
  | "deliverabilityTools"
  | "accuracyClaim"
  | "compliance"
  | "listRetention";

export type RowGroupId =
  | "pricing"
  | "verification"
  | "beyond"
  | "trust";

export type ComparisonRow = {
  id: RowId;
  group: RowGroupId;
  label: string;
  cells: Partial<Record<VendorId, ComparisonCell>>;
};

export const asOf = "2026-11-06";

export const sources: Record<string, { label: string; url: string }> = {
  ours_home: {
    label: "EmailVerifier.io homepage pricing",
    url: "https://emailverifier.io/",
  },
  ours_pricing: {
    label: "EmailVerifier.io pricing page",
    url: "https://emailverifier.io/pricing",
  },
  ours_terms: {
    label: "EmailVerifier.io Terms of Service",
    url: "https://emailverifier.io/terms-of-service",
  },
  zb_pricing: {
    label: "ZeroBounce pricing",
    url: "https://www.zerobounce.net/pricing",
  },
  zb_faq: {
    label: "ZeroBounce billing FAQ",
    url: "https://zerobounce.net/docs/frequently-asked-questions/billing-and-payments/how-is-pricing-determined-for-email-verification",
  },
  zb_emelia: {
    label: "Emelia ZeroBounce pricing snapshot",
    url: "https://emelia.io/hub/zerobounce-pricing",
  },
  nb_pricing: {
    label: "NeverBounce pricing",
    url: "https://www.neverbounce.com/pricing",
  },
  nb_emelia: {
    label: "Emelia NeverBounce pricing snapshot",
    url: "https://emelia.io/hub/neverbounce-pricing",
  },
  nb_mailfloss: {
    label: "Mailfloss NeverBounce pricing",
    url: "https://mailfloss.com/neverbounce-pricing/",
  },
  bouncer_pricing: {
    label: "Bouncer pricing",
    url: "https://www.usebouncer.com/pricing/",
  },
  emailable_pricing: {
    label: "Emailable pricing",
    url: "https://emailable.com/pricing/",
  },
  emailable_docs: {
    label: "Emailable credits docs",
    url: "https://emailable.com/docs/manage-your-account/billing/how-credits-work/",
  },
  emailable_prospeo: {
    label: "Prospeo Emailable pricing review",
    url: "https://prospeo.io/s/emailable-pricing-reviews-pros-and-cons",
  },
  mv_prices: {
    label: "MillionVerifier best prices page",
    url: "https://www.millionverifier.com/why-millionverifier/best-email-verification-prices/",
  },
  mv_bouncezero: {
    label: "BounceZero MillionVerifier compare",
    url: "https://bouncezero.io/compare/millionverifier",
  },
  kickbox_leadhaste: {
    label: "LeadHaste Kickbox pricing",
    url: "https://leadhaste.com/blog/kickbox-pricing",
  },
  kickbox_xpay: {
    label: "XPay Kickbox SaaS pricing",
    url: "https://www.xpay.sh/saas-pricing/kickbox",
  },
  hunter_pricing: {
    label: "Hunter pricing",
    url: "https://hunter.io/pricing",
  },
  hunter_noon: {
    label: "Noon Hunter pricing 2026",
    url: "https://www.noon.ai/blog/articles/451-hunter-io-pricing-2026",
  },
};

export const footnotes: Record<string, string> = {
  fn_accuracy: "Our accuracy guarantee is subject to our Terms of Service.",
  fn_integrations: "Google Sheets, HubSpot, Salesforce, and Google Drive are live; more integrations labeled coming soon.",
  fn_hunter: "Hunter is a find + outreach suite priced by plan, not by verification credit pack.",
  fn_zb_100k: "ZeroBounce 100K PAYG figure from third-party snapshot (Aug 2026); confirm on vendor pricing.",
  fn_emailable_sub: "Emailable volume figures labeled as subscription-rate / third-party derived.",
  fn_mv_entry: "MillionVerifier entry price shown as from ~$37–39 across vendor and third-party sources.",
};

export const VOLUME_OPTIONS: readonly VolumeOption[] = [
  10_000, 50_000, 100_000, 1_000_000,
] as const;

export const DEFAULT_VOLUME: VolumeOption = 50_000;

export const vendors: Vendor[] = [
  { id: "emailverifier", name: "EmailVerifier.io" },
  { id: "zerobounce", name: "ZeroBounce" },
  { id: "neverbounce", name: "NeverBounce" },
  { id: "bouncer", name: "Bouncer" },
  { id: "emailable", name: "Emailable" },
  { id: "millionverifier", name: "MillionVerifier" },
  { id: "kickbox", name: "Kickbox", hiddenByDefault: true },
  {
    id: "hunter",
    name: "Hunter (find + outreach suite)",
    hiddenByDefault: true,
    footnote: "fn_hunter",
  },
];

export const ROW_GROUPS: {
  id: RowGroupId;
  label: string;
}[] = [
  { id: "pricing", label: "Pricing" },
  { id: "verification", label: "Verification" },
  { id: "beyond", label: "Beyond verification" },
  { id: "trust", label: "Trust and data" },
];

/** Our pack price for a comparison volume — always from lib/pricing CREDIT_PACKS. */
export function ourPriceForVolume(credits: number): {
  totalUsd: number;
  perThousand: number;
  ratePerEmail: number;
} | null {
  const pack = getCreditPack(credits);
  if (!pack) return null;
  const quote = calculatePrice(pack.credits);
  return {
    totalUsd: quote.priceUsd,
    perThousand: quote.ratePerThousand,
    ratePerEmail: quote.ratePerEmail,
  };
}

/** Assert homepage packs cover every comparison volume toggle. */
export function assertOurVolumesMatchHomepage(): void {
  for (const volume of VOLUME_OPTIONS) {
    if (!CREDIT_PACKS.some((p) => p.credits === volume)) {
      throw new Error(
        `Comparison volume ${volume} missing from CREDIT_PACKS (homepage pricing source of truth)`
      );
    }
  }
}

type CompetitorCostMap = Partial<
  Record<VolumeOption, ComparisonCell>
>;

const competitorCosts: Record<
  Exclude<VendorId, "emailverifier">,
  CompetitorCostMap
> = {
  zerobounce: {
    10_000: {
      kind: "text",
      value: "Quote / subscription",
      confirmed: false,
      confidence: "medium",
      note: "ONE from $99/mo (10K credits/mo, third-party); PAYG mid-tiers not published",
      sourceIds: ["zb_pricing", "zb_emelia"],
    },
    50_000: {
      kind: "text",
      value: "Quote / subscription",
      confirmed: false,
      confidence: "medium",
      note: "Third-party ONE ~$379/mo for 50K; PAYG not published",
      sourceIds: ["zb_emelia"],
    },
    100_000: {
      kind: "price",
      value: 649,
      confirmed: false,
      confidence: "medium",
      note: "Third-party PAYG snapshot Aug 2026",
      sourceIds: ["zb_emelia"],
      footnoteIds: ["fn_zb_100k"],
    },
    1_000_000: {
      kind: "text",
      value: "Not published",
      confirmed: false,
      confidence: "medium",
      sourceIds: ["zb_pricing"],
    },
  },
  neverbounce: {
    10_000: {
      kind: "price",
      value: 50,
      confirmed: true,
      confidence: "medium",
      sourceIds: ["nb_pricing", "nb_emelia", "nb_mailfloss"],
    },
    50_000: {
      kind: "price",
      value: 250,
      confirmed: true,
      confidence: "medium",
      sourceIds: ["nb_pricing", "nb_emelia"],
    },
    100_000: {
      kind: "price",
      value: 400,
      confirmed: true,
      confidence: "medium",
      sourceIds: ["nb_pricing", "nb_emelia"],
    },
    1_000_000: {
      kind: "price",
      value: 2500,
      confirmed: true,
      confidence: "medium",
      sourceIds: ["nb_pricing", "nb_emelia"],
    },
  },
  bouncer: {
    10_000: {
      kind: "price",
      value: 60,
      confirmed: true,
      confidence: "high",
      sourceIds: ["bouncer_pricing"],
    },
    50_000: {
      kind: "price",
      value: 250,
      confirmed: true,
      confidence: "high",
      sourceIds: ["bouncer_pricing"],
    },
    100_000: {
      kind: "price",
      value: 400,
      confirmed: true,
      confidence: "high",
      sourceIds: ["bouncer_pricing"],
    },
    1_000_000: {
      kind: "price",
      value: 2000,
      confirmed: true,
      confidence: "high",
      sourceIds: ["bouncer_pricing"],
    },
  },
  emailable: {
    10_000: {
      kind: "price",
      value: 51,
      confirmed: false,
      confidence: "low",
      note: "With subscription (third-party)",
      sourceIds: ["emailable_prospeo"],
      footnoteIds: ["fn_emailable_sub"],
    },
    50_000: {
      kind: "price",
      value: 208.25,
      confirmed: false,
      confidence: "low",
      note: "With subscription (third-party)",
      sourceIds: ["emailable_prospeo"],
      footnoteIds: ["fn_emailable_sub"],
    },
    100_000: {
      kind: "price",
      value: 357,
      confirmed: false,
      confidence: "low",
      note: "With subscription (third-party)",
      sourceIds: ["emailable_prospeo"],
      footnoteIds: ["fn_emailable_sub"],
    },
    1_000_000: {
      kind: "text",
      value: "Not published",
      confirmed: false,
      confidence: "medium",
      sourceIds: ["emailable_pricing"],
    },
  },
  millionverifier: {
    10_000: {
      kind: "text",
      value: "Not published",
      confirmed: false,
      confidence: "medium",
      sourceIds: ["mv_prices", "mv_bouncezero"],
    },
    50_000: {
      kind: "price",
      value: 89,
      confirmed: false,
      confidence: "medium",
      note: "Third-party snapshot Aug 2026",
      sourceIds: ["mv_bouncezero"],
    },
    100_000: {
      kind: "text",
      value: "Not published",
      confirmed: false,
      confidence: "medium",
      sourceIds: ["mv_prices"],
    },
    1_000_000: {
      kind: "price",
      value: 449,
      confirmed: false,
      confidence: "medium",
      note: "Third-party snapshot Aug 2026",
      sourceIds: ["mv_bouncezero"],
    },
  },
  kickbox: {
    10_000: {
      kind: "text",
      value: "Not published",
      confirmed: false,
      confidence: "medium",
      sourceIds: ["kickbox_leadhaste", "kickbox_xpay"],
    },
    50_000: {
      kind: "text",
      value: "Not published",
      confirmed: false,
      confidence: "medium",
      sourceIds: ["kickbox_leadhaste"],
    },
    100_000: {
      kind: "text",
      value: "Not published",
      confirmed: false,
      confidence: "medium",
      sourceIds: ["kickbox_leadhaste"],
    },
    1_000_000: {
      kind: "price",
      value: 2999,
      confirmed: false,
      confidence: "medium",
      sourceIds: ["kickbox_leadhaste", "kickbox_xpay"],
    },
  },
  hunter: {
    10_000: {
      kind: "text",
      value: "Varies by plan",
      confirmed: false,
      confidence: "low",
      sourceIds: ["hunter_pricing", "hunter_noon"],
      footnoteIds: ["fn_hunter"],
    },
    50_000: {
      kind: "text",
      value: "Varies by plan",
      confirmed: false,
      confidence: "low",
      sourceIds: ["hunter_pricing"],
      footnoteIds: ["fn_hunter"],
    },
    100_000: {
      kind: "text",
      value: "Varies by plan",
      confirmed: false,
      confidence: "low",
      sourceIds: ["hunter_pricing"],
      footnoteIds: ["fn_hunter"],
    },
    1_000_000: {
      kind: "text",
      value: "Varies by plan",
      confirmed: false,
      confidence: "low",
      sourceIds: ["hunter_pricing"],
      footnoteIds: ["fn_hunter"],
    },
  },
};

function ourCostCell(volume: VolumeOption): ComparisonCell {
  const ours = ourPriceForVolume(volume);
  if (!ours) {
    return {
      kind: "unverified",
      value: null,
      confirmed: false,
      confidence: "low",
    };
  }
  return {
    kind: "price",
    value: ours.totalUsd,
    confirmed: true,
    confidence: "high",
    note: `$${ours.perThousand.toFixed(2)} per 1,000`,
    sourceIds: ["ours_home", "ours_pricing"],
  };
}

export function costToVerifyCells(
  volume: VolumeOption
): Record<VendorId, ComparisonCell> {
  const cells = { ...competitorCosts } as Record<
    Exclude<VendorId, "emailverifier">,
    CompetitorCostMap
  >;
  const result = {
    emailverifier: ourCostCell(volume),
  } as Record<VendorId, ComparisonCell>;

  for (const vendor of vendors) {
    if (vendor.id === "emailverifier") continue;
    result[vendor.id] =
      cells[vendor.id][volume] ??
      ({
        kind: "unverified",
        value: null,
        confirmed: false,
        confidence: "low",
      } satisfies ComparisonCell);
  }
  return result;
}

const yes = (
  sourceIds: string[],
  extras?: Partial<Val<null>>
): ComparisonCell => ({
  kind: "yes",
  value: null,
  confirmed: true,
  confidence: "high",
  sourceIds,
  ...extras,
});

const no = (
  sourceIds: string[],
  extras?: Partial<Val<null>>
): ComparisonCell => ({
  kind: "no",
  value: null,
  confirmed: true,
  confidence: extras?.confidence ?? "medium",
  sourceIds,
  ...extras,
});

const text = (
  value: string,
  sourceIds: string[],
  extras?: Partial<Val<string>>
): ComparisonCell => ({
  kind: "text",
  value,
  confirmed: extras?.confirmed ?? true,
  confidence: extras?.confidence ?? "high",
  sourceIds,
  ...extras,
});

const partial = (
  value: string,
  sourceIds: string[],
  extras?: Partial<Val<string>>
): ComparisonCell => ({
  kind: "partial",
  value,
  confirmed: extras?.confirmed ?? true,
  confidence: extras?.confidence ?? "medium",
  sourceIds,
  ...extras,
});

const unverified = (
  extras?: Partial<Val<null>>
): ComparisonCell => ({
  kind: "unverified",
  value: null,
  confirmed: false,
  confidence: extras?.confidence ?? "low",
  ...extras,
});

/** Static rows (cost-to-verify is filled at render time). */
export const comparisonRows: ComparisonRow[] = [
  {
    id: "pricingModel",
    group: "pricing",
    label: "Pricing model",
    cells: {
      emailverifier: text(
        "One-time pay-as-you-go credits",
        ["ours_home"],
        { confidence: "high" }
      ),
      zerobounce: text("PAYG + ZeroBounce ONE subscription", ["zb_pricing"], {
        confidence: "high",
      }),
      neverbounce: text("PAYG + Growth subscription", ["nb_pricing"], {
        confidence: "medium",
      }),
      bouncer: text("PAYG + monthly subscription", ["bouncer_pricing"], {
        confidence: "high",
      }),
      emailable: text("PAYG + credits subscription (−15%)", ["emailable_pricing"], {
        confidence: "medium",
      }),
      millionverifier: text("PAYG (no subscription required)", ["mv_prices"], {
        confidence: "medium",
        confirmed: false,
      }),
      kickbox: text("PAYG", ["kickbox_leadhaste"], { confidence: "medium", confirmed: false }),
      hunter: text("Plan-based shared credits", ["hunter_pricing"], {
        confidence: "medium",
        footnoteIds: ["fn_hunter"],
      }),
    },
  },
  {
    id: "startingPrice",
    group: "pricing",
    label: "Starting price / smallest paid pack",
    cells: {
      emailverifier: {
        kind: "price",
        value: 20,
        confirmed: true,
        confidence: "high",
        note: "10K credits",
        sourceIds: ["ours_home"],
      },
      zerobounce: text("From $39 (2,000 credits)", ["zb_pricing"], {
        confidence: "high",
      }),
      neverbounce: {
        kind: "price",
        value: 8,
        confirmed: true,
        confidence: "medium",
        note: "1K credits",
        sourceIds: ["nb_pricing", "nb_emelia"],
      },
      bouncer: {
        kind: "price",
        value: 8,
        confirmed: true,
        confidence: "high",
        note: "1K credits",
        sourceIds: ["bouncer_pricing"],
      },
      emailable: {
        kind: "price",
        value: 38,
        confirmed: true,
        confidence: "medium",
        note: "5K credits minimum",
        sourceIds: ["emailable_pricing"],
      },
      millionverifier: text("From ~$37–39", ["mv_prices", "mv_bouncezero"], {
        confirmed: false,
        confidence: "low",
        footnoteIds: ["fn_mv_entry"],
      }),
      kickbox: {
        kind: "price",
        value: 5,
        confirmed: false,
        confidence: "medium",
        note: "500 credits",
        sourceIds: ["kickbox_leadhaste"],
      },
      hunter: text("Starter from $34/mo (yearly)", ["hunter_pricing"], {
        confidence: "medium",
        footnoteIds: ["fn_hunter"],
      }),
    },
  },
  {
    id: "costToVerify",
    group: "pricing",
    label: "Cost to verify N emails",
    cells: {},
  },
  {
    id: "minimumPurchase",
    group: "pricing",
    label: "Minimum purchase",
    cells: {
      emailverifier: text("10,000 credits", ["ours_home"]),
      zerobounce: text("2,000 credits (PAYG)", ["zb_pricing"]),
      neverbounce: text("1,000 credits", ["nb_pricing"], { confidence: "medium" }),
      bouncer: text("1,000 credits", ["bouncer_pricing"]),
      emailable: text("5,000 credits", ["emailable_pricing"]),
      millionverifier: unverified({ sourceIds: ["mv_prices"] }),
      kickbox: text("500 credits", ["kickbox_leadhaste"], {
        confirmed: false,
        confidence: "medium",
      }),
      hunter: text("Plan minimum", ["hunter_pricing"], {
        confidence: "medium",
        footnoteIds: ["fn_hunter"],
      }),
    },
  },
  {
    id: "freeCredits",
    group: "pricing",
    label: "Free credits",
    cells: {
      emailverifier: text("100 on signup (no card) + 3 on-page checks", [
        "ours_home",
      ]),
      zerobounce: text("100 validation credits / month", ["zb_pricing"], {
        confidence: "high",
      }),
      neverbounce: text("Trial credits", ["nb_mailfloss"], {
        confirmed: false,
        confidence: "low",
        note: "Sources conflict on free trial amount",
      }),
      bouncer: text("100 free credits, no card", ["bouncer_pricing"]),
      emailable: text("250 on signup", ["emailable_pricing"], {
        confidence: "medium",
      }),
      millionverifier: text("100 via online checker", ["mv_prices"], {
        confidence: "medium",
        confirmed: false,
      }),
      kickbox: text("100 free verifications", ["kickbox_leadhaste"], {
        confirmed: false,
        confidence: "medium",
      }),
      hunter: text("50 credits / month (free plan)", ["hunter_pricing"], {
        confidence: "medium",
      }),
    },
  },
  {
    id: "creditsExpire",
    group: "pricing",
    label: "Credits expire?",
    cells: {
      emailverifier: text("Never", ["ours_home"]),
      zerobounce: text("Conditional", ["zb_faq"], {
        confidence: "medium",
        note: "Do not expire with active ONE; otherwise rules may apply",
      }),
      neverbounce: text("12 months after purchase (PAYG)", ["nb_mailfloss"], {
        confirmed: false,
        confidence: "medium",
      }),
      bouncer: text("Never", ["bouncer_pricing"]),
      emailable: text("Never", ["emailable_docs"], { confidence: "medium" }),
      millionverifier: text("Never", ["mv_bouncezero"], {
        confirmed: false,
        confidence: "medium",
      }),
      kickbox: unverified({ sourceIds: ["kickbox_leadhaste"] }),
      hunter: text("Plan allotment", ["hunter_pricing"], {
        confidence: "medium",
        footnoteIds: ["fn_hunter"],
      }),
    },
  },
  {
    id: "chargedUnknown",
    group: "pricing",
    label: 'Charged for "unknown" results?',
    cells: {
      emailverifier: unverified({
        note: "Not stated as a public refund policy on marketing pages",
        sourceIds: ["ours_home"],
      }),
      zerobounce: no(["zb_faq"], { note: "Unknown results not charged" }),
      neverbounce: unverified({ sourceIds: ["nb_pricing"] }),
      bouncer: no(["bouncer_pricing"], { note: "Unknown not charged" }),
      emailable: text("Refunded after list (third-party)", ["emailable_docs"], {
        confirmed: false,
        confidence: "medium",
        note: "Unknown/duplicates refunded after list completion",
      }),
      millionverifier: no(["mv_prices"], {
        note: "Not charged for unknown or catch-all",
      }),
      kickbox: text("Unknown refunded (third-party)", ["kickbox_leadhaste"], {
        confirmed: false,
        confidence: "medium",
      }),
      hunter: unverified({ sourceIds: ["hunter_pricing"] }),
    },
  },
  {
    id: "chargedCatchAll",
    group: "pricing",
    label: "Charged for catch-all results?",
    cells: {
      emailverifier: unverified({ sourceIds: ["ours_home"] }),
      zerobounce: unverified({ sourceIds: ["zb_pricing"] }),
      neverbounce: unverified({ sourceIds: ["nb_pricing"] }),
      bouncer: unverified({ sourceIds: ["bouncer_pricing"] }),
      emailable: unverified({ sourceIds: ["emailable_pricing"] }),
      millionverifier: no(["mv_prices"], {
        note: "Not charged for catch-all",
      }),
      kickbox: unverified({ sourceIds: ["kickbox_leadhaste"] }),
      hunter: unverified({ sourceIds: ["hunter_pricing"] }),
    },
  },
  {
    id: "smtpMailbox",
    group: "verification",
    label: "Syntax + MX + SMTP mailbox check",
    cells: {
      emailverifier: yes(["ours_home"]),
      zerobounce: yes(["zb_pricing"]),
      neverbounce: yes(["nb_pricing"], { confidence: "medium" }),
      bouncer: yes(["bouncer_pricing"]),
      emailable: yes(["emailable_pricing"], { confidence: "medium" }),
      millionverifier: yes(["mv_prices"], { confidence: "medium", confirmed: false }),
      kickbox: yes(["kickbox_leadhaste"], { confirmed: false, confidence: "medium" }),
      hunter: yes(["hunter_pricing"], { confidence: "medium" }),
    },
  },
  {
    id: "catchAllHandling",
    group: "verification",
    label: "Catch-all handling",
    cells: {
      emailverifier: text("Score 0–100 + catch-all status", ["ours_home"]),
      zerobounce: text("Detected (AI scoring optional)", ["zb_pricing"], {
        confidence: "medium",
      }),
      neverbounce: text("Label only (accept-all)", ["nb_mailfloss"], {
        confirmed: false,
        confidence: "medium",
      }),
      bouncer: text("Detected", ["bouncer_pricing"], { confidence: "medium" }),
      emailable: text("Catch-all check", ["emailable_pricing"], {
        confidence: "medium",
      }),
      millionverifier: text("Catch-all verifier", ["mv_prices"], {
        confidence: "medium",
        confirmed: false,
      }),
      kickbox: unverified({ sourceIds: ["kickbox_leadhaste"] }),
      hunter: unverified({ sourceIds: ["hunter_pricing"] }),
    },
  },
  {
    id: "disposable",
    group: "verification",
    label: "Disposable email detection",
    cells: {
      emailverifier: yes(["ours_home"]),
      zerobounce: yes(["zb_pricing"]),
      neverbounce: yes(["nb_pricing"], { confidence: "medium" }),
      bouncer: yes(["bouncer_pricing"]),
      emailable: yes(["emailable_pricing"], { confidence: "medium" }),
      millionverifier: yes(["mv_prices"], { confidence: "medium", confirmed: false }),
      kickbox: unverified({ sourceIds: ["kickbox_leadhaste"] }),
      hunter: unverified({ sourceIds: ["hunter_pricing"] }),
    },
  },
  {
    id: "roleBased",
    group: "verification",
    label: "Role-based detection",
    cells: {
      emailverifier: yes(["ours_home"]),
      zerobounce: yes(["zb_pricing"]),
      neverbounce: unverified({ sourceIds: ["nb_pricing"] }),
      bouncer: unverified({ sourceIds: ["bouncer_pricing"] }),
      emailable: unverified({ sourceIds: ["emailable_pricing"] }),
      millionverifier: unverified({ sourceIds: ["mv_prices"] }),
      kickbox: unverified({ sourceIds: ["kickbox_leadhaste"] }),
      hunter: unverified({ sourceIds: ["hunter_pricing"] }),
    },
  },
  {
    id: "spamTrap",
    group: "verification",
    label: "Spam-trap detection",
    cells: {
      emailverifier: yes(["ours_home"]),
      zerobounce: yes(["zb_pricing"]),
      neverbounce: yes(["nb_pricing"], { confidence: "medium" }),
      bouncer: unverified({ sourceIds: ["bouncer_pricing"] }),
      emailable: unverified({ sourceIds: ["emailable_pricing"] }),
      millionverifier: unverified({ sourceIds: ["mv_prices"] }),
      kickbox: unverified({ sourceIds: ["kickbox_leadhaste"] }),
      hunter: unverified({ sourceIds: ["hunter_pricing"] }),
    },
  },
  {
    id: "deliverabilityScore",
    group: "verification",
    label: "Deliverability score",
    cells: {
      emailverifier: text("0–100 confidence score", ["ours_home"]),
      zerobounce: partial("AI scoring (extra credit)", ["zb_pricing"]),
      neverbounce: text("Accept-all label only (third-party)", ["nb_mailfloss"], {
        confirmed: false,
        confidence: "medium",
      }),
      bouncer: partial("Toxicity / engagement insights", ["bouncer_pricing"], {
        confidence: "medium",
      }),
      emailable: unverified({ sourceIds: ["emailable_pricing"] }),
      millionverifier: unverified({ sourceIds: ["mv_prices"] }),
      kickbox: unverified({ sourceIds: ["kickbox_leadhaste"] }),
      hunter: unverified({ sourceIds: ["hunter_pricing"] }),
    },
  },
  {
    id: "bulkCsv",
    group: "verification",
    label: "Bulk CSV upload",
    cells: {
      emailverifier: yes(["ours_home"]),
      zerobounce: yes(["zb_pricing"]),
      neverbounce: yes(["nb_pricing"]),
      bouncer: yes(["bouncer_pricing"]),
      emailable: yes(["emailable_pricing"]),
      millionverifier: yes(["mv_prices"], { confirmed: false, confidence: "medium" }),
      kickbox: yes(["kickbox_leadhaste"], { confirmed: false, confidence: "medium" }),
      hunter: yes(["hunter_pricing"], { confidence: "medium" }),
    },
  },
  {
    id: "realtimeApi",
    group: "verification",
    label: "Real-time API",
    cells: {
      emailverifier: yes(["ours_home"]),
      zerobounce: yes(["zb_pricing"]),
      neverbounce: yes(["nb_pricing"]),
      bouncer: yes(["bouncer_pricing"]),
      emailable: yes(["emailable_pricing"]),
      millionverifier: yes(["mv_prices"], { confirmed: false, confidence: "medium" }),
      kickbox: yes(["kickbox_leadhaste"], { confirmed: false, confidence: "medium" }),
      hunter: yes(["hunter_pricing"], { confidence: "medium" }),
    },
  },
  {
    id: "unlimitedApiKeys",
    group: "verification",
    label: "Unlimited API keys",
    cells: {
      emailverifier: yes(["ours_home"]),
      zerobounce: text("Multiple API keys", ["zb_pricing"], { confidence: "medium" }),
      neverbounce: unverified({ sourceIds: ["nb_pricing"] }),
      bouncer: unverified({ sourceIds: ["bouncer_pricing"] }),
      emailable: unverified({ sourceIds: ["emailable_pricing"] }),
      millionverifier: unverified({ sourceIds: ["mv_prices"] }),
      kickbox: unverified({ sourceIds: ["kickbox_leadhaste"] }),
      hunter: unverified({ sourceIds: ["hunter_pricing"] }),
    },
  },
  {
    id: "integrations",
    group: "verification",
    label: "Integrations",
    cells: {
      emailverifier: text("Google Sheets, HubSpot, Salesforce, Drive", ["ours_home"], {
        footnoteIds: ["fn_integrations"],
      }),
      zerobounce: text("Multiple (API + apps)", ["zb_pricing"], {
        confidence: "medium",
      }),
      neverbounce: text("30+ (Mailchimp, HubSpot, Marketo…)", ["nb_pricing"], {
        confidence: "medium",
      }),
      bouncer: text("CRM AutoClean + API", ["bouncer_pricing"], {
        confidence: "medium",
      }),
      emailable: text("API + widget", ["emailable_pricing"], {
        confidence: "medium",
      }),
      millionverifier: text("40+ integrations (claimed)", ["mv_prices"], {
        confirmed: false,
        confidence: "medium",
      }),
      kickbox: text("API-first", ["kickbox_leadhaste"], {
        confirmed: false,
        confidence: "medium",
      }),
      hunter: text("Finder + outreach suite", ["hunter_pricing"], {
        confidence: "medium",
        footnoteIds: ["fn_hunter"],
      }),
    },
  },
  {
    id: "emailFinder",
    group: "beyond",
    label: "Email Finder",
    cells: {
      emailverifier: text("Included (5 credits/find; free if not found)", [
        "ours_home",
      ]),
      zerobounce: text("Email Finder (20 credits / successful query)", ["zb_pricing"], {
        confidence: "high",
      }),
      neverbounce: text("Not offered (verification-only, third-party)", ["nb_mailfloss"], {
        confirmed: false,
        confidence: "medium",
      }),
      bouncer: no(["bouncer_pricing"], {
        note: "Enrichment only; finder not offered",
      }),
      emailable: unverified({ sourceIds: ["emailable_pricing"] }),
      millionverifier: unverified({ sourceIds: ["mv_prices"] }),
      kickbox: text("Not offered (third-party)", ["kickbox_leadhaste"], {
        confirmed: false,
        confidence: "medium",
      }),
      hunter: text("Core product (0.5 credit to verify)", ["hunter_pricing"], {
        confidence: "medium",
        footnoteIds: ["fn_hunter"],
      }),
    },
  },
  {
    id: "leadSearch",
    group: "beyond",
    label: "Lead search / lead lists",
    cells: {
      emailverifier: yes(["ours_home"]),
      zerobounce: unverified({ sourceIds: ["zb_pricing"] }),
      neverbounce: text("Not offered (third-party)", ["nb_mailfloss"], {
        confirmed: false,
        confidence: "medium",
      }),
      bouncer: no(["bouncer_pricing"]),
      emailable: unverified({ sourceIds: ["emailable_pricing"] }),
      millionverifier: unverified({ sourceIds: ["mv_prices"] }),
      kickbox: text("Not offered (third-party)", ["kickbox_leadhaste"], {
        confirmed: false,
        confidence: "medium",
      }),
      hunter: yes(["hunter_pricing"], {
        confidence: "medium",
        footnoteIds: ["fn_hunter"],
      }),
    },
  },
  {
    id: "bulkEnrichment",
    group: "beyond",
    label: "Bulk enrichment",
    cells: {
      emailverifier: yes(["ours_home"]),
      zerobounce: partial("Domain search / activity data", ["zb_pricing"]),
      neverbounce: unverified({ sourceIds: ["nb_pricing"] }),
      bouncer: yes(["bouncer_pricing"], { note: "Data Enrichment" }),
      emailable: unverified({ sourceIds: ["emailable_pricing"] }),
      millionverifier: unverified({ sourceIds: ["mv_prices"] }),
      kickbox: unverified({ sourceIds: ["kickbox_leadhaste"] }),
      hunter: yes(["hunter_pricing"], {
        confidence: "medium",
        footnoteIds: ["fn_hunter"],
      }),
    },
  },
  {
    id: "teamAccess",
    group: "beyond",
    label: "Team access",
    cells: {
      emailverifier: yes(["ours_home"]),
      zerobounce: unverified({ sourceIds: ["zb_pricing"] }),
      neverbounce: unverified({ sourceIds: ["nb_pricing"] }),
      bouncer: unverified({ sourceIds: ["bouncer_pricing"] }),
      emailable: unverified({ sourceIds: ["emailable_pricing"] }),
      millionverifier: unverified({ sourceIds: ["mv_prices"] }),
      kickbox: unverified({ sourceIds: ["kickbox_leadhaste"] }),
      hunter: yes(["hunter_pricing"], {
        confidence: "medium",
        footnoteIds: ["fn_hunter"],
      }),
    },
  },
  {
    id: "deliverabilityTools",
    group: "beyond",
    label: "Deliverability tools",
    cells: {
      emailverifier: text("Not a separate deliverability suite", ["ours_home"], {
        confidence: "high",
      }),
      zerobounce: text(
        "ONE: warm-up, inbox placement, blacklist, DMARC, dashboard",
        ["zb_pricing"],
        { confidence: "high" }
      ),
      neverbounce: text("CRM auto-sync / parallel list cleaning (Growth)", ["nb_emelia"], {
        confidence: "medium",
        confirmed: false,
      }),
      bouncer: text("Deliverability Kit (separate, from ~$25/mo)", ["bouncer_pricing"], {
        confidence: "high",
      }),
      emailable: text("Inbox Reports + blacklist monitors (credit-priced)", ["emailable_pricing"], {
        confidence: "medium",
      }),
      millionverifier: unverified({ sourceIds: ["mv_prices"] }),
      kickbox: text("Monitoring suite discontinued (third-party)", ["kickbox_leadhaste"], {
        confirmed: false,
        confidence: "medium",
      }),
      hunter: text("Outreach suite tools", ["hunter_pricing"], {
        confidence: "medium",
        footnoteIds: ["fn_hunter"],
      }),
    },
  },
  {
    id: "accuracyClaim",
    group: "trust",
    label: "Accuracy claim / guarantee (claimed)",
    cells: {
      emailverifier: text(
        "99.7% Accuracy Guarantee — instant 100% credit refund if another verifier beats our accuracy (our terms apply)",
        ["ours_home", "ours_terms"],
        { footnoteIds: ["fn_accuracy"] }
      ),
      zerobounce: text("99.6% accuracy guarantee (claimed)", ["zb_pricing"], {
        confidence: "high",
      }),
      neverbounce: text("99.9% accuracy (claimed)", ["nb_pricing"], {
        confidence: "medium",
      }),
      bouncer: text("99.5% accuracy (claimed)", ["bouncer_pricing"]),
      emailable: text("99% deliverability guarantee (claimed)", ["emailable_pricing"], {
        confidence: "medium",
      }),
      millionverifier: text(
        "99%+ accuracy claimed; 100% money-back if hard-bounce > 4% after verifying",
        ["mv_prices"],
        { confidence: "medium" }
      ),
      kickbox: unverified({ sourceIds: ["kickbox_leadhaste"] }),
      hunter: unverified({ sourceIds: ["hunter_pricing"] }),
    },
  },
  {
    id: "compliance",
    group: "trust",
    label: "Compliance",
    cells: {
      emailverifier: text("GDPR and CCPA", ["ours_home"]),
      zerobounce: text("GDPR", ["zb_pricing"], { confidence: "high" }),
      neverbounce: unverified({ sourceIds: ["nb_pricing"] }),
      bouncer: text("GDPR (EU-hosted)", ["bouncer_pricing"]),
      emailable: text("SOC 2 Type II (third-party)", ["emailable_prospeo"], {
        confirmed: false,
        confidence: "medium",
      }),
      millionverifier: text("GDPR; SOC 2 controls (vendor footer)", ["mv_prices"], {
        confidence: "medium",
        confirmed: false,
      }),
      kickbox: unverified({ sourceIds: ["kickbox_leadhaste"] }),
      hunter: unverified({ sourceIds: ["hunter_pricing"] }),
    },
  },
  {
    id: "listRetention",
    group: "trust",
    label: "List data retention",
    cells: {
      emailverifier: text("30 days, then deleted", ["ours_home"]),
      zerobounce: text("30 days after upload", ["zb_pricing"], {
        confidence: "high",
      }),
      neverbounce: unverified({ sourceIds: ["nb_pricing"] }),
      bouncer: unverified({ sourceIds: ["bouncer_pricing"] }),
      emailable: unverified({ sourceIds: ["emailable_pricing"] }),
      millionverifier: unverified({ sourceIds: ["mv_prices"] }),
      kickbox: unverified({ sourceIds: ["kickbox_leadhaste"] }),
      hunter: unverified({ sourceIds: ["hunter_pricing"] }),
    },
  },
];

export function resolveRowCells(
  row: ComparisonRow,
  volume: VolumeOption
): Record<VendorId, ComparisonCell> {
  if (row.id === "costToVerify") {
    return costToVerifyCells(volume);
  }
  const out = {} as Record<VendorId, ComparisonCell>;
  for (const vendor of vendors) {
    out[vendor.id] =
      row.cells[vendor.id] ??
      unverified({ confidence: "low" });
  }
  return out;
}

/** Every competitor cell must be sourced or explicitly unverified/unconfirmed. */
export function assertCompetitorCellsTraceable(): string[] {
  const problems: string[] = [];
  for (const row of comparisonRows) {
    if (row.id === "costToVerify") {
      for (const volume of VOLUME_OPTIONS) {
        const cells = costToVerifyCells(volume);
        for (const vendor of vendors) {
          if (vendor.id === "emailverifier") continue;
          checkCell(`${row.id}@${volume}/${vendor.id}`, cells[vendor.id], problems);
        }
      }
      continue;
    }
    for (const vendor of vendors) {
      if (vendor.id === "emailverifier") continue;
      const cell = row.cells[vendor.id];
      if (!cell) {
        problems.push(`${row.id}/${vendor.id}: missing cell`);
        continue;
      }
      checkCell(`${row.id}/${vendor.id}`, cell, problems);
    }
  }
  return problems;
}

function checkCell(path: string, cell: ComparisonCell, problems: string[]) {
  const sourced = Boolean(cell.sourceIds && cell.sourceIds.length > 0);
  if (cell.kind === "unverified") {
    if (!sourced && cell.confirmed !== false) {
      problems.push(`${path}: unverified without sourceIds or confirmed:false`);
    }
    return;
  }
  if (cell.kind === "no" && cell.confirmed !== true) {
    problems.push(`${path}: "no" without confirmed:true`);
  }
  if (!sourced && cell.confirmed !== false) {
    problems.push(`${path}: missing sourceIds`);
  }
}

export function formatUsd(amount: number): string {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

export function formatVolumeLabel(volume: VolumeOption): string {
  if (volume >= 1_000_000) return `${volume / 1_000_000}M`;
  return `${volume / 1_000}K`;
}
