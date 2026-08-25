import { SectionShell } from "@/Components/ui/SectionShell";
import MethodSolutionsPanel from "@/Components/home/MethodSolutionsPanel";
import Link from "next/link";

export default function MethodSection() {
  return (
    <SectionShell ariaLabelledBy="method-heading">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          Solutions
        </p>
        <h2
          id="method-heading"
          className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink lg:text-4xl"
        >
          What our email verifier checks on every address
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">
          Six checks on every address — select one to preview the result in the
          app.
        </p>
      </div>

      <MethodSolutionsPanel />

      <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm font-medium">
        <Link href="/bulk-email-verifier" className="text-primary hover:underline">
          See bulk
        </Link>
        <span className="text-ink-muted" aria-hidden>
          ·
        </span>
        <Link
          href="/email-verification-api"
          className="text-primary hover:underline"
        >
          View API Docs
        </Link>
      </div>
    </SectionShell>
  );
}
