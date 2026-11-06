"use client";

import { useEffect, useState } from "react";
import {
  ROW_GROUPS,
  comparisonRows,
  resolveRowCells,
  vendors,
  type RowGroupId,
  type RowId,
  type VendorId,
} from "@/lib/competitor-comparison";
import { ComparisonCellView } from "./ComparisonCell";
import { cn } from "@/lib/utils";

/** Four competitors + EmailVerifier.io — benefits table only. */
const BENEFIT_VENDOR_IDS: VendorId[] = [
  "emailverifier",
  "zerobounce",
  "neverbounce",
  "bouncer",
  "emailable",
];

const BENEFIT_ROW_IDS: RowId[] = [
  "creditsExpire",
  "freeCredits",
  "smtpMailbox",
  "catchAllHandling",
  "disposable",
  "roleBased",
  "spamTrap",
  "deliverabilityScore",
  "bulkCsv",
  "realtimeApi",
  "unlimitedApiKeys",
  "integrations",
  "emailFinder",
  "leadSearch",
  "bulkEnrichment",
  "teamAccess",
  "compliance",
  "listRetention",
];

const BENEFIT_GROUPS: RowGroupId[] = ["verification", "beyond", "trust"];

const ALWAYS_OPEN: RowGroupId[] = ["verification", "beyond"];

const benefitRows = comparisonRows.filter((row) =>
  BENEFIT_ROW_IDS.includes(row.id)
);

const benefitVendors = vendors.filter((vendor) =>
  BENEFIT_VENDOR_IDS.includes(vendor.id)
);

export function ComparisonTable() {
  const [openGroups, setOpenGroups] = useState<Record<RowGroupId, boolean>>(
    () => {
      const initial = {} as Record<RowGroupId, boolean>;
      for (const id of BENEFIT_GROUPS) initial[id] = true;
      return initial;
    }
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const apply = () => {
      setOpenGroups(() => {
        const next = {} as Record<RowGroupId, boolean>;
        for (const id of BENEFIT_GROUPS) {
          next[id] = mq.matches ? ALWAYS_OPEN.includes(id) : true;
        }
        return next;
      });
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const toggleGroup = (id: RowGroupId) => {
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="relative overflow-x-auto rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)] [scrollbar-gutter:stable]">
      <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
        <caption className="sr-only">
          Benefits comparison of EmailVerifier.io versus ZeroBounce,
          NeverBounce, Bouncer, and Emailable.
        </caption>
        <thead className="sticky top-0 z-20">
          <tr className="border-b border-line bg-surface-muted">
            <th
              scope="col"
              className="sticky left-0 z-30 min-w-[11rem] bg-surface-muted px-4 py-3.5 font-semibold text-ink"
            >
              Benefit
            </th>
            {benefitVendors.map((vendor) => {
              const isOurs = vendor.id === "emailverifier";
              return (
                <th
                  key={vendor.id}
                  scope="col"
                  className={cn(
                    "min-w-[9.5rem] px-3 py-3.5 text-center font-semibold",
                    isOurs
                      ? "sticky left-[11rem] z-30 bg-primary-soft text-ink"
                      : "bg-surface-muted text-ink-muted"
                  )}
                >
                  {vendor.name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {/* Credits & access — pulled from pricing benefit rows */}
          <GroupBlock
            label="Credits & access"
            expanded={openGroups.verification !== false}
            onToggle={() => toggleGroup("verification")}
            colSpan={benefitVendors.length + 1}
            rows={benefitRows.filter((row) =>
              ["creditsExpire", "freeCredits", "unlimitedApiKeys", "teamAccess"].includes(
                row.id
              )
            )}
            visibleVendorIds={BENEFIT_VENDOR_IDS}
          />
          {ROW_GROUPS.filter((group) => BENEFIT_GROUPS.includes(group.id)).map(
            (group) => {
              const rows = benefitRows.filter((row) => {
                if (group.id === "verification") {
                  return (
                    row.group === "verification" &&
                    !["unlimitedApiKeys"].includes(row.id)
                  );
                }
                if (group.id === "beyond") {
                  return (
                    row.group === "beyond" &&
                    !["teamAccess", "deliverabilityTools"].includes(row.id)
                  );
                }
                if (group.id === "trust") {
                  return row.group === "trust" && row.id !== "accuracyClaim";
                }
                return row.group === group.id;
              });
              if (rows.length === 0) return null;
              return (
                <GroupBlock
                  key={group.id}
                  label={group.label}
                  expanded={openGroups[group.id] !== false}
                  onToggle={() => toggleGroup(group.id)}
                  colSpan={benefitVendors.length + 1}
                  rows={rows}
                  visibleVendorIds={BENEFIT_VENDOR_IDS}
                />
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
}

function GroupBlock({
  label,
  expanded,
  onToggle,
  colSpan,
  rows,
  visibleVendorIds,
}: {
  label: string;
  expanded: boolean;
  onToggle: () => void;
  colSpan: number;
  rows: typeof comparisonRows;
  visibleVendorIds: VendorId[];
}) {
  return (
    <>
      <tr className="border-b border-line bg-surface-muted/70">
        <th colSpan={colSpan} scope="colgroup" className="p-0">
          <button
            type="button"
            aria-expanded={expanded}
            onClick={onToggle}
            className="flex min-h-11 w-full items-center gap-2 px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
          >
            <span
              className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line bg-surface text-xs leading-none text-ink-muted"
              aria-hidden
            >
              {expanded ? "−" : "+"}
            </span>
            {label}
          </button>
        </th>
      </tr>
      {expanded
        ? rows.map((row) => {
            const cells = resolveRowCells(row, 50_000);
            return (
              <tr key={row.id} className="border-b border-line/80 last:border-0">
                <th
                  scope="row"
                  className="sticky left-0 z-10 min-h-11 min-w-[11rem] bg-surface px-4 py-3.5 align-middle font-medium text-ink"
                >
                  {row.label}
                </th>
                {visibleVendorIds.map((vendorId) => {
                  const isOurs = vendorId === "emailverifier";
                  const cell = cells[vendorId];
                  const displayCell =
                    cell.footnoteIds && cell.footnoteIds.length > 0
                      ? { ...cell, footnoteIds: undefined }
                      : cell;
                  return (
                    <td
                      key={vendorId}
                      className={cn(
                        "min-h-11 px-3 py-3.5 text-center align-middle",
                        isOurs && "sticky left-[11rem] z-10 bg-primary-soft/40"
                      )}
                    >
                      <ComparisonCellView cell={displayCell} />
                    </td>
                  );
                })}
              </tr>
            );
          })
        : null}
    </>
  );
}
