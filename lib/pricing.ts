export const RATE_PER_THOUSAND = 1.8;
export const SEASONAL_MAX = 10_000_000;
export const VOLUME_MIN = 1_000;
export const VOLUME_STEP = 1_000;
export const DEFAULT_VOLUME = 10_000;
/** Advertised Unlimited base price (maps to the 10K volume tier). */
export const UNLIMITED_PRICE_MONTHLY = 299;
export const UNLIMITED_TOTAL_SPOTS = 100;
export const DEFAULT_UNLIMITED_VOLUME = 10_000;

/**
 * Explicit Unlimited volume → monthly USD tiers.
 * Lowest tier (10K) = advertised $299/mo. Higher volumes scale up;
 * not derived from RATE_PER_THOUSAND (Pay As You Go stays separate).
 */
export const UNLIMITED_VOLUME_TIERS = [
  { volume: 10_000, priceMonthly: 299 },
  { volume: 25_000, priceMonthly: 399 },
  { volume: 50_000, priceMonthly: 549 },
  { volume: 100_000, priceMonthly: 799 },
  { volume: 500_000, priceMonthly: 1_499 },
  { volume: 1_000_000, priceMonthly: 2_499 },
  { volume: 5_000_000, priceMonthly: 6_999 },
  { volume: 10_000_000, priceMonthly: 9_999 },
] as const;

export type UnlimitedVolume =
  (typeof UNLIMITED_VOLUME_TIERS)[number]["volume"];

const DEFAULT_OFFER_ENDS_AT = "2026-09-10T23:59:59";

export const BUY_CREDITS_URL = "https://app.emailverifier.io/signin";
export const START_UNLIMITED_URL = "https://app.emailverifier.io/register";

export const PRESETS = [
  10_000,
  25_000,
  50_000,
  100_000,
  500_000,
  1_000_000,
  5_000_000,
  10_000_000,
] as const;

export type VolumePreset = (typeof PRESETS)[number];

export function isSeasonalPreset(volume: number): boolean {
  return volume <= SEASONAL_MAX;
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

/** Monthly USD for an Unlimited volume tier. Falls back to base $299. */
export function getUnlimitedMonthlyPrice(volume: number): number {
  const tier = UNLIMITED_VOLUME_TIERS.find((t) => t.volume === volume);
  return tier?.priceMonthly ?? UNLIMITED_PRICE_MONTHLY;
}

export function isUnlimitedVolume(volume: number): volume is UnlimitedVolume {
  return UNLIMITED_VOLUME_TIERS.some((t) => t.volume === volume);
}

export function calculatePrice(emails: number): { usd: string } {
  const priceUSD = (emails / 1000) * RATE_PER_THOUSAND;
  return { usd: priceUSD.toFixed(2) };
}

/** Snap to step, then clamp within the seasonal range. */
export function clampSeasonalVolume(value: number): number {
  if (!Number.isFinite(value)) return DEFAULT_VOLUME;
  const stepped = Math.round(value / VOLUME_STEP) * VOLUME_STEP;
  return Math.min(SEASONAL_MAX, Math.max(VOLUME_MIN, stepped));
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

export const SEASONAL_FEATURES = [
  "Bulk & Real-Time Verification",
  "API Access",
  "CSV List Cleaning",
  "Disposable Email Detection",
  "Role-based Filtering",
  "No Expiration",
] as const;

export const UNLIMITED_FEATURES = ["Discover leads"] as const;
