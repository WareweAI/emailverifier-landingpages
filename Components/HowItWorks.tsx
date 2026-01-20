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

export default function HowItWorks() {
    return (
        <section
            className="bg-blue-50 py-16 sm:py-24"
            aria-labelledby="howitworks-heading"
            role="region"
            id="how-it-works"
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Heading */}
                <div className="mx-auto max-w-xl text-center">
                    <h2
                        id="howitworks-heading"
                        className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                    >
                        How it Works
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600">
                        Our 4-step process keeps things simple, fast, and accurate.
                    </p>
                </div>


                <ol
                    className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4 list-none"
                    aria-label="4-step verification process"
                >
                    {processSteps.map((step, index) => {
                        const IconComponent = step.icon;
                        return (
                            <li
                                key={step.number}
                                role="listitem"
                                aria-labelledby={`${step.number}-title`}
                                aria-label={`Step ${index + 1} of ${processSteps.length}: ${step.title}`}
                                aria-posinset={index + 1}
                                aria-setsize={processSteps.length}
                                className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200/50 hover:shadow-md focus-within:ring-2 focus-within:ring-blue-600 focus:outline-none"
                            >
                                <IconComponent
                                    className="absolute -right-8 -top-8 h-32 w-32 text-blue-50"
                                    strokeWidth={1.5}
                                    aria-hidden="true"
                                    focusable="false"
                                />

                                {/* screen readers */}
                                <span className="sr-only">Step {index + 1}</span>

                                {/* Step Content */}
                                <div className="relative">
                                    <p className="text-5xl font-bold text-blue-600" aria-hidden="true">
                                        {step.number}
                                    </p>
                                    <h3
                                        id={`${step.number}-title`}
                                        className="mt-6 text-lg font-semibold leading-7 text-gray-900"
                                    >
                                        {step.title}
                                    </h3>
                                    <p className="mt-2 text-base text-gray-600">{step.description}</p>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
};

