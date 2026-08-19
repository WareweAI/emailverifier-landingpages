import { cn } from "@/lib/utils";

type SectionShellProps = {
  id?: string;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  ariaLabelledBy?: string;
};

export function SectionShell({
  id,
  className,
  innerClassName,
  children,
  ariaLabelledBy,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn("py-16 md:py-24 lg:py-28", className)}
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
