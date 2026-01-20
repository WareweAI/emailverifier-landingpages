'use client';

import { useState } from 'react';
import { ChevronDown, LogIn, Menu, X } from 'lucide-react';

import Link from 'next/link';
import { Button } from './ui/Button';

const MENU_LIST = [
    {
        title: "Advanced Validation",
        desc: "Multi-layer email accuracy check.",
        link: "/#advanced-validation",
    },
    {
        title: "Catch-All Detection",
        desc: "Identify risky catch-all domains.",
        link: "/#catch-all-detection",
    },
    {
        title: "Spam Trap Detection",
        desc: "Protect your sender reputation.",
        link: "/#spam-trap-detection",
    },
    {
        title: "Bulk Verification",
        desc: "Clean large lists in seconds.",
        link: "/#bulk-verification",
    },
    {
        title: "Disposable Email Check",
        desc: "Remove temporary email addresses.",
        link: "/#disposable-email-check",
    },
    {
        title: "Role-Based Filtering",
        desc: "Exclude generic addresses automatically.",
        link: "/#role-based-filtering",
    },
];


export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link className="flex items-center space-x-2" href='/' aria-label="Email Verifier — Home">
                        <span aria-hidden>
                            <svg width="35" height="28" viewBox="0 0 35 28" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
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

                        </span>
                        <span className="text-xl font-medium font-serif text-gray-900">Email Verifier</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8" aria-label="Primary">
                        <div className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1 
                            py-3 cursor-default group relative" aria-haspopup="menu" aria-controls="features-menu">
                            Features <ChevronDown size={"1rem"} aria-hidden />
                            <ul
                                id="features-menu"
                                role="menu"
                                className="hidden group-hover:grid grid-cols-2 gap-2.5 list-none
                                absolute top-full left-0 w-135 bg-[#111827] shadow-lg p-2.5 rounded-xl"
                            >
                                {MENU_LIST.map((item) => (
                                    <li
                                        key={item.link}
                                        onClick={() => (window.location.href = item.link)}
                                        className="group/item hover:bg-gray-100 text-white hover:text-[#111827]
                                        py-3 px-5 rounded-md cursor-pointer transition-colors" role="none">
                                        <p className="font-semibold">{item.title}</p>
                                        <p className="text-sm text-gray-400 group-hover/item:text-gray-500 transition-colors">
                                            {item.desc}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>


                        <a href="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Button className='px-2.5 py-2
                        transition-colors duration-300 ease-in' variant="ghost" asChild title='Log in'>
                            <a href="https://app.emailverifier.io/signin" target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Sign in to Email Verifier"><LogIn aria-hidden /><span className="sr-only">Sign in</span></a>
                        </Button>
                        <Button className='bg-linear-to-r from-blue-500 to-blue-700 hover:bg-blue-600 text-white px-2.5 py-2
                        transition-colors duration-300 ease-in' asChild>
                            <a href="https://app.emailverifier.io/register" target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Register — Get Started for Free">Get Started for Free</a>
                        </Button>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div id='mobile-menu' role="region" aria-label="Mobile navigation"
                        className="md:hidden py-4 border-t border-gray-100">
                        <nav className="flex flex-col space-y-4">
                            <Link href="/#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</Link>
                            <Link href="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</Link>
                            <div className="flex flex-col  space-y-2 pt-4">
                                <Button variant="ghost"
                                    className='border border-blue-500
                                    px-6 py-2  transition-colors duration-300 ease-in' asChild>
                                    <a href="https://app.emailverifier.io/signin" target="_blank" rel="noopener noreferrer">Sign In</a>
                                </Button>
                                <Button
                                    className='bg-linear-to-r from-blue-500 to-blue-700 hover:bg-blue-600 text-white
                                    px-6 py-2  transition-colors duration-300 ease-in' asChild>
                                    <a href="https://app.emailverifier.io/register" target="_blank" rel="noopener noreferrer">Get Started</a>
                                </Button>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}