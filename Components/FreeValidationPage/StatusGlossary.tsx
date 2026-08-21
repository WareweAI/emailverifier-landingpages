import { StatusChip } from "@/Components/ui/StatusChip";
import { SectionShell } from "@/Components/ui/SectionShell";

const STATUSES = [
  {
    label: "Deliverable",
    variant: "success" as const,
    desc: "The address looks real and safe to send.",
  },
  {
    label: "Risky",
    variant: "warning" as const,
    desc: "Catch-all, uncertain, or higher-risk mailbox — review before sending.",
  },
  {
    label: "Undeliverable",
    variant: "danger" as const,
    desc: "The address failed verification and should not be mailed.",
  },
  {
    label: "Disposable",
    variant: "danger" as const,
    desc: "Temporary or throwaway inbox — often used to bypass signups.",
  },
  {
    label: "Role-based",
    variant: "warning" as const,
    desc: "Generic addresses like info@, admin@, or support@.",
  },
  {
    label: "Catch-all",
    variant: "warning" as const,
    desc: "The domain accepts any mailbox — deliverability is uncertain.",
  },
];

export default function StatusGlossary() {
  return (
    <SectionShell
      className="bg-surface"
      ariaLabelledBy="status-glossary-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="status-glossary-heading"
          className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
        >
          Understanding the result
        </h2>
        <p className="mt-3 text-ink-muted">
          Statuses and flags from a single check — the same language used in
          bulk and API results.
        </p>
      </div>

      <dl className="mx-auto mt-10 max-w-3xl divide-y divide-line border-y border-line">
        {STATUSES.map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-2 py-4 sm:flex-row sm:items-start sm:gap-6"
          >
            <dt className="sm:w-40 sm:shrink-0">
              <StatusChip label={item.label} variant={item.variant} />
            </dt>
            <dd className="text-sm leading-relaxed text-ink-muted sm:pt-0.5">
              {item.desc}
            </dd>
          </div>
        ))}
      </dl>
    </SectionShell>
  );
}
