export const RATE_PER_THOUSAND = 1.8;
export const SEASONAL_MAX = 100_000;
export const VOLUME_MIN = 1_000;
export const VOLUME_STEP = 1_000;
export const DEFAULT_VOLUME = 10_000;
export const UNLIMITED_MONTHLY_EMAIL_CAP = 100_000;
export const UNLIMITED_PRICE_MONTHLY =
  (UNLIMITED_MONTHLY_EMAIL_CAP / 1000) * RATE_PER_THOUSAND; // $180 at $1.80/1K for 100K
export const UNLIMITED_TOTAL_SPOTS = 100;

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

export const UNLIMITED_FEATURES = [
  "100,000 emails per month",
  "Bulk & Real-Time Verification",
  "API Access",
  "CSV List Cleaning",
  "Disposable Email Detection",
  "Role-based Filtering",
] as const;
