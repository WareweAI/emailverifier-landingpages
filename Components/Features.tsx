
import { Shield, Zap, Globe, BarChart3, Lock, Cpu, Database, Filter } from 'lucide-react';
import Image from 'next/image';

const features = [
    {
        icon: Shield,
        title: 'Advanced Validation',
        description:
            'Smart checks for syntax, domain, and mailbox accuracy.',
        card: "/assets/featuresCard/FeatureValidation.svg",
        id: "advanced-validation"
    },
    {
        icon: Zap,
        title: 'Spam Trap Detection',
        description:
            'Catch hidden traps before they hurt your deliverability.',
        card: "/assets/featuresCard/FeatureThreat.svg",
        id: "spam-trap-detection"
    },
    {
        icon: Globe,
        title: 'Disposable Email Check',
        description:
            'Filter out throwaway or fake signups.',
        card: "/assets/featuresCard/FeatureDisposable.svg",
        id: "disposable-email-check"
    },
    {
        icon: BarChart3,
        title: 'Catch-All Detection',
        description:
            'Identify risky “accept-all” domains.',
        card: "/assets/featuresCard/FeatureCatchAll.svg",
        id: "catch-all-detection"
    },
    {
        icon: Cpu,
        title: 'Real-Time API',
        description:
            'Verify emails instantly right inside your app.',
        card: "/assets/featuresCard/FeatureApi.svg",
        id: "real-time-api"
    },
    {
        icon: Database,
        title: 'Bulk Verification',
        description:
            'Upload and verify thousands of emails fast.',
        card: "/assets/featuresCard/FeatureBulk.svg",
        id: "bulk-verification"
    },
    {
        icon: Filter,
        title: 'Role-Based Filtering',
        description:
            'Skip generic inboxes like info@ or sales@.',
        card: "/assets/featuresCard/FeatureRole.svg",
        id: "role-based-filtering"
    },
    {
        icon: Lock,
        title: 'GDPR & CCPA Compliant',
        description:
            'Your data stays safe, private, and protected - and automatically deletes your files 30 days after upload.',
        card: "/assets/featuresCard/FeatureCompliance.svg",
        id: "gdpr-compliant"
    },
];

export default function Features() {
    return (
        <section id="features" className="py-20 bg-white" aria-labelledby="features-heading" role="region">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h2 id="features-heading" className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Powerful Features That Just Work
                    </h2>
                    <p className='lg:text-xl max-w-2xl mx-auto'>Everything you need to maintain a clean, high-quality email list and improve your delivery rates.</p>
                </div>

                {/* Features List */}
                <ul className="flex flex-col gap-16 lg:gap-6 max-w-5xl mx-auto">
                    {features.map((feature, index) => (
                        <li
                            key={feature.id}
                            className={`flex flex-col-reverse lg:flex-row items-center gap-4 lg:gap-6
                 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                            id={feature.id}

                        >

                            <figure className="lg:w-[55%] flex justify-center">
                                <Image
                                    src={feature.card}
                                    alt={`${feature.title} feature illustration`}
                                    className="w-full h-auto"
                                    loading='lazy'
                                    width={800}
                                    height={500}
                                />
                                <figcaption className="sr-only">{feature.title} illustration</figcaption>
                            </figure>


                            <article className="flex-1 flex items-start gap-4  px-2" aria-labelledby={`${feature.id}-title`} aria-describedby={`${feature.id}-desc`}>
                                <div className="flex items-center justify-center lg:justify-start mb-4">
                                    <span className="p-4 bg-blue-100 rounded-lg text-blue-900" aria-hidden="true">
                                        <feature.icon className="w-6 h-6" aria-hidden="true" focusable="false" />
                                    </span>
                                </div>

                                <div>
                                    <h3 id={`${feature.id}-title`} className="text-2xl font-semibold text-gray-900 mb-3">
                                        {feature.title}
                                    </h3>
                                    <p id={`${feature.id}-desc`} className="text-gray-600 text-lg leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
