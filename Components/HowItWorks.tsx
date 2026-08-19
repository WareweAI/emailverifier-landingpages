import dynamic from "next/dynamic";
import { SectionShell } from "@/Components/ui/SectionShell";

const HowItWorksScene = dynamic(
  () => import("@/Components/home/HowItWorksScene")
);

export default function HowItWorks() {
  return (
    <SectionShell id="how-it-works" ariaLabelledBy="how-it-works-heading">
      <HowItWorksScene />
    </SectionShell>
  );
}
