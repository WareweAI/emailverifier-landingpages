import googleLogo from '/logos/google.webp';
import microsoftLogo from '/logos/microsoft.webp';
import slackLogo from '/logos/slack.webp';
import deepmindLogo from '/logos/deepmind.webp';
import zohoLogo from '/logos/zoho.webp';

const logos = [
  { src: googleLogo, alt: 'Google' },
  { src: microsoftLogo, alt: 'Microsoft' },
  { src: slackLogo, alt: 'Slack' },
  { src: deepmindLogo, alt: 'DeepMind' },
  { src: zohoLogo, alt: 'Zoho' },
  // duplicate visually only (kept visually but hidden from accessibility tree)
  { src: googleLogo, alt: 'Google' },
  { src: microsoftLogo, alt: 'Microsoft' },
  { src: slackLogo, alt: 'Slack' },
  { src: deepmindLogo, alt: 'DeepMind' },
  { src: zohoLogo, alt: 'Zoho' },
];

export default function LogoCloud(): JSX.Element {
  const firstHalf = logos.slice(0, 5);
  const secondHalf = logos.slice(5);

  return (
    <section
      aria-labelledby="logo-cloud-heading"
      className="py-12 md:py-20 bg-gray-50 overflow-hidden relative"
      role="region"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <h2 id="logo-cloud-heading" className="text-3xl lg:text-4xl font-semibold text-gray-900">
          Integrate with Trusted Platforms
        </h2>
      </div>

      {/* marquee container */}
      <div
        className="relative w-full flex overflow-hidden py-4 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
        aria-label="Trusted platform logos"
      >
        
        <ul
          role="list"
          className="flex items-center justify-center md:justify-start gap-8 [&_img]:max-w-none animate-infinite-scroll motion-reduce:animate-none"
          aria-hidden={false}
        >
          {firstHalf.map((logo, index) => (
            <li key={index} className="flex-none mx-4">
              <img
                src={logo.src}
                alt={`${logo.alt} logo`}
                className="h-10 w-auto"
                loading="lazy"
                width={144}
                height={48}
                decoding="async"
              />
            </li>
          ))}
        </ul>

        <ul
          role="presentation"
          aria-hidden="true"
          className="flex items-center justify-center md:justify-start gap-8 [&_img]:max-w-none animate-infinite-scroll motion-reduce:animate-none"
          style={{ pointerEvents: 'none' }}
        >
          {secondHalf.map((logo, i) => (
            <li key={i} className="flex-none mx-4">
              <img
                src={logo.src}
                alt=""
                aria-hidden="true"
                className="h-10 w-auto"
                loading="lazy"
                width={144}
                height={48}
                decoding="async"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
