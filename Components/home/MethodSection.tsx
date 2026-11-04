import {
  SectionHeading,
  sectionLeadClassName,
} from "@/Components/ui/SectionHeading";
import { SectionShell } from "@/Components/ui/SectionShell";
import MethodSolutionsPanel from "@/Components/home/MethodSolutionsPanel";
import { cn } from "@/lib/utils";

export default function MethodSection() {
  return (
    <SectionShell
      ariaLabelledBy="method-heading"
      className="pb-6 md:pb-8 lg:pb-10"
    >
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16">
        <SectionHeading id="method-heading" className="max-w-xl">
          What our email verifier checks on every address
        </SectionHeading>
        <p
          className={cn(
            sectionLeadClassName,
            "mt-0 max-w-md lg:justify-self-end"
          )}
        >
          Six checks on every address — syntax, domain, mailbox, disposable,
          role, and risk — before a send goes out.
        </p>
      </div>

      <MethodSolutionsPanel />
    </SectionShell>
  );
}
