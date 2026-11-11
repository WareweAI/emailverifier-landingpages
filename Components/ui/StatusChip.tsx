import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, HelpCircle, XCircle } from "lucide-react";

export type StatusVariant = "success" | "warning" | "danger" | "neutral";

const variantStyles: Record<
  StatusVariant,
  { chip: string; icon: typeof CheckCircle2 }
> = {
  success: {
    chip: "bg-success-soft text-success",
    icon: CheckCircle2,
  },
  warning: {
    chip: "bg-warning-soft text-warning",
    icon: AlertTriangle,
  },
  danger: {
    chip: "bg-danger-soft text-danger",
    icon: XCircle,
  },
  neutral: {
    chip: "bg-unknown-soft text-unknown",
    icon: HelpCircle,
  },
};

type StatusChipProps = {
  label: string;
  variant?: StatusVariant;
  className?: string;
  showIcon?: boolean;
};

export function StatusChip({
  label,
  variant = "neutral",
  className,
  showIcon = true,
}: StatusChipProps) {
  const { chip, icon: Icon } = variantStyles[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        chip,
        className
      )}
    >
      {showIcon && <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />}
      {label}
    </span>
  );
}

export function statusToVariant(
  status: string,
  isDeliverable?: boolean
): StatusVariant {
  const normalized = status.toLowerCase();
  // Check undeliverable before deliverable — "undeliverable".includes("deliverable") is true.
  if (
    normalized.includes("invalid") ||
    normalized.includes("undeliverable") ||
    normalized.includes("disposable") ||
    normalized.includes("do_not_mail") ||
    normalized.includes("do-not-mail")
  ) {
    return "danger";
  }
  if (
    isDeliverable ||
    normalized === "valid" ||
    normalized.includes("deliverable") ||
    normalized === "safe"
  ) {
    return "success";
  }
  if (
    normalized.includes("risky") ||
    normalized.includes("catch") ||
    normalized.includes("unknown")
  ) {
    return "warning";
  }
  return "neutral";
}
