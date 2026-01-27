
import Features from "@/Components/FreeValidationPage/Features"
import LeadingBrand from "@/Components/LeadingBrand"
import { ArrowRight, Mail, } from "lucide-react"
import { Metadata } from "next"
// import Link from "next/link"


export const metadata: Metadata = {
    title: "Free Email Validator and Checker | Emailverifier.io"
}



export default function ValidateEmailPage() {
    return (
        <main className="relative bg-white text-gray-800 overflow-hidden isolate grow"
            id="pricing-main-content" aria-labelledby="validate-email-heading">

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 -left-40 w-125 h-125 rounded-full 
                 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1),transparent_70%)] -z-10"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-10 -right-60 w-125 h-125 rounded-full 
                bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1),transparent_70%)] -z-10"
            />

            <div className="relative">
                {/* dotted background */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 pointer-events-none"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, rgba(209,226,255,1) 2px, transparent 2px), linear-gradient(180deg, rgba(59,130,246,0.03), rgba(99,102,241,0.01))",
                        backgroundSize: "50px 50px, 100% 100%",
                    }}
                />

                <section className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
                    {/* Badge */}
                    <div className="mb-6">
                        <span className="inline-flex items-center rounded-full bg-white
                    px-4 py-1 text-sm font-medium text-blue-600 shadow-xs">
                            #1 Email Verification Tool
                        </span>
                    </div>

                    <h1
                        id="validate-email-heading"
                        className="text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight mb-4"
                    >
                        Free Email Verifier Tool You Can Trust the most for{" "}
                        <span className="text-blue-600">accurate Email Validation</span>
                    </h1>

                    <p className="text-gray-500 mb-10">
                        Enter an email address to check its deliverability
                    </p>

                    <div className="mx-auto max-w-xl space-y-3">
                        {/* Input Card */}
                        <div className="py-2 px-3 shadow-[0px_13px_20px_-3px_rgba(0,0,0,0.1)] bg-white rounded-2xl">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 flex-1 bg-blue-100/25 p-2 rounded-sm">
                                    <span className="text-gray-400">
                                        <Mail />
                                    </span>
                                    <input
                                        type="email"
                                        placeholder="Enter email address (e.g. name@company.com)"
                                        className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
                                    />
                                </div>

                                <button
                                    className="py-2 px-6 rounded-sm bg-linear-to-r from-blue-600 to-blue-800 
                            text-white font-medium flex items-center gap-2 hover:opacity-90 transition cursor-pointer"
                                >
                                    Verify Email
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                        {/* STATUS MESSAGES */}

                        {/* limit warning done */}
                        {/* <div className=" rounded-lg border border-yellow-300 
                        bg-yellow-50 px-4 py-3 text-base text-gray-600 text-left flex items-start gap-2">
                        <span className="text-yellow-500"><TriangleAlert size={18} /></span>
                        <p>
                            You&apos;ve reached the maximum number of trial limit. Please{" "}
                            <Link href="/signin" className="underline">sign in</Link> or{" "}
                            <Link href="/register" className="underline">create a free account</Link> to continue.
                        </p>
                    </div> */}

                        {/* invalid done */}
                        {/* <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
                        <CircleX size={20} /> This email is invalid!
                    </div> */}


                        {/* VALID done*/}
                        {/* <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
                        <span><CircleCheck size={20} /></span> This email is Valid. OK to send!
                    </div> */}
                    </div>

                    {/* Trust line */}
                    <p className="mt-4 text-sm text-blue-900 font-medium">
                        Trusted by 1000+ businesses across 100+ countries
                    </p>
                </section>

            </div>

            <LeadingBrand />



            {/* features section */}
            <Features />
        </main>
    )
}
