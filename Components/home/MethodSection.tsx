import {
  SectionHeading,
  SectionLead,
} from "@/Components/ui/SectionHeading";
import { SectionShell } from "@/Components/ui/SectionShell";
import MethodSolutionsPanel from "@/Components/home/MethodSolutionsPanel";

export default function MethodSection() {
  return (
    <SectionShell
      ariaLabelledBy="method-heading"
      className="pb-6 md:pb-8 lg:pb-10"
    >
      <div className="mx-auto max-w-6xl text-center">
        <SectionHeading id="method-heading">
          What our email verifier checks on every address
        </SectionHeading>
        <SectionLead className="mx-auto max-w-3xl">
          Six checks on every address — syntax, domain, mailbox, disposable,
          role, and risk — before a send goes out.
        </SectionLead>
      </div>

      <MethodSolutionsPanel />
    </SectionShell>
  );
}
