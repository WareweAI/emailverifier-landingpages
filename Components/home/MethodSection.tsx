import { SectionShell } from "@/Components/ui/SectionShell";
import MethodSolutionsPanel from "@/Components/home/MethodSolutionsPanel";

export default function MethodSection() {
  return (
    <SectionShell
      ariaLabelledBy="method-heading"
      className="pb-6 md:pb-8 lg:pb-10"
    >
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16">
        <h2
          id="method-heading"
          className="max-w-xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl lg:leading-tight"
        >
          What our email verifier checks on every address
        </h2>
        <p className="max-w-md text-base leading-relaxed text-ink-muted lg:justify-self-end">
          Six checks on every address — syntax, domain, mailbox, disposable,
          role, and risk — before a send goes out.
        </p>
      </div>

      <MethodSolutionsPanel />
    </SectionShell>
  );
}
