import VerifierDemo from "@/Components/VerifierDemo";
import HeroScene from "@/Components/home/HeroScene";
import { DesktopMockup } from "@/Components/ui/DesktopMockup";
import { StarRating } from "@/Components/ui/StarRating";

export default function HeroSection() {
  return (
    <HeroScene>
      <section
        id="hero"
        className="relative pt-8 pb-16 md:pt-12 md:pb-24 lg:pb-28"
        aria-labelledby="hero-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div
              data-hero-el
              className="mb-4 flex items-center justify-center gap-2 text-sm text-ink-muted"
            >
              <StarRating rating={4.8} size={18} />
              <span>Capterra 4.8</span>
            </div>
            <h1
              id="hero-heading"
              data-hero-el
              className="font-display text-4xl font-semibold leading-tight tracking-tight text-ink lg:text-5xl"
            >
              <span className="relative inline-block pb-1">
                Verify emails
                <svg
                  className="pointer-events-none absolute -bottom-0.5 left-0 h-3 w-full text-primary"
                  viewBox="0 0 220 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 8.5C28 4.2 52 11.8 78 7.4C104 3 128 11.2 156 6.8C178 3.6 198 9.4 217 5.2"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              in seconds.
            </h1>
            <p
              data-hero-el
              className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted"
            >
              See if an address is real, deliverable, and safe to send — without
              sending mail. Then clean a full list or verify signups through the
              API.
            </p>
            <ul
              data-hero-el
              className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-ink-muted"
            >
              <li>GDPR-ready</li>
              <li>30-day deletion</li>
              <li>Credits never expire</li>
            </ul>
          </div>

          <div
            data-hero-el
            className="relative mx-auto mt-10 max-w-3xl md:mt-12"
          >
            <DesktopMockup chromeLabel="Enter an email address to check its deliverability">
              <VerifierDemo variant="hero" location="hero" />
            </DesktopMockup>
          </div>
        </div>
      </section>
    </HeroScene>
  );
}
