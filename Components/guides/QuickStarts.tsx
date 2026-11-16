import Link from "next/link";
import { getQuickStartGuides } from "@/lib/guides";

export function QuickStarts() {
  const guides = getQuickStartGuides();

  return (
    <section
      aria-labelledby="quick-starts-heading"
      className="rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] md:p-8"
    >
      <h2
        id="quick-starts-heading"
        className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl"
      >
        Popular quick-starts
      </h2>
      <p className="mt-2 text-ink-muted">
        Short paths to email verify your first address, clean a list, or ship an
        API call.
      </p>

      <ol className="mt-6 divide-y divide-line">
        {guides.map((guide, index) => (
          <li key={guide.slug}>
            <Link
              href={`/guides/${guide.slug}`}
              className="flex min-h-11 items-start gap-4 py-4 transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-sm font-semibold tabular-nums text-primary">
                {index + 1}
              </span>
              <span className="min-w-0">
                <span className="block font-medium text-ink group-hover:text-primary">
                  {guide.title}
                </span>
                <span className="mt-0.5 block text-sm text-ink-muted">
                  {guide.readTimeMinutes} min read
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
