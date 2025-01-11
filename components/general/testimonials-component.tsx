"use client";

import React, { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useIsMobile } from "@/hooks/use-is-mobile";

interface Testimonial {
    userName: string;
    userTitle: string;
    rating: number;
    description: string;
}

export const TestimonialsComponent = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

    const testimonials: Testimonial[] = [
        {
            userName: "Carina Paulișan",
            userTitle: "Clientă",
            rating: 5,
            description:
                "Serviciile tale sunt impecabile de fiecare dată, iar genele arată superb! Apreciez atenția ta la detalii și răbdarea pe care o ai pentru ca totul să iasă perfect. Atmosfera din salonul tău este una relaxantă, e mereu o plăcere să petrec timp acolo. Faptul că ai și talent, și pasiune pentru ceea ce faci se vede în rezultatul final. Mă bucur că te am nu doar ca tehniciană de gene, ci și ca prietenă. Te recomand cu încredere oricui! ❤️❤️❤️",
        },
        {
            userName: "Mădălina Ciubotaru",
            userTitle: "Cursantă",
            rating: 5,
            description:
                "Am avut o experiență minunată la cursul de gene. Mi-a plăcut foarte mult modul în care mi-ai explicat totul pe parcursul cursului, răbdarea pe care ai avut-o și cum mi-ai arătat pas cu pas aplicarea extensiilor de gene. Mi-a plăcut totul pe parcursul cursului.",
        },
        {
            userName: "Ildy Dumitrov",
            userTitle: "Clientă",
            rating: 5,
            description:
                `Ești extraordinară, Lari! Talentul tău în aplicarea extensiilor de gene este remarcabil, iar de fiecare dată când vin la tine, mă faci să mă simt frumoasă și deosebită. Îmi place enorm că pot discuta cu tine despre orice, ceea ce este mereu o plăcere, iar educația și eleganța ta ies mereu în evidență. Mulțumesc pentru dedicare, prietenie, "terapie" și profesionalism! 😍😍😍.
                PS. Meriți fiecare cuvânt, și mai mult, nu am vrut să fie nici prea lung 😂`,
        },
        {
            userName: "Iacobuț Xenia",
            userTitle: "Clientă",
            rating: 5,
            description:
                "Deci, pe lângă serviciile tale de mare calitate și dedicarea ta pentru genele fiecărei cliente, când vin la tine știu că pot să uit de griji. Ești o persoană minunată și nu cred că există un lash artist mai bun ca tine în Arad. Tot timpul știi să ne îndulcești fie cu o ciocolată, fie cu o vorbă bună. Ar trebui să iei taxă de psiholog, că tu ne asculți problemele mai ceva ca un psiholog. Mă bucur nespus de mult că am ajuns la tine la gene, pentru că de când vin la tine, se vede că are cineva grijă de ele. Pupici! ❤️❤️",
        },
        {
            userName: "Puleac Iasmina",
            userTitle: "Clientă",
            rating: 5,
            description:
                "Recomand din tot sufletul, pentru cele mai frumoase gene ! 🩷💕🩷",
        },
        {
            userName: "Corb Sara",
            userTitle: "Clientă",
            rating: 5,
            description:
                "Din punctul meu de vedere, pui cele mai bune gene din Arad🥹 Vin la tine de 4 ani și, aparent, da, eu mereu te recomand la toată lumea, pentru că mereu primesc complimente pentru ele❤️. Vibe-ul pe care îl oferi te face să rămâi toată ziua🩷.",
        },
        {
            userName: "Stănilă Andreea",
            userTitle: "Clientă",
            rating: 5,
            description:
                "Esti cea mai buna,calitatea serviciilor tale este evident superioara si ador sa vin la tine,pui cele mai faine gene si esti si un psiholog genial🫶🏻❤️",
        },
        {
            userName: "Tacnic Andreea",
            userTitle: "Clientă",
            rating: 5,
            description:
                "2 cuvinte: The best!!!",
        },
    ];

    const plugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

    const openModal = (testimonial: Testimonial) => {
        setSelectedTestimonial(testimonial);
        setModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedTestimonial(null);
        document.body.style.overflow = 'auto';
    };

    const isLongText = (text: string) => {
        return text.length > 200;
    };

    const getInitials = (name: string) => {
        const names = name.split(" ");
        const initials = names.map((n) => n.charAt(0).toUpperCase()).join(".");
        return initials;
    };

    const getBackgroundColor = (name: string) => {
        const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const color = `hsl(${hash % 360}, 70%, 60%)`;
        return color;
    };

    const isMobile = useIsMobile();

    return (
        <div className="container mx-auto px-6 py-12">
            <h2 className="text-center text-4xl font-bold mb-8">Ce spun clientele mele ❤️</h2>
            <Carousel
                plugins={[plugin.current]}
                className="w-full max-w-6xl mx-auto"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {testimonials.map((testimonial, index) => (
                        <CarouselItem key={index} className="flex-shrink-0 basis-full sm:basis-1/2 lg:basis-1/3">
                            <div className="h-[400px] w-full p-3">
                                <div className="border rounded-lg h-full shadow-md p-6 bg-white flex flex-col justify-between">
                                    <div className="overflow-hidden flex-grow">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-1">
                                                <span className="text-yellow-500 text-xl">★</span>
                                                <span className="text-yellow-500 text-xl">★</span>
                                                <span className="text-yellow-500 text-xl">★</span>
                                                <span className="text-yellow-500 text-xl">★</span>
                                                <span className="text-yellow-500 text-xl">★</span>
                                            </div>
                                            <span className="font-semibold text-lg text-indigo-600">
                                                {testimonial.rating.toFixed(1)}
                                            </span>
                                        </div>
                                        <p
                                            className={`text-gray-600 mb-4 text-base leading-relaxed ${isLongText(testimonial.description) ? "line-clamp-6" : ""
                                                }`}
                                        >
                                            {testimonial.description}
                                        </p>
                                        {isLongText(testimonial.description) && (
                                            <button
                                                onClick={() => openModal(testimonial)}
                                                className="text-indigo-600 hover:underline"
                                            >
                                                Vezi tot
                                            </button>
                                        )}
                                    </div>
                                    {/* User Info */}
                                    <div className="flex items-center gap-4 mt-auto">
                                        {/* User Initials */}
                                        <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                                            style={{
                                                backgroundColor: getBackgroundColor(testimonial.userName),
                                            }}
                                        >
                                            {getInitials(testimonial.userName)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-base">{testimonial.userName}</h4>
                                            <p className="text-gray-500 text-sm">{testimonial.userTitle}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {!isMobile && (
                    <>
                        <CarouselPrevious />
                        <CarouselNext />
                    </>
                )}
            </Carousel>

            {modalOpen && selectedTestimonial && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-2xl font-bold mb-4">Review complet 💞</h2>
                        <p className="text-gray-700 text-base mb-4">{selectedTestimonial.description}</p>
                        <button onClick={closeModal} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                            Închide
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
