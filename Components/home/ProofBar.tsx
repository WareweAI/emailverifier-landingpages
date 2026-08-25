import Image from "next/image";

const BRANDS = [
  { src: "/logos/wareweeLogo.webp", alt: "Warewee" },
  { src: "/logos/redserpLogo.webp", alt: "RedSerp" },
  { src: "/logos/paperboatLogo.webp", alt: "Paperbot AI" },
  { src: "/logos/saasyogiLogo.webp", alt: "SaaS Yogi" },
];

function LogoRow({
  brands,
  ariaHidden,
}: {
  brands: typeof BRANDS;
  ariaHidden?: boolean;
}) {
  return (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={ariaHidden}
      aria-label={ariaHidden ? undefined : "Customer logos"}
    >
      {brands.map((brand, i) => (
        <li key={`${brand.src}-${i}`} className="shrink-0 px-8 md:px-12">
          <Image
            src={brand.src}
            alt={ariaHidden ? "" : brand.alt}
            width={140}
            height={40}
            sizes="140px"
            className="h-8 w-auto object-contain opacity-70 grayscale"
            loading="lazy"
          />
        </li>
      ))}
    </ul>
  );
}

export default function ProofBar() {
  const track = [...BRANDS, ...BRANDS];

  return (
    <section
      className="bg-surface py-0"
      aria-labelledby="proof-bar-heading"
    >
      <p
        id="proof-bar-heading"
        className="mb-8 py-3 text-center text-base font-medium text-ink md:text-lg lg:text-xl"
      >
        Used by agencies and SaaS teams
      </p>

      <div className="group relative mx-auto max-w-3xl overflow-hidden py-3 mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max motion-safe:animate-logo-marquee group-hover:motion-safe:[animation-play-state:paused] motion-reduce:w-full motion-reduce:justify-center motion-reduce:flex-wrap">
          <LogoRow brands={track} />
          <div className="motion-reduce:hidden">
            <LogoRow brands={track} ariaHidden />
          </div>
        </div>
      </div>
    </section>
  );
}
