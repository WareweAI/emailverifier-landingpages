/**
 * Credit pack prices — source of truth from
 * https://app.emailverifier.io/dashboard/billing (captured Oct 2026).
 * Comparison baseline: 10K packs at $20 ($2.00 / 1,000).
 */
export const PACK_COMPARE_PER_THOUSAND = 2;

/** Entry rate at the 25K pack ($0.0018 / email). */
export const RATE_PER_THOUSAND = 1.8;

export const CREDIT_PACKS = [
  { credits: 25_000, priceUsd: 45, listUsd: 50, savePct: 10 },
  { credits: 50_000, priceUsd: 80, listUsd: 100, savePct: 20 },
  { credits: 100_000, priceUsd: 140, listUsd: 200, savePct: 30 },
  { credits: 500_000, priceUsd: 500, listUsd: 1_000, savePct: 50 },
  { credits: 1_000_000, priceUsd: 800, listUsd: 2_000, savePct: 60 },
  { credits: 10_000_000, priceUsd: 5_000, listUsd: 20_000, savePct: 75 },
] as const;

export type CreditPack = (typeof CREDIT_PACKS)[number];

export const PRESETS = CREDIT_PACKS.map((p) => p.credits);

/** Homepage calculator — same packs as dashboard billing. */
export const HOMEPAGE_PRESETS = PRESETS;

export const VOLUME_MIN = CREDIT_PACKS[0].credits;
export const VOLUME_MAX = CREDIT_PACKS[CREDIT_PACKS.length - 1].credits;
/** @deprecated Use VOLUME_MAX — kept for older seasonal naming */
export const SEASONAL_MAX = VOLUME_MAX;
export const VOLUME_STEP = 1_000;
export const DEFAULT_VOLUME = 25_000;

export const UNLIMITED_PRICE_MONTHLY = 299;
export const UNLIMITED_TOTAL_SPOTS = 100;

const DEFAULT_OFFER_ENDS_AT = "2026-09-10T23:59:59";

export const BUY_CREDITS_URL = "https://app.emailverifier.io/dashboard/billing";
export const START_UNLIMITED_URL = "https://app.emailverifier.io/register";

export type VolumePreset = (typeof PRESETS)[number];

export function isSeasonalPreset(volume: number): boolean {
  return CREDIT_PACKS.some((p) => p.credits === volume);
}

export function getCreditPack(credits: number): CreditPack | undefined {
  return CREDIT_PACKS.find((p) => p.credits === credits);
}

/** Nearest purchasable pack (rounds up when between packs). */
export function nearestCreditPack(credits: number): CreditPack {
  if (!Number.isFinite(credits) || credits <= CREDIT_PACKS[0].credits) {
    return CREDIT_PACKS[0];
  }
  for (const pack of CREDIT_PACKS) {
    if (credits <= pack.credits) return pack;
  }
  return CREDIT_PACKS[CREDIT_PACKS.length - 1];
}

export function formatNumber(num: number): string {
  return num.toLocaleString("en-US");
}

export function formatPresetLabel(volume: number): string {
  if (volume >= 1_000_000) {
    return `${volume / 1_000_000}M`;
  }
  return `${volume / 1_000}K`;
}

export type PriceQuote = {
  usd: string;
  priceUsd: number;
  listUsd: number;
  listUsdFormatted: string;
  savePct: number;
  ratePerEmail: number;
  ratePerThousand: number;
};

export function calculatePrice(emails: number): PriceQuote {
  const pack = nearestCreditPack(emails);
  const ratePerEmail = pack.priceUsd / pack.credits;
  return {
    usd: pack.priceUsd.toLocaleString("en-US", {
      minimumFractionDigits: pack.priceUsd % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }),
    priceUsd: pack.priceUsd,
    listUsd: pack.listUsd,
    listUsdFormatted: pack.listUsd.toLocaleString("en-US", {
      minimumFractionDigits: pack.listUsd % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }),
    savePct: pack.savePct,
    ratePerEmail,
    ratePerThousand: ratePerEmail * 1000,
  };
}

/** Snap to a purchasable credit pack. */
export function clampSeasonalVolume(value: number): number {
  return nearestCreditPack(value).credits;
}

/** Step to the previous/next pack. */
export function stepCreditPack(
  current: number,
  direction: -1 | 1
): number {
  const idx = CREDIT_PACKS.findIndex((p) => p.credits === current);
  const from =
    idx >= 0 ? idx : CREDIT_PACKS.indexOf(nearestCreditPack(current));
  const next = Math.min(
    CREDIT_PACKS.length - 1,
    Math.max(0, from + direction)
  );
  return CREDIT_PACKS[next].credits;
}

/** Remaining Unlimited spots from env (manual). Clamped to 0…100. */
export function getUnlimitedSpotsLeft(): number {
  const raw = process.env.NEXT_PUBLIC_UNLIMITED_SPOTS_LEFT;
  const parsed = raw === undefined || raw === "" ? UNLIMITED_TOTAL_SPOTS : Number(raw);
  if (!Number.isFinite(parsed)) return UNLIMITED_TOTAL_SPOTS;
  return Math.min(UNLIMITED_TOTAL_SPOTS, Math.max(0, Math.floor(parsed)));
}

/** Offer end datetime from env. Fallback: 10 Sep 2026 end of day. */
export function getUnlimitedOfferEndsAt(): Date {
  const raw =
    process.env.NEXT_PUBLIC_UNLIMITED_OFFER_ENDS_AT?.trim() || DEFAULT_OFFER_ENDS_AT;
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) {
    return new Date(DEFAULT_OFFER_ENDS_AT);
  }
  return date;
}

/** Included with every credit pack (matches dashboard billing checklist). */
export const SEASONAL_FEATURES = [
  "Verify Emails",
  "Find Emails",
  "API Access",
  "Unlimited API Keys",
  "Search Leads",
  "Lead lists",
  "Team",
  "Credits never expire",
] as const;

export const UNLIMITED_FEATURES = [
  "Unlimited emails/month",
  "Bulk & Real-Time Verification",
  "API Access",
  "CSV List Cleaning",
  "Disposable Email Detection",
  "Role-based Filtering",
] as const;
