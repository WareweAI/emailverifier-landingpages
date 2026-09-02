import dynamic from "next/dynamic";
import { SectionShell } from "@/Components/ui/SectionShell";

const TestimonialsLedger = dynamic(
  () => import("@/Components/TestimonialsLedger"),
  {
    loading: () => (
      <div
        className="mx-auto min-h-[280px] max-w-6xl"
        aria-busy="true"
        aria-label="Loading reviews"
      />
    ),
  }
);

export default function Testimonials() {
  return (
    <SectionShell
      id="testimonials"
      ariaLabelledBy="testimonials-heading"
      className="overflow-x-hidden bg-surface-muted"
      innerClassName="max-w-none"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2
          id="testimonials-heading"
          className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-4xl"
        >
          Loved by Thousands of Businesses
        </h2>
        <p className="mt-3 text-lg text-ink-muted">
          See what our customers have to say about their experience with
          Emailverifier.io
        </p>
      </div>

      <div className="mt-10">
        <TestimonialsLedger />
      </div>
    </SectionShell>
  );
}
