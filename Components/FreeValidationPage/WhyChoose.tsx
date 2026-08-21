import { AlertCircle, Check, X } from "lucide-react";
import { SectionShell } from "@/Components/ui/SectionShell";
import { cn } from "@/lib/utils";

type CellState = "yes" | "partial" | "no";

const ROWS: {
  feature: string;
  ours: CellState;
  others: CellState;
}[] = [
  {
    feature: "Accurate email verification",
    ours: "yes",
    others: "partial",
  },
  {
    feature: "No emails sent",
    ours: "yes",
    others: "no",
  },
  {
    feature: "Bulk + API",
    ours: "yes",
    others: "partial",
  },
  {
    feature: "Fast processing",
    ours: "yes",
    others: "partial",
  },
  {
    feature: "Transparent pricing",
    ours: "yes",
    others: "no",
  },
];

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

export default function WhyChoose() {
  return (
    <SectionShell
      className="bg-surface"
      ariaLabelledBy="why-choose-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="why-choose-heading"
          className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
        >
          Why Choose Emailverifier.io?
        </h2>
        <p className="mt-3 text-ink-muted">
          Accurate, fast, and reliable email verification you can trust.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl overflow-x-auto">
        <table className="w-full min-w-[28rem] border-collapse text-left">
          <caption className="sr-only">
            Comparison of Emailverifier.io features versus other tools
          </caption>
          <thead>
            <tr className="border-b border-line">
              <th
                scope="col"
                className="py-3 pr-4 text-sm font-semibold text-ink"
              >
                Feature
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-sm font-semibold text-ink"
              >
                Emailverifier.io
              </th>
              <th
                scope="col"
                className="py-3 pl-3 text-center text-sm font-semibold text-ink"
              >
                Other Tools
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.feature} className="border-b border-line">
                <th
                  scope="row"
                  className="py-4 pr-4 text-sm font-normal text-ink"
                >
                  {row.feature}
                </th>
                <td className="px-3 py-4 text-center">
                  <StatusIcon state={row.ours} />
                </td>
                <td
                  className={cn(
                    "py-4 pl-3 text-center",
                    row.others === "no" && "align-middle"
                  )}
                >
                  <StatusIcon state={row.others} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}
