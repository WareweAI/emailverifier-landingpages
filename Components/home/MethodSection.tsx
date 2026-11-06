import {
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/Components/ui/SectionHeading";
import { SectionShell } from "@/Components/ui/SectionShell";
import MethodDeliverabilityPanel from "@/Components/home/MethodDeliverabilityPanel";

export default function MethodSection() {
  return (
    <SectionShell
      ariaLabelledBy="method-heading"
      className="pb-6 md:pb-8 lg:pb-10"
    >
      <div className="mx-auto max-w-6xl text-center">
        <SectionEyebrow align="center">Deliverability</SectionEyebrow>
        <SectionHeading id="method-heading">
          Impact on Email Deliverability and Bounce Rate Reduction
        </SectionHeading>
        <SectionLead className="mx-auto max-w-3xl">
          EmailVerifier.io helps you keep bounce rate under 2% and lands in the
          primary inbox.
        </SectionLead>
      </div>

      <MethodDeliverabilityPanel />
    </SectionShell>
  );
}
