import HowItWorksCompact from "@/Components/home/HowItWorksCompact";
import { SectionShell } from "@/Components/ui/SectionShell";
import { DEEP_SECTION_GRADIENT } from "@/lib/section-gradients";

export default function HowItWorks() {
  return (
    <SectionShell
      id="how-it-works"
      ariaLabelledBy="how-it-works-heading"
      className="relative overflow-hidden"
      style={{ backgroundImage: DEEP_SECTION_GRADIENT }}
      innerClassName="relative z-10"
    >
      <HowItWorksCompact />
    </SectionShell>
  );
}
