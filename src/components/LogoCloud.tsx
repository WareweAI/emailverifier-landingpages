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
  // Duplicate logos if you have few and want more visible without scrolling
  { src: googleLogo, alt: 'Google' },
  { src: microsoftLogo, alt: 'Microsoft' },
  { src: slackLogo, alt: 'Slack' },
  { src: deepmindLogo, alt: 'DeepMind' },
  { src: zohoLogo, alt: 'Zoho' },
];

export default function LogoCloud() {
  return (
    <section className="py-12 md:py-20 bg-gray-50 overflow-hidden relative" aria-labelledby="integration-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <h2 id="integration-heading" className="text-3xl lg:text-4xl font-semibold text-gray-900">
          Integrate with Trusted Platforms
        </h2>
      </div>

      <div role="presentation" aria-label="Scrolling logos of trusted platform partners"
        className="relative w-full flex overflow-hidden py-4 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <ul aria-label="List of integrated platforms"
          className="flex items-center justify-center md:justify-start [&_li]:mx-2
          [&_img]:max-w-none animate-infinite-scroll group-hover:animation-pause list-none">
          {logos.map((logo, index) => (
            <li key={index}>
              <img src={logo.src} alt={logo.alt} loading="lazy"
                decoding="async" className="h-10 mx-8" />
            </li>
          ))}
        </ul>
        <ul aria-hidden="true"
          className="flex items-center justify-center [&_li]:mx-2 [&_img]:max-w-none 
          animate-infinite-scroll group-hover:animation-pause list-none">
          {logos.map((logo, index) => (
            <li key={index + logos.length}>
              <img src={logo.src} alt={logo.alt} loading="lazy"
                decoding="async" className="h-10 mx-8" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}