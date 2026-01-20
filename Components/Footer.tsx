import { Mail, MapPin } from 'lucide-react';
import Link from 'next/link';


const LinkedInIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true" focusable="false" >
        <g clipPath="url(#clip0_204_228)">
            <path d="M18.7836 21.821H5.34925C3.5754 21.821 2.13232 20.381 2.13232 18.6108V5.21026C2.13232 3.44 3.5754 2 5.34925 2H18.7836C20.5569 2 22 3.44 22 5.21026V18.6113C22 20.3815 20.5569 21.821 18.7836 21.821ZM8.84566 18.3862H8.84976V9.83641H6.18976V18.3862H8.84514H8.84566ZM7.51796 8.66872C7.72021 8.66899 7.92052 8.62935 8.10742 8.55208C8.29432 8.47481 8.46414 8.36142 8.60715 8.21842C8.75016 8.07541 8.86354 7.90559 8.94081 7.71869C9.01809 7.53179 9.05772 7.33148 9.05745 7.12923C9.05664 6.72118 8.89418 6.33008 8.60565 6.04155C8.31711 5.75301 7.92601 5.59056 7.51796 5.58974C7.10971 5.58988 6.71821 5.75212 6.42953 6.0408C6.14085 6.32948 5.97861 6.72098 5.97848 7.12923C5.97861 7.53749 6.14085 7.92898 6.42953 8.21766C6.71821 8.50634 7.10971 8.66858 7.51796 8.66872ZM18.799 18.3867V13.6995C18.799 11.3964 18.299 9.62462 15.6118 9.62462C14.32 9.62462 13.4528 10.3323 13.0964 11.0041H13.0605V9.83641H10.5133V18.3862H13.1687V14.1554C13.1687 13.0395 13.3805 11.96 14.7636 11.96C16.1236 11.96 16.1436 13.2359 16.1436 14.2272V18.3862H18.799V18.3867Z" fill="#131313" />
        </g>
        <defs>
            <clipPath id="clip0_204_228">
                <rect width="20" height="20" fill="white" transform="translate(2 2)" />
            </clipPath>
        </defs>
    </svg>

);

const socialLinks = [
    { href: 'https://www.linkedin.com/company/email-verifier/', icon: LinkedInIcon, label: 'Email Verifier LinkedIn' },
];

