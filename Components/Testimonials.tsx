import Image from "next/image";
import { SectionShell } from "@/Components/ui/SectionShell";
import { StarRating } from "@/Components/ui/StarRating";
import { cn } from "@/lib/utils";

type Testimonial = {
  name: string;
  role?: string;
  company: string;
  image?: string;
  initials: string;
  headline?: string;
  content: string;
  rating?: number;
  ratingSource?: "Trustpilot" | "Capterra";
};

const testimonials: Testimonial[] = [
  {
    name: "Lorrta",
    company: "GB",
    initials: "L",
    headline: "Simple, Fast",
    content:
      "Cleaned 5k subs in 10 mins, bounced down to 0.5% instantly. now my deliverability is rock solid and opens are actually decent. Simple, fast, and credits are cheap.",
    rating: 5,
    ratingSource: "Trustpilot",
  },
  {
    name: "Sherwin patricia",
    company: "US",
    initials: "SP",
    headline: "saved my warmup big time.",
    content:
      "Other verifiers let role-based + catch-all thru and my domain got wrecked. this one actually says 'risky - dont send' clear af. dropped my bounce to 0.8% last campaign. saved my warmup big time.",
    rating: 5,
    ratingSource: "Trustpilot",
  },
];

export default function Testimonials() {
  return (
    <SectionShell
      id="testimonials"
      ariaLabelledBy="testimonials-heading"
      className="overflow-x-hidden bg-surface-muted"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2
          id="testimonials-heading"
          className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-4xl"
        >
          Trusted by email marketers
        </h2>
        <p className="mt-3 text-ink-muted">
          Real feedback from customers who clean lists with EmailVerifier.io
        </p>
      </div>

      <ul
        className="mx-auto mt-12 flex max-w-4xl flex-col gap-6 lg:flex-row lg:items-start lg:justify-center lg:gap-0 lg:pt-2"
        aria-label="Customer testimonials"
      >
        {testimonials.map((t, i) => (
          <li
            key={t.name}
            className={cn(
              "w-full lg:w-[min(100%,22rem)] lg:shrink-0",
              i === 0 && "relative z-10",
              i === 1 && "relative z-20 lg:-ml-10 lg:mt-16"
            )}
          >
            <article className="flex h-full min-h-64 flex-col rounded-3xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8">
              {t.headline ? (
                <p className="font-display text-lg font-semibold tracking-tight text-ink">
                  {t.headline}
                </p>
              ) : null}

              {t.rating != null && t.ratingSource ? (
                <div
                  className={cn(
                    "flex flex-wrap items-center gap-2",
                    t.headline ? "mt-2" : undefined
                  )}
                >
                  <span className="text-sm font-medium text-ink">
                    {t.ratingSource}
                  </span>
                  <StarRating
                    rating={t.rating}
                    size={14}
                    variant={
                      t.ratingSource === "Trustpilot" ? "trustpilot" : "default"
                    }
                    activeColor={
                      t.ratingSource === "Trustpilot"
                        ? undefined
                        : "var(--color-rating)"
                    }
                  />
                  <span className="sr-only">
                    {t.rating} out of 5 stars
                  </span>
                </div>
              ) : null}

              <blockquote
                className={cn(
                  "flex flex-1 gap-3",
                  t.headline || t.rating != null ? "mt-4" : undefined
                )}
              >
                <span
                  className="font-display text-5xl leading-none text-ink-muted/30"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <p className="pt-1 text-ink">{t.content}</p>
              </blockquote>
              <footer className="mt-8 flex items-end justify-between gap-4">
                <cite className="min-w-0 not-italic">
                  <span className="block font-semibold text-ink">{t.name}</span>
                  <span className="text-sm text-ink-muted">
                    {t.role ? `${t.role} · ${t.company}` : t.company}
                  </span>
                </cite>
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-primary-soft">
                  <span
                    className="absolute inset-0 grid place-items-center text-sm font-semibold text-primary"
                    aria-hidden
                  >
                    {t.initials}
                  </span>
                  {t.image ? (
                    <Image
                      src={t.image}
                      alt=""
                      width={56}
                      height={56}
                      sizes="56px"
                      className="relative h-14 w-14 object-cover"
                      loading="lazy"
                    />
                  ) : null}
                </div>
              </footer>
            </article>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
