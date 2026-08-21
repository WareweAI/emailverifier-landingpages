import Link from "next/link";
import { SectionShell } from "@/Components/ui/SectionShell";
import { StatusChip } from "@/Components/ui/StatusChip";
import {
  MethodCheckVisual,
  type MethodCheckId,
} from "@/Components/home/MethodCheckVisual";

const CHECKS: {
  id: MethodCheckId;
  label: string;
  title: string;
  desc: string;
  variant: "neutral" | "success" | "danger" | "warning";
}[] = [
  {
    id: "syntax",
    label: "Syntax",
    title: "Advanced Syntax Validation",
    desc: "Instantly detects malformed and invalid email addresses.",
    variant: "neutral",
  },
  {
    id: "mx",
    label: "MX",
    title: "Domain & MX Record Checks",
    desc: "Confirms the domain exists and is configured to receive email.",
    variant: "neutral",
  },
  {
    id: "mailbox",
    label: "Mailbox",
    title: "Real-Time SMTP Verification",
    desc: "Verifies mailbox availability without sending an email.",
    variant: "success",
  },
  {
    id: "disposable",
    label: "Disposable",
    title: "Disposable Email Detection",
    desc: "Filters out temporary and throwaway inboxes.",
    variant: "danger",
  },
  {
    id: "role-spam",
    label: "Role / spam-trap",
    title: "Role-Based Email Detection",
    desc: "Identifies risky addresses like info@, admin@, and support@.",
    variant: "warning",
  },
  {
    id: "risk",
    label: "Risk Scoring",
    title: "Smart Risk Scoring",
    desc: "Classifies emails as Deliverable, Risky, Undeliverable, or Unknown so you can send with confidence.",
    variant: "warning",
  },
];

function articleId(id: MethodCheckId) {
  if (id === "role-spam") return "role-based-filtering";
  return `${id}-check`;
}

export default function MethodSection() {
  return (
    <SectionShell
      className="bg-surface-muted"
      ariaLabelledBy="method-heading"
    >
      <div className="mx-auto max-w-xl text-center">
        <h2
          id="method-heading"
          className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-4xl"
        >
          What our email verifier checks on every address
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">
          Same status chips you see in the live verifier — mapped to six checks.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        {CHECKS.map((check) => (
          <article
            key={check.id}
            id={articleId(check.id)}
            className="flex scroll-mt-28 flex-col rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] md:p-8"
          >
            <StatusChip
              label={check.label}
              variant={check.variant}
              className="self-start"
            />
            <h3 className="mt-4 font-semibold tracking-tight text-ink lg:text-lg">
              {check.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              {check.desc}
            </p>
            <MethodCheckVisual checkId={check.id} className="mt-auto pt-6" />
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm font-medium md:mt-12">
        <Link href="/bulk-email-verifier" className="text-primary hover:underline">
          See bulk
        </Link>
        <span className="text-ink-muted" aria-hidden>
          ·
        </span>
        <Link
          href="/email-verification-api"
          className="text-primary hover:underline"
        >
          View API Docs
        </Link>
      </div>
    </SectionShell>
  );
}