export default function Footer() {
    return (
        <footer id="contact" className="bg-white relative overflow-hidden">
            {/* Decorative rings in the corner */}
            <div className="absolute bottom-0 right-0 pointer-events-none" aria-hidden="true">
                <div className="absolute -bottom-65 -right-65 w-130 h-130 rounded-full bg-[#1F5DD81A] opacity-40"></div>
                <div className="absolute -bottom-55 -right-55 w-110 h-110 rounded-full bg-[#5B8BEA33] opacity-50"></div>
                <div className="absolute -bottom-45 -right-45 w-90 h-90 rounded-full bg-[#8AADF34D] opacity-60"></div>
                <div className="absolute -bottom-33.75 -right-33.75 w-67.5 h-67.5 rounded-full bg-[#C6D8FB99] opacity-70"></div>
                <div className="absolute -bottom-22.5 -right-22.5 w-45 h-45 rounded-full bg-[#F6F9FF66] opacity-80"></div>
            </div>

            <div className="container mx-auto px-6 sm:px-6 lg:px-8 pt-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-5">
                    {/* Company Info */}
                    <div className="md:col-span-3 lg:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">

                            <svg className='scale-150' width="35" height="28" viewBox="0 0 35 28" fill="none" xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true" focusable="false">
                                <path d="M8.30763 1.90089C10.7707 0.887093 13.5124 0.661373 16.0334 1.22291C17.5465 1.5563 18.9793 2.16639 20.2416 2.99774C21.0833 3.55151 21.8505 4.20212 22.5204 4.92875C21.7287 4.33703 20.878 3.84311 19.9931 3.45209C18.6654 2.86497 17.2588 2.51365 15.8524 2.40317C13.5077 2.21593 11.1691 2.70595 9.1631 3.75736C7.15365 4.80476 5.48115 6.40887 4.36219 8.31866C3.23865 10.2265 2.67023 12.436 2.72935 14.6317C2.78357 16.8275 3.46481 19.0052 4.68521 20.8525C5.90105 22.7017 7.65464 24.2159 9.71507 25.1582C11.7728 26.1049 14.1343 26.4761 16.4665 26.1681C17.8652 25.9852 19.2513 25.561 20.5468 24.9062C21.4106 24.47 22.234 23.9318 22.9943 23.3C22.3626 24.0603 21.6306 24.7516 20.8184 25.3481C19.6007 26.2434 18.1999 26.925 16.7061 27.3359C14.2175 28.0266 11.4691 27.9427 8.95722 27.0573C6.44303 26.1813 4.17921 24.5075 2.58737 22.3132C0.987961 20.125 0.0705881 17.4285 0.00499414 14.7027C-0.0702581 11.977 0.707065 9.23593 2.19158 6.96802C3.66808 4.69454 5.84205 2.90543 8.30763 1.90089Z" fill="#C6DEFF" />
                                <path d="M11.1755 4.49318C13.1157 3.66181 15.3027 3.41631 17.3678 3.78857C19.4342 4.15432 21.3695 5.13624 22.8567 6.55553C23.7505 7.40528 24.4864 8.40773 25.0194 9.49819C25.3751 10.225 25.6414 10.9914 25.8131 11.7735C25.5817 11.0064 25.2628 10.2678 24.8643 9.57806C24.2669 8.54324 23.4902 7.61672 22.5843 6.84837C21.076 5.56516 19.2018 4.73159 17.256 4.46123C15.3105 4.18583 13.2986 4.47414 11.5272 5.27233C9.75361 6.06603 8.22599 7.36718 7.17473 8.97462C6.11914 10.5793 5.54322 12.4849 5.53871 14.402C5.52917 16.3193 6.091 18.2428 7.14767 19.8738C8.19971 21.5072 9.74441 22.8429 11.5543 23.6666C12.639 24.1623 13.8168 24.4767 15.0211 24.586C15.8237 24.6591 16.6381 24.6413 17.4436 24.5327C16.6486 24.701 15.8299 24.7777 15.0103 24.7581C13.7808 24.7294 12.5489 24.4837 11.3937 24.0322C9.46678 23.2835 7.76037 21.9522 6.57047 20.2501C5.37526 18.5521 4.70233 16.4908 4.6729 14.4091C4.63683 12.3274 5.24578 10.2334 6.39911 8.48121C7.5466 6.72586 9.23317 5.31827 11.1755 4.49318Z" fill="#111827" />
                                <path d="M19.1835 17.1672L15.4479 9.29176H9.99561L19.1835 22.8214L34.7326 0.204651H24.8377L19.1835 17.1672Z" fill="url(#paint0_linear_189_1441)" />
                                <defs>
                                    <linearGradient id="paint0_linear_189_1441" x1="22.3641" y1="0.204651" x2="22.3641" y2="22.8214" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#2563EB" />
                                        <stop offset="1" stopColor="#1B4297" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <span className="text-4xl font-serif text-slate-900">Email Verifier</span>
                        </div>

                        <p className="mb-6 leading-tight max-w-sm text-black text-lg">
                            Professional email verification trusted by thousands worldwide.
                        </p>

                        <div className="flex space-x-4">
                            {socialLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.href}
                                    aria-label={link.label}
                                    target='_blank'
                                    rel="noopener noreferrer"
                                    className="w-14 h-14 border border-slate-200 rounded-full flex justify-center items-center hover:bg-slate-100 transition-colors"
                                >
                                    <span className="sr-only">{link.label}</span>
                                    <link.icon />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Explore Links */}
                    <nav aria-label="Footer — Explore">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Explore</h3>
                        <ul className="space-y-1">
                            <li>
                                <Link href="/#how-it-works" className="block text-slate-600 hover:text-slate-900 transition-colors focus:outline-none ">
                                    How it Works
                                </Link>
                            </li>
                            <li>
                                <Link href="/#features" className="block text-slate-600 hover:text-slate-900 transition-colors focus:outline-none ">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="block text-slate-600 hover:text-slate-900 transition-colors focus:outline-none ">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/#testimonials" className="block text-slate-600 hover:text-slate-900 transition-colors focus:outline-none ">
                                    Testimonials
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing/#faqs" className="block text-slate-600 hover:text-slate-900 transition-colors focus:outline-none ">
                                    FAQS
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Legal Links */}
                    <nav aria-label="Footer — Legal">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Legal</h3>
                        <ul className="space-y-1">
                            <li>
                                <Link href="/privacy-policy" className="block text-slate-600 hover:text-slate-900 transition-colors focus:outline-none ">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms-of-service" className="block text-slate-600 hover:text-slate-900 transition-colors focus:outline-none ">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Contact</h3>
                        <div className="space-y-3">
                            <Link
                                href="mailto:support@emailverifier.io"
                                className="flex items-center text-slate-600 hover:text-slate-900 transition-colors focus:outline-none "
                                aria-label="Email support at support@emailverifier.io"
                            >
                                <Mail className="w-5 h-5 mr-2 shrink-0" aria-hidden />
                                <span>support@emailverifier.io</span>
                            </Link>

                            <address className="not-italic text-slate-600 text-sm inline-flex max-w-xs lg:max-w-none items-start">
                                <MapPin className="w-5 h-5 mr-2 shrink-0" aria-hidden />
                                <span>
                                    1111B S Governors Ave STE 25016
                                    <br />
                                    Dover, DE, 19904 US
                                </span>
                            </address>
                        </div>
                    </div>
                </div>

                <p className="text-center lg:text-right text-slate-600 text-md py-4 lg:py-6 border-t border-gray-300">
                    <small>©{new Date().getFullYear()} emailverifier.io, All rights reserved</small>
                </p>
            </div>
        </footer>
    );
}