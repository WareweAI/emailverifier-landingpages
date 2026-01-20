import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from './ui/Button';
import Link from 'next/link';

export default function CTA() {
    return (
        <section className="py-20 bg-gray-900 relative isolate"
            id="cta" aria-labelledby="cta-heading" role="region">

            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, rgba(255,250,250,0.1) 2px, transparent 2px), linear-gradient(180deg, rgba(59,130,246,0.03), rgba(99,102,241,0.01))",
                    backgroundSize: "40px 40px, 100% 100%",
                    backgroundPosition: "0 0, 0 0",
                }}
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center text-white">
                    <h2 id="cta-heading" className="text-3xl lg:text-5xl font-semibold mb-5">
                        Ready to <span className='text-blue-600'>Clean Your List?</span>
                    </h2>
                    <p className="text-xl text-blue-50 mb-12 max-w-2xl mx-auto">
                        Join thousands of marketers keeping their email lists healthy and their messages reaching inboxes.
                    </p>

                    <div className="flex flex-col gap-4 items-center mb-10 ">
                        <Button size="xs" className="bg-linear-to-r from-blue-700 to-blue-900
                    text-white hover:opacity-90  lg:text-xl px-8 py-3
                     transition-opacity duration-300 ease-in font-normal" asChild>
                            <Link href="https://app.emailverifier.io/register" target="_blank"
                                rel="noopener noreferrer" aria-label="Try Email Verifier free — register for 100 free verifications">
                                Try It Free - 100 Verifications On Us
                                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                            </Link>
                        </Button>
                    </div>

                    <ul className="flex flex-wrap justify-center items-center gap-3 text-white list-none p-0 m-0">
                        <li className="inline-flex items-center gap-2">
                            <CheckCircle size={18} aria-hidden="true" />
                            <span>No setup</span>
                        </li>

                        <li className="inline-flex items-center gap-2">
                            <CheckCircle size={18} aria-hidden="true" />
                            <span>No credit card</span>
                        </li>

                        <li className="inline-flex items-center gap-2 font-semibold">
                            <span>- Just results.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}