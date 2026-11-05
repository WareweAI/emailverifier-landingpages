import Image from "next/image";
import Link from "next/link";
import { Button } from "@/Components/ui/Button";
import {
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/Components/ui/SectionHeading";

/** Product integration marks — matches this section’s claimed platforms. */
const LOGOS = [
  {
    src: "/logos/integrations/google-sheets.svg",
    alt: "Google Sheets",
    label: "Google Sheets",
    width: 40,
    height: 54,
  },
  {
    src: "/logos/integrations/hubspot-wordmark.png",
    alt: "HubSpot",
    width: 150,
    height: 42,
  },
  {
    src: "/logos/integrations/salesforce-wordmark.png",
    alt: "Salesforce",
    width: 120,
    height: 84,
  },
  {
    src: "/logos/integrations/onedrive-2025.svg",
    alt: "OneDrive",
    label: "OneDrive",
    width: 72,
    height: 48,
  },
] as const;

export default function LogoCloud() {
  return (
    <section
      className="bg-background py-12 md:py-16"
      aria-labelledby="logo-cloud-heading"
    >
      <div className="site-container">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow align="center">Integrations</SectionEyebrow>
          <SectionHeading id="logo-cloud-heading">
            Integrate with trusted platforms
          </SectionHeading>
          <SectionLead className="mx-auto max-w-3xl">
            Connect EmailVerifier.io to Google Sheets, HubSpot, Salesforce, and
            OneDrive to verify contacts where they already live, or use the API
            to bring verification into any app that can make an HTTP request.
          </SectionLead>
        </div>

        <ul
          className="mx-auto mt-10 flex max-w-5xl list-none flex-wrap items-center justify-center gap-x-10 gap-y-6 p-0 sm:gap-x-14"
          aria-label="Integration platforms"
        >
          {LOGOS.map((logo) => {
            const label = "label" in logo ? logo.label : undefined;
            return (
              <li
                key={logo.src}
                className="flex items-center gap-2.5"
              >
                <Image
                  src={logo.src}
                  alt={label ? "" : logo.alt}
                  width={logo.width}
                  height={logo.height}
                  unoptimized
                  className="h-9 w-auto object-contain sm:h-10"
                  loading="lazy"
                />
                {label ? (
                  <span className="text-base font-semibold tracking-tight text-ink sm:text-lg">
                    {label}
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex justify-center">
          <Button asChild variant="secondary" size="md">
            <Link href="/integrations">View all Integrations</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
