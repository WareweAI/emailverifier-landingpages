import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Shared section H2 scale — use across Features, Reviews, Pricing, FAQ, etc. */
export const sectionHeadingClassName =
  "font-display text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl";

export const sectionLeadClassName =
  "mt-3 text-lg leading-relaxed text-ink-muted";

type SectionEyebrowProps = {
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
};

export function SectionEyebrow({
  children,
  className,
  align = "left",
}: SectionEyebrowProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 text-sm font-medium text-ink-muted",
        align === "center" && "justify-center",
        className
      )}
    >
      <span
        className="h-1 w-5 shrink-0 rounded-full bg-ink-muted"
        aria-hidden
      />
      {children}
    </p>
  );
}

type SectionHeadingProps = {
  id?: string;
  children: ReactNode;
  /** Space above the title when an eyebrow sits above it */
  withEyebrow?: boolean;
  tone?: "default" | "onDark";
  className?: string;
} & Omit<HTMLAttributes<HTMLHeadingElement>, "id" | "children" | "className">;

export function SectionHeading({
  id,
  children,
  withEyebrow = false,
  tone = "default",
  className,
  ...rest
}: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className={cn(
        sectionHeadingClassName,
        withEyebrow && "mt-3",
        tone === "onDark" ? "text-primary-foreground" : "text-ink",
        className
      )}
      {...rest}
    >
      {children}
    </h2>
  );
}

type SectionLeadProps = {
  children: ReactNode;
  className?: string;
};

export function SectionLead({ children, className }: SectionLeadProps) {
  return <p className={cn(sectionLeadClassName, className)}>{children}</p>;
}
