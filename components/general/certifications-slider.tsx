"use client";

import React from "react";

const logos = [
    { src: "https://cruip-tutorials.vercel.app/logo-carousel/facebook.svg", alt: "Facebook" },
    { src: "https://cruip-tutorials.vercel.app/logo-carousel/disney.svg", alt: "Disney" },
    { src: "https://cruip-tutorials.vercel.app/logo-carousel/airbnb.svg", alt: "Airbnb" },
    { src: "https://cruip-tutorials.vercel.app/logo-carousel/apple.svg", alt: "Apple" },
    { src: "https://cruip-tutorials.vercel.app/logo-carousel/spark.svg", alt: "Spark" },
    { src: "https://cruip-tutorials.vercel.app/logo-carousel/samsung.svg", alt: "Samsung" },
    { src: "https://cruip-tutorials.vercel.app/logo-carousel/quora.svg", alt: "Quora" },
    { src: "https://cruip-tutorials.vercel.app/logo-carousel/sass.svg", alt: "Sass" },
];

const CertificationsSlider: React.FC = () => {
    return (
        <div className="relative font-inter antialiased">
            <main className="relative flex flex-col justify-center bg-black overflow-hidden">
                <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-24">
                    <div className="text-center">
                        <div
                            x-data="{}"
                            x-init="$nextTick(() => {
                                let ul = $refs.logos;
                                ul.insertAdjacentHTML('afterend', ul.outerHTML);
                                ul.nextSibling.setAttribute('aria-hidden', 'true');
                            })"
                            className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
                        >
                            <ul
                                x-ref="logos"
                                className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
                            >
                                {logos.concat(logos).map((logo, i) => (
                                    <li key={logo.alt + i}>
                                        <img src={logo.src} alt={logo.alt} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
};

export default CertificationsSlider;
