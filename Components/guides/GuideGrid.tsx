import type { Guide } from "@/lib/guides";
import { GuideCard } from "./GuideCard";

type GuideGridProps = {
  guides: Guide[];
  emptyMessage?: string;
};

export function GuideGrid({
  guides,
  emptyMessage = "No guides found. Try another product, goal, or search term.",
}: GuideGridProps) {
  if (guides.length === 0) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-line bg-surface p-8 text-center shadow-[var(--shadow-card)]"
      >
        <p className="font-display text-lg font-semibold text-ink">
          No guides found
        </p>
        <p className="mt-2 text-ink-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {guides.map((guide) => (
        <GuideCard key={guide.slug} guide={guide} />
      ))}
    </div>
  );
}
