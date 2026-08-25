import HowItWorksCompact from "@/Components/home/HowItWorksCompact";
import { SectionShell } from "@/Components/ui/SectionShell";

export default function HowItWorks() {
  return (
    <SectionShell id="how-it-works" ariaLabelledBy="how-it-works-heading">
      <HowItWorksCompact />
    </SectionShell>
  );
}
