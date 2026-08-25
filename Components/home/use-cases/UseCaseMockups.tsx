import type { ReactNode } from "react";
import {
  CheckCircle2,
  FileSpreadsheet,
  ShoppingBag,
  UserRound,
  XCircle,
} from "lucide-react";
import { StatusChip } from "@/Components/ui/StatusChip";
import { cn } from "@/lib/utils";

type MockFrameProps = {
  children: ReactNode;
  className?: string;
  /** Wider media well for spanning cards */
  tall?: boolean;
};

/**
 * Pattern well that bleeds to all four edges, with an inset product surface.
 * Reuses hiw-storyboard-dots for brand continuity with How-it-works.
 */
export function UseCaseMockFrame({
  children,
  className,
  tall = false,
}: MockFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        tall ? "h-48 sm:h-52" : "h-40 sm:h-44",
        className
      )}
      aria-hidden
    >
      {/* Full-bleed pattern + soft wash — covers every edge */}
      <div className="pointer-events-none absolute inset-0 bg-surface-muted">
        <div className="absolute inset-0 bg-primary-soft/80" />
        <div className="absolute inset-0 hiw-storyboard-dots opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute -left-8 -top-10 h-32 w-36 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -right-6 bottom-0 h-24 w-28 rounded-full bg-success/10 blur-2xl" />
      </div>

      <div className="relative flex h-full items-end p-3 sm:p-3.5">
        <div
          className={cn(
            "w-full overflow-hidden rounded-xl border border-line bg-surface",
            "hiw-storyboard-elevate transition-transform duration-300 ease-out",
            "group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-y-0"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/** Marketing — campaign list ready to send with status mix */
export function MarketingMockup() {
  return (
    <div className="p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-ink">
            spring_nurture.csv
          </p>
          <p className="text-[10px] text-ink-muted">Campaign list · Example</p>
        </div>
        <span className="shrink-0 rounded-md bg-success-soft px-2 py-0.5 text-[10px] font-semibold text-success">
          Ready to send
        </span>
      </div>
      <div className="mt-2.5 flex h-1.5 overflow-hidden rounded-full">
        <div className="w-[74%] bg-success" />
        <div className="w-[12%] bg-warning" />
        <div className="w-[14%] bg-danger" />
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <StatusChip label="Valid 74%" variant="success" showIcon={false} />
        <StatusChip label="Risky 12%" variant="warning" showIcon={false} />
        <StatusChip label="Invalid 14%" variant="danger" showIcon={false} />
      </div>
      <ul className="mt-2 space-y-1.5">
        {(
          [
            { email: "maya@studio.co", label: "Valid", variant: "success" as const },
            { email: "gone@old.host", label: "Invalid", variant: "danger" as const },
          ] as const
        ).map((row) => (
          <li
            key={row.email}
            className="flex items-center justify-between gap-2 rounded-lg bg-surface-muted px-2 py-1.5 text-xs"
          >
            <span className="truncate text-ink">{row.email}</span>
            <StatusChip label={row.label} variant={row.variant} showIcon={false} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Sales — outreach queue with verify / skip */
export function SalesMockup() {
  return (
    <div className="p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold text-ink">Sequence queue</p>
        <span className="text-[10px] text-ink-muted">Step 1 · Email</span>
      </div>
      <ul className="mt-2.5 space-y-1.5">
        {(
          [
            {
              name: "Jordan Lee",
              email: "jordan@acme.io",
              action: "Send",
              ok: true,
            },
            {
              name: "Sam Rivera",
              email: "info@vendor.co",
              action: "Skip",
              ok: false,
            },
            {
              name: "Priya Shah",
              email: "priya@product.dev",
              action: "Send",
              ok: true,
            },
          ] as const
        ).map((row) => (
          <li
            key={row.email}
            className="flex items-center gap-2 rounded-lg border border-line px-2 py-1.5"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-[10px] font-semibold text-primary">
              {row.name.charAt(0)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-medium text-ink">
                {row.name}
              </p>
              <p className="truncate text-[10px] text-ink-muted">{row.email}</p>
            </div>
            <span
              className={cn(
                "shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold",
                row.ok
                  ? "bg-success-soft text-success"
                  : "bg-danger-soft text-danger"
              )}
            >
              {row.action}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** SaaS — signup gate with disposable blocked */
export function SaasMockup() {
  return (
    <div className="p-3">
      <div className="flex items-center gap-1.5">
        <UserRound className="h-3.5 w-3.5 text-primary" />
        <p className="text-xs font-semibold text-ink">Create account</p>
      </div>
      <div className="mt-2.5 rounded-lg border border-line bg-surface-muted px-2.5 py-2">
        <p className="text-[10px] font-medium text-ink-muted">Work email</p>
        <p className="mt-0.5 truncate font-mono text-[11px] text-ink">
          temp@mailinator.com
        </p>
      </div>
      <div className="mt-2 flex items-start gap-2 rounded-lg border border-danger/25 bg-danger-soft px-2.5 py-2">
        <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-danger" />
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-danger">
            Disposable blocked
          </p>
          <p className="mt-0.5 text-[10px] text-ink-muted">
            API · status: invalid · disposable: true
          </p>
        </div>
      </div>
      <p className="mt-2 flex items-center gap-1 text-[10px] text-success">
        <CheckCircle2 className="h-3 w-3" />
        Real-time check before account create
      </p>
    </div>
  );
}

/** E-commerce — abandoned cart recovery hygiene */
export function EcommerceMockup() {
  return (
    <div className="p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <ShoppingBag className="h-3.5 w-3.5 shrink-0 text-primary" />
          <p className="truncate text-xs font-semibold text-ink">
            Abandoned cart recovery
          </p>
        </div>
        <span className="shrink-0 text-[10px] text-ink-muted">Example</span>
      </div>
      <ul className="mt-2.5 space-y-1.5">
        {(
          [
            {
              email: "alex@shopper.com",
              cart: "$84 cart",
              label: "Valid",
              variant: "success" as const,
            },
            {
              email: "bounce@old.host",
              cart: "$52 cart",
              label: "Invalid",
              variant: "danger" as const,
            },
            {
              email: "sam@catch-all.co",
              cart: "$120 cart",
              label: "Risky",
              variant: "warning" as const,
            },
          ] as const
        ).map((row) => (
          <li
            key={row.email}
            className="flex items-center justify-between gap-2 rounded-lg border border-line px-2 py-1.5"
          >
            <div className="min-w-0">
              <p className="truncate text-[11px] font-medium text-ink">
                {row.email}
              </p>
              <p className="text-[10px] text-ink-muted">{row.cart}</p>
            </div>
            <StatusChip label={row.label} variant={row.variant} showIcon={false} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Agency — client list quality report */
export function AgencyMockup() {
  return (
    <div className="p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <FileSpreadsheet className="h-3.5 w-3.5 shrink-0 text-primary" />
          <p className="truncate text-xs font-semibold text-ink">
            Client report · Northwind
          </p>
        </div>
        <span className="shrink-0 text-[10px] text-ink-muted">Example</span>
      </div>
      <div className="mt-2.5 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-line bg-surface-muted px-2.5 py-2">
          <p className="text-[10px] font-medium text-ink-muted">Before</p>
          <p className="mt-1 text-[11px] font-semibold text-ink">12,400 rows</p>
          <p className="mt-0.5 text-[10px] text-ink-muted">Unverified CSV</p>
        </div>
        <div className="rounded-lg border border-success/20 bg-success-soft px-2.5 py-2">
          <p className="text-[10px] font-medium text-success">After clean</p>
          <p className="mt-1 text-[11px] font-semibold tabular-nums text-ink">
            9,180 valid
          </p>
          <p className="mt-0.5 text-[10px] text-ink-muted">Example mix</p>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        <StatusChip label="Valid" variant="success" showIcon={false} />
        <StatusChip label="Risky" variant="warning" showIcon={false} />
        <StatusChip label="Invalid" variant="danger" showIcon={false} />
      </div>
    </div>
  );
}
