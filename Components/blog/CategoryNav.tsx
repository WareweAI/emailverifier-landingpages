import Link from "next/link";
import type { BlogCategory } from "@/lib/wordpress/types";

type CategoryNavProps = {
  categories: BlogCategory[];
  activeSlug?: string;
};

export function CategoryNav({ categories, activeSlug }: CategoryNavProps) {
  if (categories.length === 0) return null;

  return (
    <nav aria-label="Blog categories">
      <p className="text-sm font-semibold text-ink">Categories</p>
      <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
        <li>
          <Link
            href="/blog"
            className={
              !activeSlug
                ? "inline-flex min-h-11 items-center rounded-lg bg-primary-soft px-3 text-sm font-medium text-primary"
                : "inline-flex min-h-11 items-center rounded-lg px-3 text-sm text-ink-muted transition hover:bg-surface-muted hover:text-ink"
            }
          >
            All posts
          </Link>
        </li>
        {categories.map((cat) => {
          const active = cat.slug === activeSlug;
          return (
            <li key={cat.id}>
              <Link
                href={`/blog/category/${cat.slug}`}
                className={
                  active
                    ? "inline-flex min-h-11 items-center rounded-lg bg-primary-soft px-3 text-sm font-medium text-primary"
                    : "inline-flex min-h-11 items-center rounded-lg px-3 text-sm text-ink-muted transition hover:bg-surface-muted hover:text-ink"
                }
              >
                {cat.name}
                <span className="ml-2 tabular-nums text-ink-muted">
                  {cat.count}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
