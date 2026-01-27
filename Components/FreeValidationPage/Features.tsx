import { Ban, ChartLine, CircleCheck, Database, Gauge, ShieldCheck, Users } from "lucide-react";

const features = [
    {
        number: "01",
        title: "Advanced Syntax Validation",
        description:
            "Instantly detects malformed and invalid email addresses.",
        icon: ShieldCheck,
    },
    {
        number: "02",
        title: "Domain & MX Record Checks",
        description:
            "Confirms the domain exists and is configured to receive email.",
        icon: Database,
    },
    {
        number: "03",
        title: "Real-Time SMTP Verification",
        description:
            "Verifies mailbox availability without sending an email.",
        icon: Gauge,
    },
    {
        number: "04",
        title: "Disposable Email Detection",
        description:
            "Filters out temporary and throwaway inboxes.",
        icon: Ban,
    },
    {
        number: "05",
        title: "Role-Based Email Detection",
        description:
            "Identifies risky addresses like info@, admin@, and support@.",
        icon: Users,
    },
    {
        number: "06",
        title: "Smart Risk Scoring",
        description:
            "Smart Risk Scoring Classifies emails as Deliverable, Risky, Undeliverable, or Unknown so you can send with confidence.",
        icon: ChartLine,
    },
];


export default function Features() {
    return (
        <section
            className="bg-blue-200/30 py-12"
            aria-labelledby="accuracy-heading"
        >
            <div className="mx-auto max-w-7xl px-6">
                <div className="text-center mx-auto">
                    <h2
                        id="accuracy-heading"
                        className="text-3xl font-semibold text-gray-900"
                    >
                        What Makes{" "}
                        <span className="text-blue-600">emailverifier.io</span>{" "}
                        the Most Accurate Email Verifier
                    </h2>
                    <p className="mt-2 text-gray-700 text-xl">
                        Unlike basic email checkers, Emailverifier.io doesn&apos;t rely on cached
                        data or assumptions. Every email is verified live.
                    </p>
                </div>

                {/* Cards */}
                <div className="mt-14 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {features.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.number}
                                className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm"
                            >
                                <Icon
                                    className="absolute -top-5 -right-5 h-24 w-24 text-blue-100"
                                    strokeWidth={1.5}
                                    aria-hidden
                                />

                                <p className="text-4xl font-semibold text-blue-600">
                                    {item.number}
                                </p>

                                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom banner */}
                <div className="mt-6 mx-auto max-w-4xl">
                    <div className="relative overflow-hidden rounded-2xl bg-blue-500 px-5 py-3 text-white flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex items-center gap-4">
                            <span aria-hidden className="flex p-2 items-center justify-center rounded-full bg-white/40">
                                <CircleCheck size={48} />
                            </span>
                            <div>
                                <p className="text-2xl font-semibold">99.9%</p>
                                <p className="text-lgtext-blue-100">
                                    Lower bounce rates, higher inbox placement, and a protected sender reputation -
                                    backed by our 99% deliverability guarantee.
                                </p>
                            </div>
                        </div>

                        {/* Decorative check */}
                        <div className="absolute -right-5 -top-5 rounded-full text-white/20" aria-hidden>
                            <CircleCheck size={86} strokeWidth={1} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
