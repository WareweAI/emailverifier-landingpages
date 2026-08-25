import Link from "next/link";
import { ListCleanVisual } from "@/Components/ui/ListCleanVisual";
import { Button } from "@/Components/ui/Button";
import { SectionShell } from "@/Components/ui/SectionShell";
import { REGISTER_URL } from "@/lib/api-snippet";

export default function ListCleanSection() {
  return (
    <SectionShell
      className="bg-surface-muted"
      ariaLabelledBy="list-clean-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="list-clean-heading"
          className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
        >
          Bulk email verifier: dirty list to clean results
        </h2>
        <p className="mt-3 text-ink-muted">
          See the outcome before you upload — example mix for a 10K list at
          $1.80 per 1,000. Credits never expire.
        </p>
      </div>
      <div className="mx-auto mt-10 max-w-4xl">
        <ListCleanVisual />
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ev-event="cta_register_click"
          >
            Get 100 free credits
          </Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/bulk-email-verifier">See bulk verifier</Link>
        </Button>
      </div>
    </SectionShell>
  );
}
