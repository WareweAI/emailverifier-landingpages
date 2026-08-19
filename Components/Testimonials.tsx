import Image from "next/image";
import { SectionShell } from "@/Components/ui/SectionShell";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Lilly Daniels",
    role: "Marketing lead",
    company: "GB",
    image: "/assets/LDProfile.webp",
    initials: "LD",
    content:
      "Their pricing is fair, and the results are always consistent. EmailVerifier.io has become a must-have tool in my marketing toolkit.",
  },
  {
    name: "Isa Hamilton",
    role: "Email marketer",
    company: "US",
    image: "/assets/IHProfile.webp",
    initials: "IH",
    content:
      "I used EmailVerifier.io for cleaning my email list, and the accuracy was amazing. It removed all fake and invalid emails in minutes.",
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
              <blockquote className="flex flex-1 gap-3">
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
                    {t.role} · {t.company}
                  </span>
                </cite>
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-primary-soft">
                  <span
                    className="absolute inset-0 grid place-items-center text-sm font-semibold text-primary"
                    aria-hidden
                  >
                    {t.initials}
                  </span>
                  <Image
                    src={t.image}
                    alt=""
                    width={56}
                    height={56}
                    sizes="56px"
                    className="relative h-14 w-14 object-cover"
                    loading="lazy"
                  />
                </div>
              </footer>
            </article>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
