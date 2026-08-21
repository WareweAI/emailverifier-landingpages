import {
  cloneElement,
  forwardRef,
  isValidElement,
  type ReactElement,
} from "react";
import { cn } from "@/lib/utils";

export type ButtonSize = "xs" | "sm" | "md" | "lg";
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "onDeep"
  | "default"
  | "outline";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

const baseButtonClasses =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const sizeClasses: Record<ButtonSize, string> = {
  xs: "h-9 px-4 text-sm",
  sm: "h-9 px-3",
  md: "h-11 px-5",
  lg: "h-12 px-6",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-deep",
  default:
    "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-deep",
  secondary:
    "bg-surface text-ink border border-line hover:bg-surface-muted hover:border-primary active:bg-primary-soft",
  outline:
    "bg-surface text-ink border border-line hover:bg-surface-muted hover:border-primary active:bg-primary-soft",
  ghost: "bg-transparent text-ink hover:bg-surface-muted active:bg-primary-soft",
  onDeep:
    "bg-surface text-primary hover:bg-primary-soft active:bg-primary-soft",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      asChild = false,
      size = "md",
      variant = "primary",
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      baseButtonClasses,
      sizeClasses[size],
      variantClasses[variant],
      className
    );

    if (asChild && isValidElement(children)) {
      const childElement = children as ReactElement<{ className?: string }>;
      return cloneElement(childElement, {
        className: cn(classes, childElement.props.className),
        ...props,
      });
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
