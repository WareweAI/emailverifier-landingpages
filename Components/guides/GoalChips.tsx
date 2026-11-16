import Link from "next/link";
import {
  GUIDE_GOALS,
  buildGuidesHref,
  type GuideFilters,
} from "@/lib/guides";

type GoalChipsProps = {
  filters: GuideFilters;
};

export function GoalChips({ filters }: GoalChipsProps) {
  const activeGoal = filters.goal;

  return (
    <nav aria-label="Browse guides by goal">
      <p className="text-sm font-semibold text-ink">Browse by goal</p>
      <ul className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        <li className="shrink-0">
          <Link
            href={buildGuidesHref({
              product: filters.product,
              q: filters.q,
            })}
            className={
              !activeGoal
                ? "inline-flex min-h-11 items-center rounded-lg bg-primary-soft px-3 text-sm font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                : "inline-flex min-h-11 items-center rounded-lg px-3 text-sm text-ink-muted transition hover:bg-surface-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            }
            aria-current={!activeGoal ? "page" : undefined}
          >
            All
          </Link>
        </li>
        {GUIDE_GOALS.map((goal) => {
          const active = goal.slug === activeGoal;
          return (
            <li key={goal.slug} className="shrink-0">
              <Link
                href={buildGuidesHref({
                  product: filters.product,
                  goal: goal.slug,
                  q: filters.q,
                })}
                className={
                  active
                    ? "inline-flex min-h-11 items-center rounded-lg bg-primary-soft px-3 text-sm font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    : "inline-flex min-h-11 items-center rounded-lg px-3 text-sm text-ink-muted transition hover:bg-surface-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                }
                aria-current={active ? "page" : undefined}
              >
                {goal.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
