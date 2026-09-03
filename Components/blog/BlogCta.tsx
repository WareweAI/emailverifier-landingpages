import Link from "next/link";
import { Button } from "@/Components/ui/Button";
import { REGISTER_URL } from "@/lib/api-snippet";

type BlogCtaProps = {
  variant?: "band" | "inline";
};

export function BlogCta({ variant = "band" }: BlogCtaProps) {
  if (variant === "inline") {
    return (
      <aside className="my-10 rounded-2xl border border-line bg-primary-soft p-6 md:p-8">
        <h2 className="font-display text-xl font-semibold text-ink">
          Clean your list with an email verifier
        </h2>
        <p className="mt-2 text-ink-muted">
          Get 100 free credits on signup — no credit card. Same credits for bulk
          and the email verification API.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <a href={REGISTER_URL}>Get 100 Free Credits</a>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/pricing">See pricing</Link>
          </Button>
        </div>
      </aside>
    );
  }

  return (
    <section className="mt-16 rounded-2xl border border-line bg-surface p-8 shadow-[var(--shadow-card)] md:p-10">
      <h2 className="font-display text-2xl font-semibold text-ink">
        Ready to email verify your list?
      </h2>
      <p className="mt-2 max-w-2xl text-ink-muted">
        Start with 100 free credits. Pay once at $1.80 per 1,000 — credits never
        expire. Bulk CSV and real-time API on the same wallet.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild>
          <a href={REGISTER_URL}>Get 100 Free Credits</a>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/validate-email">Verify Emails Free</Link>
        </Button>
      </div>
    </section>
  );
}
