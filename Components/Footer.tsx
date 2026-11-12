import { Linkedin, Youtube } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

/** Footer nav mirrors Header mega menus (Products / Solutions / Resources). */
const productLinks = [
  { href: "/validate-email", label: "Email Validator" },
  { href: "/bulk-email-verifier", label: "Bulk Email Verifier" },
  { href: "/email-verification-api", label: "Email Validation API" },
  { href: "/email-finder", label: "Email Finder" },
  { href: "/find-leads", label: "Lead Finder" },
  { href: "/data-enrichment", label: "Data Enrichment" },
];

const solutionLinks = [
  { href: "/bulk-email-verifier", label: "Cold Outreach List Cleaning" },
  { href: "/email-verification-api", label: "Signup Form Validation" },
  { href: "/find-leads", label: "Prospecting" },
  { href: "/validate-email", label: "Blacklist Avoidance" },
];

const resourceLinks = [
  { href: "/blog", label: "Guides" },
  { href: "/#features", label: "Integrations" },
  { href: "/blog", label: "Blog" },
  { href: "/pricing", label: "Pricing" },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
];

const socialLinks = [
  {
    href: "https://www.linkedin.com/company/email-verifier/",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://www.youtube.com/@emailverifierio",
    label: "YouTube",
    icon: Youtube,
  },
] as const;

const footerLinkClassName =
  "inline-flex min-h-11 items-center text-sm font-medium leading-snug text-ink transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:min-h-0 md:py-1";

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="text-sm text-ink-muted">{title}</h3>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className={footerLinkClassName}>
      {label}
    </Link>
  );
}

function FooterNavList({
  label,
  links,
}: {
  label: string;
  links: ReadonlyArray<{ href: string; label: string }>;
}) {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-col md:-space-y-0.5">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <FooterLink href={link.href} label={link.label} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FooterWordmark() {
  return (
    <div className="relative mt-16 px-1 py-3 sm:mt-24" aria-hidden>
      <div className="pointer-events-none absolute inset-0 text-ink/15">
        <div className="absolute inset-y-0 left-[6%] w-px bg-current" />
        <div className="absolute inset-y-0 left-[22%] w-px bg-current" />
        <div className="absolute inset-y-0 right-[20%] w-px bg-current" />
        <div className="absolute inset-y-0 right-[5%] w-px bg-current" />
        <div className="absolute inset-x-0 top-[18%] h-px bg-current" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-current" />
        <div className="absolute inset-x-0 bottom-[20%] h-px bg-current" />
      </div>
      <p
        className="relative whitespace-nowrap text-center font-display font-semibold leading-none tracking-[-0.05em] text-transparent"
        /* 1-off: outlined watermark — stroke weight tracks the reference wordmark */
        style={{
          fontSize: "clamp(2.25rem, 15.6vw, 18rem)",
          WebkitTextStroke:
            "max(1.5px, 0.2vw) color-mix(in srgb, var(--color-ink) 32%, transparent)",
        }}
      >
        EmailVerifier
      </p>
    </div>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="overflow-hidden bg-background">
      <div className="site-container pt-16 lg:pt-20">
        <div className="mx-auto grid w-fit max-w-full grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-6">
          <FooterColumn title="Products">
            <FooterNavList label="Footer — Products" links={productLinks} />
          </FooterColumn>

          <FooterColumn title="Solutions">
            <FooterNavList label="Footer — Solutions" links={solutionLinks} />
          </FooterColumn>

          <FooterColumn title="Resources">
            <FooterNavList label="Footer — Resources" links={resourceLinks} />
          </FooterColumn>

          <FooterColumn title="Legal">
            <FooterNavList label="Footer — Legal" links={legalLinks} />
          </FooterColumn>

          <FooterColumn title="Contact">
            <Link
              href="mailto:support@emailverifier.io"
              className={footerLinkClassName}
            >
              support@emailverifier.io
            </Link>
            <address className="mt-1 max-w-[16rem] text-sm not-italic leading-snug text-ink-muted md:mt-0.5">
              1111B S Governors Ave STE 25016
              <br />
              Dover, DE 19904 US
            </address>
          </FooterColumn>
        </div>
      </div>

      <FooterWordmark />

      <div className="site-container pb-10 pt-8 lg:pb-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-muted">
            © {new Date().getFullYear()} EmailVerifier.io. All rights reserved.
          </p>

          <ul className="flex items-center gap-6">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center text-ink transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <Icon className="h-5 w-5 shrink-0" aria-hidden strokeWidth={1.5} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
