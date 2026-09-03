import Link from "next/link";

type PaginationProps = {
  page: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string | undefined>;
};

function hrefFor(
  basePath: string,
  page: number,
  searchParams?: Record<string, string | undefined>,
): string {
  const params = new URLSearchParams();
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (key === "page") continue;
      if (value) params.set(key, value);
    }
  }
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export function Pagination({
  page,
  totalPages,
  basePath,
  searchParams,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const prev = page > 1 ? page - 1 : null;
  const next = page < totalPages ? page + 1 : null;

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex items-center justify-between gap-4 border-t border-line pt-8"
    >
      {prev ? (
        <Link
          href={hrefFor(basePath, prev, searchParams)}
          className="inline-flex min-h-11 items-center rounded-lg border border-line bg-surface px-4 text-sm font-medium text-ink transition hover:border-primary hover:text-primary"
        >
          Previous
        </Link>
      ) : (
        <span className="inline-flex min-h-11 items-center px-4 text-sm text-ink-muted opacity-50">
          Previous
        </span>
      )}

      <p className="text-sm text-ink-muted tabular-nums">
        Page {page} of {totalPages}
      </p>

      {next ? (
        <Link
          href={hrefFor(basePath, next, searchParams)}
          className="inline-flex min-h-11 items-center rounded-lg border border-line bg-surface px-4 text-sm font-medium text-ink transition hover:border-primary hover:text-primary"
        >
          Next
        </Link>
      ) : (
        <span className="inline-flex min-h-11 items-center px-4 text-sm text-ink-muted opacity-50">
          Next
        </span>
      )}
    </nav>
  );
}
