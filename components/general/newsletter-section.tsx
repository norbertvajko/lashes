"use client";

export const NewsletterSection = () => {
    return (
        <>
            <div className="relative w-full h-full md:h-screen bg-black/90">
                <iframe
                    className="top-0 left-0 w-full md:absolute h-1/2 md:h-full rounded-md opacity-80"
                    src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=LL%20Lashes%20by%20Larisa%20Ton%C8%9Ba,%20Strada%20Mihai%20Eminescu%2028,%20Arad%20310086&amp;t=h&amp;z=18&amp;ie=UTF8&amp;iwloc=near&amp;output=embed&amp;zoomControl=false&amp;directions=true"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

                {/* Show circle only on desktop using Tailwind */}
                <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border-2 border-red-500 z-10">
                    <div className="w-full h-full rounded-full opacity-20" style={{ background: "rgba(0, 0, 0, 0.1)" }} />
                </div>

                <div className="flex flex-col items-end justify-center mt-4 md:flex-row md:justify-around md:pt-32 md:mt-0">
                    <div className="relative hidden m-4 bg-white rounded-md shadow-md md:flex">
                        <img
                            className="rounded-md"
                            src="/assets/images/salon-ll-lashes.jpeg"
                            alt="salon"
                        />
                    </div>
                    <div className="container flex px-5 mx-auto md:py-8" />
                </div>
            </div>
        </>
    );
};
