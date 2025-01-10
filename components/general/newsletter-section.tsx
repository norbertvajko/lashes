"use client";

import { FaCalendarCheck } from "react-icons/fa6"
import { HiOutlineHandRaised } from "react-icons/hi2";
import { Button } from "../ui/button"
import { useIsMobile } from "@/hooks/use-is-mobile";

export const NewsletterSection = async () => {
    const isMobile = useIsMobile();

    return (
        <>
            <div className="relative w-full h-full md:h-screen bg-black/90">
                <iframe
                    className="top-0 left-0 w-full md:absolute h-1/2 md:h-full rounded-md opacity-80"
                    src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=LL%20Lashes%20by%20Larisa%20Ton%C8%9Ba,%20Strada%20Mihai%20Eminescu%2028,%20Arad%20310086&amp;t=h&amp;z=18&amp;ie=UTF8&amp;iwloc=near&amp;output=embed&amp;zoomControl=false&amp;directions=true"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
                {!isMobile ? (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border-2 border-red-500 z-10">
                        <div
                            className="w-full h-full rounded-full opacity-20" style={{ background: "rgba(0, 0, 0, 0.1)" }}>
                        </div>
                    </div>
                ) : ""}
                <div className="flex flex-col items-end justify-center mt-4 md:flex-row md:justify-around md:pt-32 md:mt-0">
                    <div className="relative flex-wrap hidden m-4 bg-white rounded-md shadow-md md:flex">
                        <img
                            className="rounded-md"
                            src="../assets/images/salon-ll-lashes.jpeg"
                            alt="salon"
                            width={570}
                            height={320}
                        />
                    </div>
                    <div className="container flex px-5 mx-auto md:py-8">
                    </div>
                </div>
            </div>

            {/* <div className="relative overflow-hidden bg-white py-16 sm:py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                        <div className="max-w-xl lg:max-w-lg">
                            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">Devino membru</h2>
                            <p className="mt-4 text-lg leading-8 text-gray-300">
                                Nostrud amet eu ullamco nisi aute in ad minim nostrud adipisicing velit quis. Duis tempor incididunt
                                dolore.
                            </p>
                            <div className="mt-6 flex max-w-md gap-x-4">
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="min-w-0 flex-auto rounded-md border-0 border-black bg-white/5 px-3.5 py-2 text-black shadow-md ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    placeholder="Adresa de e-mail"
                                />
                                <Button
                                    type="submit"
                                    variant={"black"}
                                >
                                    Subscribe
                                </Button>
                            </div>
                        </div>
                        <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                            <div className="flex flex-col items-start">
                                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                    <FaCalendarCheck className="h-6 w-6 text-black" aria-hidden="true" />
                                    <dt className="mt-4 font-semibold text-black">Weekly articles</dt>
                                    <dd className="mt-2 leading-7 text-gray-400">
                                        Non laboris consequat cupidatat laborum magna. Eiusmod non irure cupidatat duis commodo amet.
                                    </dd>
                                </div>
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                    <HiOutlineHandRaised className="h-6 w-6 text-black" aria-hidden="true" />
                                </div>
                                <dt className="mt-4 font-semibold text-black">No spam</dt>
                                <dd className="mt-2 leading-7 text-gray-400">
                                    Officia excepteur ullamco ut sint duis proident non adipisicing. Voluptate incididunt anim.
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div> */}
        </>
    )
}