import { FileUp, ShieldCheck, LineChart, FileDown } from 'lucide-react';


const processSteps = [
  {
    number: '01',
    icon: FileUp,
    title: 'Upload Your List',
    description: 'Drop in your file, connect your app, or use our API - whatever works for you.',
  },
  {
    number: '02',
    icon: ShieldCheck,
    title: 'Real-time Verification',
    description: 'We check every address using smart, multi-layer validation.',
  },
  {
    number: '03',
    icon: LineChart,
    title: 'See Your Results',
    description: 'Get a clear, detailed report with statuses, risks, and recommendations.',
  },
  {
    number: '04',
    icon: FileDown,
    title: 'Download Your Clean List',
    description: 'Export your verified list and send your next campaign with confidence.',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="bg-blue-50 py-16 sm:py-24"
      aria-labelledby="howitworks-heading" role="region">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-xl text-center">
          <h2 id="howitworks-heading" className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How it Works
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Our 4-step process keeps things simple, fast, and accurate.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {processSteps.map((step) => {
            const IconComponent = step.icon;
            return (
              <article
                key={step.number}
                aria-labelledby={`${step.number}-title`}
                tabIndex={0}
                role="group"
                className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200/50 hover:shadow-md"
              >
                <IconComponent
                  className="absolute -right-8 -top-8 h-32 w-32 text-blue-50"
                  strokeWidth={1.5} aria-hidden="true" focusable="false" />

                <span className="sr-only">Step {parseInt(step.number, 10)}</span>

                {/* Card Content */}
                <div className="relative">
                  <p className="text-5xl font-bold text-blue-600" aria-hidden="true">{step.number}</p>
                  <h3 id={`${step.number}-title`} className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base  text-gray-600">
                    {step.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;