import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/Components/ui/Button";
import { REGISTER_URL } from "@/lib/api-snippet";

export function FinderCtas({ loc }: { loc: string }) {
  return (
    <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
      <Button asChild size="lg">
        <Link
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-ev-event="cta_register_click"
          data-ev-loc={loc}
        >
          Get 100 free credits
        </Link>
      </Button>
      <Button variant="secondary" asChild size="lg">
        <Link href="/pricing">See pricing</Link>
      </Button>
    </div>
  );
}

export function FinderChecks({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-ink-muted lg:justify-start">
      {items.map((label) => (
        <li key={label} className="inline-flex items-center gap-1.5">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
          {label}
        </li>
      ))}
    </ul>
  );
}

export function FinderFaq({
  id,
  items,
}: {
  id: string;
  items: readonly { question: string; answer: string }[];
}) {
  return (
    <div className="mx-auto mt-8 max-w-3xl space-y-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="rounded-xl border border-line bg-surface px-4 py-1 shadow-[var(--shadow-card)]"
        >
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 py-2 text-left text-base font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {item.question}
          </summary>
          <p id={`${id}-${item.question.slice(0, 12)}`} className="pb-3 text-sm leading-relaxed text-ink-muted">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
