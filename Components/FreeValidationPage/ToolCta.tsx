import Link from "next/link";
import { Button } from "@/Components/ui/Button";
import { SectionShell } from "@/Components/ui/SectionShell";
import { REGISTER_URL } from "@/lib/api-snippet";

export default function ToolCta() {
  return (
    <SectionShell
      id="cta"
      className="bg-surface-muted py-12 md:py-16"
      ariaLabelledBy="tool-cta-heading"
    >
      <div className="mx-auto max-w-2xl rounded-2xl border border-line bg-surface px-6 py-10 text-center shadow-[var(--shadow-card)] sm:px-10 sm:py-12">
        <h2
          id="tool-cta-heading"
          className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
        >
          You&apos;ve checked one address. Email verify a full list next.
        </h2>
        <p className="mt-3 text-ink-muted">
          Get 100 free credits on signup — no credit card.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild className="min-h-12">
            <Link
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ev-event="cta_register_click"
            >
              Get 100 Free Credits
            </Link>
          </Button>
          <Button size="lg" variant="secondary" asChild className="min-h-12">
            <Link href="/pricing">See pricing</Link>
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
