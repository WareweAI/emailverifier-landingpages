import {
  Braces,
  Gauge,
  Globe,
  ShieldCheck,
  Trash2,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  MethodCheckVisual,
  type MethodCheckId,
} from "@/Components/home/MethodCheckVisual";
import { cn } from "@/lib/utils";

type CheckItem = {
  id: MethodCheckId;
  anchorId: string;
  label: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  span: string;
  canvas: string;
};

const CHECKS: CheckItem[] = [
  {
    id: "syntax",
    anchorId: "syntax-check",
    label: "Syntax",
    title: "Advanced Syntax Validation",
    desc: "Instantly detects malformed and invalid email addresses.",
    icon: Braces,
    span: "lg:col-span-5",
    canvas: "min-h-52",
  },
  {
    id: "risk",
    anchorId: "risk-check",
    label: "Score",
    title: "Smart Risk Scoring",
    desc: "Classifies emails as Deliverable, Risky, Undeliverable, or Unknown.",
    icon: Gauge,
    span: "lg:col-span-7",
    canvas: "min-h-64",
  },
  {
    id: "mailbox",
    anchorId: "mailbox-check",
    label: "Mailbox",
    title: "Real-Time SMTP Verification",
    desc: "Verifies mailbox availability without sending an email.",
    icon: ShieldCheck,
    span: "lg:col-span-7",
    canvas: "min-h-56",
  },
  {
    id: "disposable",
    anchorId: "disposable-check",
    label: "Disposable",
    title: "Disposable Email Detection",
    desc: "Filters out temporary and throwaway inboxes.",
    icon: Trash2,
    span: "lg:col-span-5",
    canvas: "min-h-56",
  },
  {
    id: "mx",
    anchorId: "mx-check",
    label: "MX",
    title: "Domain & MX Record Checks",
    desc: "Confirms the domain exists and is configured to receive email.",
    icon: Globe,
    span: "lg:col-span-6",
    canvas: "min-h-52",
  },
  {
    id: "role-spam",
    anchorId: "role-based-filtering",
    label: "Role",
    title: "Role-Based Email Detection",
    desc: "Identifies risky addresses like info@, admin@, and support@.",
    icon: Users,
    span: "lg:col-span-6",
    canvas: "min-h-52",
  },
];

export default function MethodSolutionsPanel() {
  return (
    <ul className="mt-12 grid list-none gap-4 p-0 sm:gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-12">
      {CHECKS.map((check) => {
        const Icon = check.icon;

        return (
          <li
            key={check.id}
            id={check.anchorId}
            className={cn("scroll-mt-28", check.span)}
          >
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] sm:p-6">
              <div className={cn("flex items-center", check.canvas)}>
                <MethodCheckVisual
                  checkId={check.id}
                  framed={false}
                  className="w-full"
                />
              </div>
              <div className="mt-4">
                <p className="flex items-center gap-1.5 text-xs font-medium text-ink-muted">
                  <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {check.label}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-ink sm:text-xl">
                  {check.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {check.desc}
                </p>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
