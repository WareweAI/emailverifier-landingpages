import dynamic from "next/dynamic";
import Image from "next/image";
import { SectionShell } from "@/Components/ui/SectionShell";
import { StarRating } from "@/Components/ui/StarRating";

const TestimonialsLedger = dynamic(
  () => import("@/Components/TestimonialsLedger"),
  {
    loading: () => (
      <div
        className="mx-auto min-h-[280px]"
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
      className="overflow-x-hidden bg-background pt-8 pb-8 md:pt-12 md:pb-10 lg:pt-16 lg:pb-12"
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

      <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-x-2.5 gap-y-2 px-4 text-base leading-snug text-ink sm:mt-10 sm:text-lg">
        <StarRating
          rating={4.8}
          size={22}
          activeColor="var(--color-score-mid-high)"
          className="gap-1"
        />
        <span className="font-display text-xl font-bold tracking-tight sm:text-2xl">
          4.8
        </span>
        <span>on</span>
        <span className="inline-flex items-center gap-1.5">
          <Image
            src="/assets/capterra.svg"
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
          />
          Capterra,
        </span>
        <span>and reviews from</span>
        <span className="inline-flex items-center gap-1.5">
          <Image
            src="/assets/reddit.svg"
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
          />
          Reddit.
        </span>
      </div>
    </SectionShell>
  );
}
