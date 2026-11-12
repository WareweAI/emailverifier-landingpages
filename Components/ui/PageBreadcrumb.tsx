import { Home } from "lucide-react";
import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type PageBreadcrumbProps = {
  items: readonly BreadcrumbItem[];
  className?: string;
};

/** Page trail. The last item is the current page. Earlier items link when they have an href. */
export function PageBreadcrumb({ items, className }: PageBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className="inline-flex items-center gap-2.5"
            >
              {index > 0 ? (
                <span
                  aria-hidden
                  className="size-1 shrink-0 rounded-full bg-ink-muted"
                />
              ) : null}
              {isCurrent || !item.href ? (
                <span
                  aria-current={isCurrent ? "page" : undefined}
                  className="inline-flex min-h-11 items-center text-sm text-ink-muted"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-md text-sm text-ink-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none"
                >
                  {index === 0 ? (
                    <Home className="size-3.5 shrink-0" aria-hidden />
                  ) : null}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
