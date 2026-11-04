import { AlertCircle, Check, X } from "lucide-react";
import { SectionShell } from "@/Components/ui/SectionShell";
import { Reveal } from "@/Components/landing/Reveal";

type CellState = "yes" | "partial" | "no";

export type WhyUsRow = {
  feature: string;
  ours: CellState;
  others: CellState;
};

type WhyUsTableProps = {
  headingId?: string;
  title: string;
  intro?: string;
  oursLabel?: string;
  othersLabel?: string;
  rows: readonly WhyUsRow[];
  className?: string;
};

function StatusIcon({ state }: { state: CellState }) {
  if (state === "yes") {
    return (
      <Check
        className="mx-auto h-5 w-5 text-success"
        strokeWidth={2.5}
        aria-label="Yes"
      />
    );
  }
  if (state === "partial") {
    return (
      <AlertCircle
        className="mx-auto h-5 w-5 text-warning"
        aria-label="Limited"
      />
    );
  }
  return (
    <X className="mx-auto h-5 w-5 text-danger" strokeWidth={2.5} aria-label="No" />
  );
}

export function WhyUsTable({
  headingId = "why-us-heading",
  title,
  intro,
  oursLabel = "EmailVerifier.io",
  othersLabel = "Typical suites",
  rows,
  className,
}: WhyUsTableProps) {
  return (
    <SectionShell className={className} ariaLabelledBy={headingId}>
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id={headingId}
          className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
        >
          {title}
        </h2>
        {intro ? <p className="mt-3 text-ink-muted">{intro}</p> : null}
      </div>

      <Reveal className="mx-auto mt-10 max-w-3xl overflow-x-auto">
        <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="py-3 pr-4 font-semibold text-ink">
                Capability
              </th>
              <th scope="col" className="px-3 py-3 text-center font-semibold text-ink">
                {oursLabel}
              </th>
              <th scope="col" className="px-3 py-3 text-center font-semibold text-ink-muted">
                {othersLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.feature} className="border-b border-line/80">
                <th scope="row" className="py-3.5 pr-4 font-medium text-ink">
                  {row.feature}
                </th>
                <td className="px-3 py-3.5 text-center">
                  <StatusIcon state={row.ours} />
                </td>
                <td className="px-3 py-3.5 text-center">
                  <StatusIcon state={row.others} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </SectionShell>
  );
}
