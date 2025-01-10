import React from 'react'
import { LogoComponent } from './logo-component';
import Link from 'next/link';
import { Button } from '../ui/button';

export const FooterComponent = () => {
    return (
        <div className="relative">
            <svg
                className="absolute top-0 w-full h-6 -mt-5 sm:-mt-10 sm:h-16 text-deep-purple-accent-400"
                preserveAspectRatio="none"
                viewBox="0 0 1440 320"
            >
                <path
                    fill="black"
                    d="M0,128L48,149.3C96,171,192,213,288,213.3C384,213,480,171,576,138.7C672,107,768,85,864,101.3C960,117,1056,171,1152,170.7C1248,171,1344,117,1392,90.7L1440,64L1440,320L0,320Z"
                />
            </svg>
            <div className="px-4 pt-16 mx-auto w-full md:px-24 lg:px-10 bg-black text-white">
                <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="">
                        <div className="space-y-2 text-sm">
                            <p className="text-base font-bold tracking-wide">
                                Date firma
                            </p>
                            <div className="flex text-gray-500">
                                <p className="mr-1">Denumire: </p>
                                <p className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-gray-800 text-gray-400">LL LASHES SA</p>
                            </div>
                            <div className="flex text-gray-500">
                                <p className="mr-1">CUI:</p>
                                <p
                                    className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-gray-800 text-gray-400"
                                >
                                    RO424851
                                </p>
                            </div>
                            <div className="flex text-gray-500">
                                <p className="mr-1">Nr. Reg com.:</p>
                                <p
                                    className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800 text-gray-400"
                                >
                                    J40/15595/2013
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2 text-sm">
                        <p className="text-base font-bold tracking-wide">
                            Suport
                        </p>
                        <div className="flex text-gray-500">
                            <Link
                                href="/terms-and-conditions"
                                aria-label="Terms and conditions"
                                title="Terms and conditions"
                                className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-gray-800 text-gray-400"
                            >
                                Termeni si conditii
                            </Link>
                        </div>
                    </div>
                    <div className="space-y-2 text-sm">
                        <p className="text-base font-bold tracking-wide">
                            Contact
                        </p>
                        <div className="flex text-gray-500">
                            <p className="mr-1">Telefon:</p>
                            <a
                                href="tel:0755018516"
                                aria-label="Our phone"
                                title="Our phone"
                                className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-gray-800 text-gray-400"
                            >
                                0755 018 516
                            </a>
                        </div>
                        {/* <div className="flex text-gray-500">
                            <p className="mr-1">Email:</p>
                            <a
                                href="mailto:info@lorem.mail"
                                aria-label="Our email"
                                title="Our email"
                                className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-gray-800 text-gray-400"
                            >
                                ll-lashes.mail.ro
                            </a> */}
                        {/* </div> */}
                        <div className="flex text-gray-500">
                            <p className="mr-1">Adresa:</p>
                            <a
                                href="https://maps.app.goo.gl/1XxCyHwJYUVt6Zue8"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Our address"
                                title="Our address"
                                className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800 text-gray-400"
                            >
                                Strada Mihai Eminescu 28, Arad 310086
                            </a>
                        </div>
                    </div>
                    <div>
                        <span className="text-base font-bold tracking-wide">
                            Social
                        </span>
                        <div className="flex items-center mt-1 space-x-3">
                            <a
                                href="https://www.tiktok.com/@larisatonta_lash_trainer"
                                className="text-gray-500 transition-colors duration-300 hover:text-[#25F4EE]"
                                target="_blank"
                            >
                                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M16.1 16.6C14.3 18.2 13.1 20.6 13.1 23.3C13.1 26.7 15.7 29.3 19.1 29.3C20.3 29.3 21.3 29 22.2 28.5V34.5C20.5 35.1 18.7 35.3 16.8 35.3C9.8 35.3 4.5 30 4.5 23C4.5 19.1 6.1 15.6 8.9 13.2C10.7 11.8 12.8 11 15.2 10.8V16.8C15.8 16.6 16.5 16.6 17.1 16.6H16.1ZM29.1 16.6C27.6 16.6 26.2 16.3 25 15.8V33.6C25 35.7 26.6 37.3 28.7 37.3C30.8 37.3 32.4 35.7 32.4 33.6V15.6C34.2 17.7 36.6 19.1 39.2 19.3V25.3C38.4 25.5 37.7 25.6 37 25.6C30.1 25.6 24.8 20.3 24.8 13.3V12.4H29.2V16.6H29.1Z"
                                        fill="#25F4EE"
                                    />
                                    <path
                                        d="M32.4 15.6V33.6C32.4 35.7 30.8 37.3 28.7 37.3C26.6 37.3 25 35.7 25 33.6V15.8C26.2 16.3 27.6 16.6 29.1 16.6H32.4V15.6Z"
                                        fill="#FE2C55"
                                    />
                                    <path
                                        d="M29.1 16.6H32.4V12.4H29.2V16.6H29.1Z"
                                        fill="#000000"
                                    />
                                </svg>
                            </a>
                            <a
                                href="https://www.instagram.com/larisatonta_lash_trainer/"
                                className="text-gray-500 transition-colors duration-300 hover:text-[#E4405F]"
                                target="_blank"
                            >
                                <svg
                                    viewBox="0 0 30 30"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6"
                                >
                                    <path
                                        d="M15 8.89C12.349 8.89 10.224 11.014 10.224 13.666C10.224 16.318 12.349 18.442 15 18.442C17.651 18.442 19.776 16.318 19.776 13.666C19.776 11.014 17.651 8.89 15 8.89ZM15 16.984C13.518 16.984 12.342 15.808 12.342 14.326C12.342 12.843 13.518 11.667 15 11.667C16.482 11.667 17.658 12.843 17.658 14.326C17.658 15.808 16.482 16.984 15 16.984Z"
                                        fill="url(#instagramGradient)"
                                    />
                                    <path
                                        d="M20.8 8.473C21.2 8.473 21.552 8.121 21.552 7.721C21.552 7.321 21.2 6.969 20.8 6.969C20.4 6.969 20.048 7.321 20.048 7.721C20.048 8.121 20.4 8.473 20.8 8.473Z"
                                        fill="url(#instagramGradient)"
                                    />
                                    <path
                                        d="M19.353 5H10.647C7.951 5 6 6.952 6 9.647V18.353C6 21.048 7.951 23 10.647 23H19.353C22.048 23 24 21.048 24 18.353V9.647C24 6.952 22.048 5 19.353 5ZM22.112 18.353C22.112 20.13 20.13 22.112 18.353 22.112H11.647C9.87 22.112 7.888 20.13 7.888 18.353V11.647C7.888 9.87 9.87 7.888 11.647 7.888H18.353C20.13 7.888 22.112 9.87 22.112 11.647V18.353Z"
                                        fill="url(#instagramGradient)"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="instagramGradient"
                                            x1="15"
                                            y1="5"
                                            x2="15"
                                            y2="23"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F58529" />
                                            <stop offset="0.5" stopColor="#DD2A7B" />
                                            <stop offset="1" stopColor="#8134AF" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </a>
                            <a
                                href="https://www.facebook.com/profile.php?id=100036100703312"
                                className="text-gray-500 transition-colors duration-300 hover:text-[#1877F2]"
                                target="_blank"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5"
                                >
                                    <path
                                        d="M22.675 0H1.325C0.593 0 0 0.593 0 1.325V22.675C0 23.407 0.593 24 1.325 24H12.82V14.708H9.692V11.077H12.82V8.414C12.82 5.438 14.69 3.825 17.323 3.825C18.602 3.825 19.733 3.919 20.042 3.955V7.033H18.218C16.645 7.033 16.27 7.844 16.27 9.027V11.077H19.909L19.371 14.708H16.27V24H22.675C23.407 24 24 23.407 24 22.675V1.325C24 0.593 23.407 0 22.675 0Z"
                                        fill="#1877F2"
                                    />
                                    <path
                                        d="M16.27 24V14.708H19.371L19.909 11.077H16.27V9.027C16.27 7.844 16.645 7.033 18.218 7.033H20.042V3.955C19.733 3.919 18.602 3.825 17.323 3.825C14.69 3.825 12.82 5.438 12.82 8.414V11.077H9.692V14.708H12.82V24H16.27Z"
                                        fill="white"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
                    <p className="text-sm text-gray-600">
                        © Copyright 2025 VNS. All rights reserved.
                    </p>
                    <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
                        <li>
                            <a
                                href="/contact"
                                className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                            >
                                Contact
                            </a>
                        </li>
                        <li>
                            <a
                                href="/terms-and-conditions"
                                className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                            >
                                Termeni &amp; Conditii
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default FooterComponent;