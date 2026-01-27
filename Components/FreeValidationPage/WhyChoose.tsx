
import { Check, X, AlertCircle } from "lucide-react";

const comparisonRows = [
    {
        feature: "Accurate email verification",
        emailverifier: "check",
        others: "alert",
    },
    {
        feature: "No emails sent",
        emailverifier: "check",
        others: "cross",
    },
    {
        feature: "Bulk + API",
        emailverifier: "check",
        others: "alert",
    },
    {
        feature: "Fast processing",
        emailverifier: "check",
        others: "alert",
    },
    {
        feature: "Transparent pricing",
        emailverifier: "check",
        others: "cross",
    },
];



export default function WhyChoose() {
    return (
        <section
            className="py-20 bg-white"
            aria-labelledby="comparison-heading"
        >
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center mb-12">
                    <h2
                        id="comparison-heading"
                        className="text-2xl sm:text-3xl font-semibold text-gray-900"
                    >
                        Why Choose Emailverifier.io?
                    </h2>
                    <p className="mt-3 text-gray-600">
                        Accurate, fast, and reliable email verification you can trust.
                    </p>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-blue-200">
                                <th
                                    scope="col"
                                    className="py-4 text-left font-semibold text-gray-700"
                                >
                                    Feature
                                </th>
                                <th
                                    scope="col"
                                    className="py-4 text-center font-semibold text-gray-700"
                                >
                                    Emailverifier.io
                                </th>
                                <th
                                    scope="col"
                                    className="py-4 text-center font-semibold text-gray-700"
                                >
                                    Other Tools
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {comparisonRows.map((row) => (
                                <tr
                                    key={row.feature}
                                    className="border-b last:border-b-0 border-blue-100"
                                >
                                    <td className="py-4 text-gray-800">
                                        {row.feature}
                                    </td>

                                    {/* Emailverifier */}
                                    <td className="py-4 text-center">
                                        <Check
                                            className="inline-block text-green-500"
                                            size={18}
                                            aria-label="Available"
                                        />
                                    </td>

                                    {/* Other tools */}
                                    <td className="py-4 text-center">
                                        {row.others === "alert" ? (
                                            <AlertCircle
                                                className="inline-block text-orange-400"
                                                size={18}
                                                aria-label="Limited"
                                            />
                                        ) : (
                                            <X
                                                className="inline-block text-red-500"
                                                size={18}
                                                aria-label="Not available"
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}
