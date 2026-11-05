import Image from "next/image";
import TestimonialsLedger from "@/Components/TestimonialsLedger";
import {
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/Components/ui/SectionHeading";
import { SectionShell } from "@/Components/ui/SectionShell";
import { StarRating } from "@/Components/ui/StarRating";

export default function Testimonials() {
  return (
    <SectionShell
      id="testimonials"
      ariaLabelledBy="testimonials-heading"
      className="overflow-x-hidden bg-background pt-8 pb-8 md:pt-12 md:pb-10 lg:pt-16 lg:pb-12"
    >
      <div className="mx-auto max-w-6xl text-center">
        <SectionEyebrow align="center">Testimonials</SectionEyebrow>
        <SectionHeading id="testimonials-heading">
        Loved by Sales Teams, Marketers, Founders, Recruiters, and Professionals
        </SectionHeading>
        <SectionLead className="mx-auto max-w-3xl">
        See what our customers have to say about their experience with EmailVerifier.io
        </SectionLead>
      </div>

      <div className="mt-10">
        <TestimonialsLedger />
      </div>

      <p className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-x-2.5 gap-y-2 px-4 text-base leading-snug text-ink sm:mt-10 sm:text-lg">
        <StarRating
          rating={4.8}
          size={22}
          activeColor="var(--color-score-mid-high)"
          className="gap-1"
        />
        <span className="font-display text-xl font-bold tracking-tight sm:text-2xl">
          4.8/5
        </span>
        <span>overall satisfaction across</span>
        <span className="inline-flex items-center gap-2">
          <Image
            src="/assets/trustpilot-icon.svg"
            alt="Trustpilot"
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
          />
          <Image
            src="/assets/capterra.svg"
            alt="Capterra"
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
          />
          <Image
            src="/assets/reddit.svg"
            alt="Reddit"
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
          />
        </span>
      </p>
    </SectionShell>
  );
}
