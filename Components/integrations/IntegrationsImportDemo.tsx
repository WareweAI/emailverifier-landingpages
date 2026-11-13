import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { StatusChip } from "@/Components/ui/StatusChip";
import { INTEGRATIONS } from "@/lib/integrations";

const HERO_SOURCES = INTEGRATIONS.filter(
  (item) => item.category === "cloud" || item.category === "crm"
).slice(0, 4);

/**
 * Compact connected-sources mock for the integrations hero —
 * source logos → list name → result chip (matches landing result-card style).
 */
export function IntegrationsImportDemo() {
  return (
    <div className="space-y-4" aria-label="Example cloud import flow">
      <div className="flex flex-wrap items-center gap-2">
        {HERO_SOURCES.map((source) => (
          <span
            key={source.id}
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface-muted px-2.5 py-2"
          >
            {source.logo ? (
              <Image
                src={source.logo}
                alt={`${source.name} logo`}
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
                unoptimized
              />
            ) : null}
            <span className="text-xs font-medium text-ink">{source.name}</span>
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2 text-ink-muted" aria-hidden>
        <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.75} />
        <span className="text-xs font-medium">Import selected list</span>
      </div>

      <div className="rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow-card)] sm:p-5">
        <p className="text-xs font-medium text-ink-muted">Connected list</p>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <p className="min-w-0 truncate font-semibold text-ink">
            Q1 outreach — Drive
          </p>
          <StatusChip
            label="43% safe"
            variant="success"
            className="shrink-0 px-2 py-0.5"
          />
        </div>
        <p className="mt-2 text-sm text-ink-muted">7 emails verified</p>
        <ul
          className="mt-3 flex flex-wrap gap-1.5"
          aria-label="Example result flags"
        >
          <li className="rounded-full bg-success-soft px-2 py-0.5 text-xs font-medium text-success">
            Deliverable
          </li>
          <li className="rounded-full bg-warning-soft px-2 py-0.5 text-xs font-medium text-warning">
            Risky
          </li>
          <li className="rounded-full bg-danger-soft px-2 py-0.5 text-xs font-medium text-danger">
            Invalid
          </li>
        </ul>
      </div>

      <p className="flex items-center justify-center gap-1.5 text-sm text-ink-muted">
        <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden />
        No setup, no credit card, no stress.
      </p>
    </div>
  );
}
