import Image from "next/image";
import {
  INTEGRATIONS,
  INTEGRATION_STATUS_LABEL,
  type Integration,
} from "@/lib/integrations";
import { cn } from "@/lib/utils";

const GUIDE_ROWS = [
  {
    tag: "Email Validator",
    title: "How to verify an email address online",
    readTime: "4 min",
  },
  {
    tag: "Bulk Email Verifier",
    title: "How to clean a CSV email list",
    readTime: "6 min",
  },
  {
    tag: "Email Validation API",
    title: "Integrate the API in 5 minutes",
    readTime: "5 min",
  },
] as const;

const HERO_INTEGRATION_IDS = [
  "google-drive",
  "hubspot",
  "onedrive",
  "salesforce",
] as const;

const FEATURE_INTEGRATION_IDS = [
  "google-drive",
  "onedrive",
  "hubspot",
  "salesforce",
  "google-sheets",
  "dropbox",
  "airtable",
] as const;

function integrationById(id: string): Integration | undefined {
  return INTEGRATIONS.find((item) => item.id === id);
}

function SoonBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "rounded-full bg-line px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-ink-muted",
        className,
      )}
    >
      {INTEGRATION_STATUS_LABEL.soon}
    </span>
  );
}

export function GuidesListMockup({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]",
        className,
      )}
      aria-hidden
    >
      <div className="border-b border-line bg-surface-muted px-4 py-3">
        <p className="text-xs font-semibold text-ink">Guides</p>
        <p className="text-[11px] text-ink-muted">Task-based how-tos</p>
      </div>
      <ul className="divide-y divide-line p-0">
        {GUIDE_ROWS.map((row) => (
          <li key={row.title} className="px-4 py-3">
            <span className="text-[11px] font-medium text-primary">
              {row.tag}
            </span>
            <p className="mt-1 text-sm font-semibold leading-snug text-ink">
              {row.title}
            </p>
            <p className="mt-1 text-[11px] text-ink-muted">{row.readTime} read</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function IntegrationsTilesMockup({
  className,
  ids = FEATURE_INTEGRATION_IDS,
}: {
  className?: string;
  ids?: readonly string[];
}) {
  const items = ids
    .map((id) => integrationById(id))
    .filter((item): item is Integration => Boolean(item && item.logo));

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow-card)] sm:p-5",
        className,
      )}
      aria-hidden
    >
      <p className="text-xs font-semibold text-ink">Integrations</p>
      <p className="mt-0.5 text-[11px] text-ink-muted">
        Import where your lists already live
      </p>
      <ul className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="relative flex flex-col items-center gap-1.5 rounded-xl border border-line bg-surface-muted/70 px-2 py-3 text-center"
          >
            {item.status === "soon" ? (
              <SoonBadge className="absolute top-1 right-1" />
            ) : null}
            <Image
              src={item.logo!}
              alt=""
              width={28}
              height={28}
              unoptimized
              className="h-7 w-7 object-contain"
            />
            <span className="text-[10px] font-medium leading-tight text-ink">
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BlogPostMockup({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]",
        className,
      )}
      aria-hidden
    >
      <div
        className="aspect-[16/10] border-b border-line bg-primary-soft"
        /* 1-off: soft panel stands in for featured post art without new assets */
      />
      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap gap-1.5">
          {["List Cleaning", "Email Verification API", "Deliverability"].map(
            (chip) => (
              <span
                key={chip}
                className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-medium text-primary"
              >
                {chip}
              </span>
            ),
          )}
        </div>
        <p className="mt-3 text-sm font-semibold leading-snug text-ink sm:text-base">
          Email Verifier Comparison 2026: Pricing, Bulk Cleaning &amp; API
          Options
        </p>
        <p className="mt-2 text-[11px] text-ink-muted">
          Jun 24, 2026 · Alex Rivera
        </p>
      </div>
    </div>
  );
}

/** Compact composite used inside the resources hero browser frame. */
export function ResourcesHeroPreview() {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-line bg-surface-muted/60 p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
          Guide
        </p>
        <p className="mt-1 text-xs font-semibold text-ink">
          How to clean a CSV email list
        </p>
        <p className="mt-0.5 text-[10px] text-primary">
          Bulk Email Verifier · 6 min
        </p>
      </div>

      <div>
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
          Integrations
        </p>
        <ul className="grid grid-cols-4 gap-1.5">
          {HERO_INTEGRATION_IDS.map((id) => {
            const item = integrationById(id);
            if (!item?.logo) return null;
            return (
              <li
                key={id}
                className="relative flex flex-col items-center gap-1 rounded-lg border border-line bg-surface px-1 py-2"
              >
                {item.status === "soon" ? (
                  <SoonBadge className="absolute top-0.5 right-0.5 px-1 py-0 text-[7px]" />
                ) : null}
                <Image
                  src={item.logo}
                  alt=""
                  width={20}
                  height={20}
                  unoptimized
                  className="h-5 w-5 object-contain"
                />
                <span className="truncate text-[8px] font-medium text-ink">
                  {item.name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="rounded-xl border border-line bg-surface p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
          Blog
        </p>
        <div className="mt-1.5 flex flex-wrap gap-1">
          <span className="rounded-full bg-primary-soft px-1.5 py-0.5 text-[9px] font-medium text-primary">
            List Cleaning
          </span>
          <span className="rounded-full bg-primary-soft px-1.5 py-0.5 text-[9px] font-medium text-primary">
            Deliverability
          </span>
        </div>
        <p className="mt-1.5 text-xs font-semibold leading-snug text-ink">
          Email Verifier Comparison 2026
        </p>
        <p className="mt-0.5 text-[10px] text-ink-muted">
          Jun 24, 2026 · Alex Rivera
        </p>
      </div>
    </div>
  );
}
