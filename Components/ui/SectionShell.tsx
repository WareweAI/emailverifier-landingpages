import { cn } from "@/lib/utils";

type SectionShellProps = {
  id?: string;
  className?: string;
  innerClassName?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  ariaLabelledBy?: string;
};

export function SectionShell({
  id,
  className,
  innerClassName,
  style,
  children,
  ariaLabelledBy,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn("py-16 md:py-24 lg:py-28", className)}
      style={style}
      aria-labelledby={ariaLabelledBy}
    >
      <div
        className={cn(
          "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8",
          innerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
