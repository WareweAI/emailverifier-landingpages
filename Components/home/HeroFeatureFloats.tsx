import { StatusChip } from "@/Components/ui/StatusChip";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  Code2,
  MailCheck,
  ShieldAlert,
  Trash2,
  Upload,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type FeatureFloatCardProps = {
  title: string;
  className?: string;
  rotate?: string;
  children: ReactNode;
};

function FeatureFloatCard({
  title,
  className,
  rotate = "rotate-0",
  children,
}: FeatureFloatCardProps) {
  return (
    <div className={cn("w-[9.5rem] shrink-0 xl:w-[10.75rem]", rotate, className)}>
      <div className="relative rounded-2xl border border-line bg-surface p-3 shadow-[var(--shadow-card)]">
        <div
          className="absolute -top-2 left-3 h-2.5 w-9 rounded-t-md border border-b-0 border-line bg-surface-muted xl:left-4 xl:w-10"
          aria-hidden
        />
        <p className="text-[11px] font-semibold leading-snug text-ink xl:text-xs">
          {title}
        </p>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
}

function IconTile({
  icon: Icon,
  tone,
}: {
  icon: LucideIcon;
  tone: "primary" | "success" | "warning" | "danger";
}) {
  const toneClass = {
    primary: "bg-primary-soft text-primary",
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning",
    danger: "bg-danger-soft text-danger",
  }[tone];

  return (
    <span
      className={cn(
        "mb-2 flex h-8 w-8 items-center justify-center rounded-lg border border-line",
        toneClass
      )}
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden />
    </span>
  );
}

function EmailRow({ email }: { email: string }) {
  return (
    <p className="truncate font-mono text-[10px] text-ink-muted">{email}</p>
  );
}

function LeftFloatColumn() {
  return (
    <div
      className="pointer-events-none hidden flex-col items-end justify-end gap-3 self-end pb-14 lg:flex xl:gap-3.5"
      aria-hidden
    >
      <FeatureFloatCard
        title="Catch-All Detection"
        rotate="-rotate-1"
        className="hidden xl:block"
      >
        <IconTile icon={AlertTriangle} tone="warning" />
        <EmailRow email="alex@catch-all.co" />
        <StatusChip
          label="Risky"
          variant="warning"
          className="mt-1.5 px-2 py-0.5 text-[10px]"
        />
      </FeatureFloatCard>

      <FeatureFloatCard title="Real-Time Validation" rotate="-rotate-2">
        <IconTile icon={Zap} tone="primary" />
        <EmailRow email="maya@studio.co" />
        <StatusChip
          label="Valid"
          variant="success"
          className="mt-1.5 px-2 py-0.5 text-[10px]"
        />
      </FeatureFloatCard>

      <FeatureFloatCard
        title="Spam Trap Detection"
        rotate="rotate-2"
        className="hidden xl:block"
      >
        <IconTile icon={ShieldAlert} tone="danger" />
        <EmailRow email="trap@list.net" />
        <StatusChip
          label="Spam trap"
          variant="danger"
          className="mt-1.5 px-2 py-0.5 text-[10px]"
        />
      </FeatureFloatCard>

      <FeatureFloatCard title="Disposable Email Check" rotate="rotate-1">
        <IconTile icon={Trash2} tone="warning" />
        <EmailRow email="user@tempmail.com" />
        <StatusChip
          label="Disposable"
          variant="warning"
          className="mt-1.5 px-2 py-0.5 text-[10px]"
        />
      </FeatureFloatCard>
    </div>
  );
}

function RightFloatColumn() {
  return (
    <div
      className="pointer-events-none hidden flex-col items-start justify-end gap-3 self-end pb-14 lg:flex xl:gap-3.5"
      aria-hidden
    >
      <FeatureFloatCard title="Role-Based Filtering" rotate="rotate-2">
        <IconTile icon={MailCheck} tone="primary" />
        <EmailRow email="info@agency.io" />
        <StatusChip
          label="Role"
          variant="warning"
          className="mt-1.5 px-2 py-0.5 text-[10px]"
        />
      </FeatureFloatCard>

      <FeatureFloatCard title="Bulk Verification" rotate="-rotate-2">
        <IconTile icon={Upload} tone="success" />
        <p className="text-[10px] font-medium text-ink">email_list.csv</p>
        <p className="text-[10px] text-ink-muted">10,000 emails</p>
        <div className="mt-2 flex h-1.5 overflow-hidden rounded-full bg-line">
          <div className="w-[74%] bg-success" />
          <div className="w-[12%] bg-warning" />
          <div className="w-[14%] bg-danger" />
        </div>
        <div className="mt-1 flex justify-between text-[9px] text-ink-muted">
          <span>Valid 74%</span>
          <span>Invalid 14%</span>
        </div>
      </FeatureFloatCard>

      <FeatureFloatCard
        title="Real-Time API"
        rotate="rotate-1"
        className="hidden xl:block"
      >
        <IconTile icon={Code2} tone="primary" />
        <pre className="overflow-hidden rounded-lg bg-ink px-2 py-1.5 font-mono text-[8px] leading-relaxed text-primary-foreground/90">
          {`GET /api/v1/verify\n→ status: valid`}
        </pre>
      </FeatureFloatCard>
    </div>
  );
}

type HeroDemoWithFloatsProps = {
  children: ReactNode;
};

export default function HeroDemoWithFloats({ children }: HeroDemoWithFloatsProps) {
  return (
    <div className="lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-end lg:gap-x-3 xl:gap-x-5">
      <LeftFloatColumn />
      <div className="min-w-0">{children}</div>
      <RightFloatColumn />
    </div>
  );
}
