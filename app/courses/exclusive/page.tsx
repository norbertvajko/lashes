'use client';

import React, { useState } from 'react';
import exclusiveCourseImg from "../../../assets/images/Curs_Modul_Exclusiv.jpg.jpg";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useSession } from '@clerk/nextjs';
import { CONST_ADVANCE_PAYMENT_PRICE, CONST_EXCLUSIVE_COURSE_PRICE, CONST_EXCLUSIVE_COURSE_RATES_PRICE } from '@/constants/courses/data';
import BuyCourseButton from '@/components/general/buy-course-btn';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/general/loading-spinner';
import { toast } from 'sonner';

export type Product = {
    name: string;
    image: string;
    price: number;
};

const Breadcrumb: React.FC = () => {
    const router = useRouter();

    const navigateToHome = () => {
        router.push('/');
    };

    const navigateToCourses = () => {
        router.push('/courses');
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 cursor-pointer" onClick={navigateToHome}>
                Acasa
            </span>
            <span className="text-sm text-gray-700">/</span>
            <span className="text-sm text-gray-700 cursor-pointer" onClick={navigateToCourses}>
                Cursuri
            </span>
            <span className="text-sm text-gray-700">/</span>
            <span className="text-sm font-bold text-gray-700">Modul Exclusive</span>
        </div>
    );
};

const ExclusiveCourse = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);

    const [promoCode, setPromoCode] = useState('');
    const [promoCodeLoading, setPromoCodeLoading] = useState(false);
    const [discount, setDiscount] = useState<number | null>(null);
    const [promoCodeError, setPromoCodeError] = useState<string | null>(null);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const session = useSession();

    const initialPoints = [
        "Introducere în lumea extensiilor de gene",
        "Structura genelor naturale",
        "Anatomia genelor naturale",
        "Afecțiuni oculare frecvente",
        "Alergii cauzate de diverse surse și tratamentul acestora"
    ];

    const additionalPoints = [
        "Cauzele alergiilor din cauza tehnicianului",
        "Când este contraindicată aplicarea extensiilor de gene",
        "Componentele adezivului",
        "Categorii de adezivi",
        "Tips & Tricks despre adeziv și reguli de utilizare",
        "Clasificarea și caracteristicile extensiilor de gene",
        "Grosimea optimă pentru fiecare tehnică",
        "Cum combinăm curburile",
        "Aplicare corectă de la 1D la 4D",
        "Forme",
        "Izolare corectă",
        "Tipuri de izolare",
        "Îngrijirea extensiilor",
        "Îndepărtarea extensiilor de gene corect",
        "Îngrijirea genelor naturale",
        "Sănătatea lash artistului și poziția de lucru",
        "Instrumente și produse necesare",
        "Dezinfectarea corectă a instrumentelor de lucru",
        "Procedura pas cu pas",
        "Relația cu clienta",
        "KIT inclus în valoare de 1100 RON",
        "Durata 7 zile",
        "BONUS: două casete cadou separat de kit 🎁 pentru un boost la perfecționarea voastră ✨",
        "Două diplome"
    ];

    const product: Product = {
        name: "Modul Exclusiv",
        image: "https://ll-lashes.ro/assets/images/Curs_Modul_Exclusiv.jpg",
        price: CONST_ADVANCE_PAYMENT_PRICE * 100,
    };

    const checkPromoCode = async () => {
        setPromoCodeLoading(true);
        setPromoCodeError(null);
        setDiscount(null);

        try {
            // 1. Validate promo code
            const res = await fetch('/api/user/orders/check-promo-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ promoCode }),
            });

            const data = await res.json();

            if (!res.ok) {
                setPromoCodeError(data.message || 'Cod invalid');
                return; // stop if invalid
            }

            // promo code is valid, discount received
            setDiscount(data.discount);
            // set promoCode to current input (not from response)
            setPromoCode(promoCode);

            // Now save promo code for current user
            const saveRes = await fetch('/api/user/orders/apply-promo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ promoCode, discount: data.discount, user: session.session?.user.id }), // use local promoCode variable here
            });

            const saveData = await saveRes.json();
            toast.success("Cod promoțional aplicat cu succes!");


            if (!saveRes.ok) {
                setPromoCodeError(saveData.error || "Eroare la salvarea codului promoțional.");
            }

        } catch (err) {
            console.error(err);
            setPromoCodeError('Eroare la verificare.');
        } finally {
            setPromoCodeLoading(false);
        }
    };

    const handleIntegralPay = async (product: Product) => {
        setIsLoading(true);

        const totalAmount = CONST_EXCLUSIVE_COURSE_PRICE;

        const payload = {
            ...product,
            totalAmount: Math.round(totalAmount * 100), // convert to smallest currency unit (e.g., bani)
            hasPromoCode: !!promoCode,
            discount,
            promoCode,
        };

        try {
            const res = await axios.post('/api/stripe/checkout', payload, {
                headers: { "Content-Type": "application/json" },
            });

            const session = res.data;
            if (session.url) {
                window.location.href = session.url;
            } else {
                console.error("Failed to create session:", session.error);
            }
        } catch (error) {
            console.error("Error during payment request:", error);
        } finally {
            setIsLoading(false);
        }
    };


    const handleRatePay = async (product: Product) => {
        setIsLoading(true);

        let totalAmount = CONST_EXCLUSIVE_COURSE_RATES_PRICE;
        
        const payload = {
            ...product,
            totalAmount: Math.round(totalAmount * 100),
            discount,
            hasRates: true,
            rateNumber: 0,
            nextRateDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            hasPromoCode: !!promoCode,
            promoCode,
        };

        try {
            const res = await axios.post('/api/stripe/checkout', payload, {
                headers: { "Content-Type": "application/json" },
            });

            const session = res.data;
            if (session.url) {
                window.location.href = session.url;
            } else {
                console.error("Failed to create session:", session.error);
            }
        } catch (error) {
            console.error("Error during payment request:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center sm:mt-0 mb-7">
            <div className="w-full max-w-5xl">
                <div className="flex flex-col md:flex-row gap-5">
                    {/* Product Image Section */}
                    <div className="w-full md:w-1/2">
                        <div className="relative w-full">
                            <div className="bg-gray-200">
                                <img
                                    src={exclusiveCourseImg.src}
                                    alt="Modulul Exclusiv"
                                    className="w-full h-full object-contain rounded-md"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Product Details Section */}
                    <div className="w-full md:w-1/2">
                        <div className="bg-white p-4 rounded-md">
                            <Breadcrumb />

                            <h2 className="mt-4 text-2xl font-bold">Modul Exclusive</h2>

                            <div className="flex flex-col gap-1 mt-2">
                                <div className="flex items-center">
                                    <span className="text-2xl font-bold text-green-600">
                                        {CONST_EXCLUSIVE_COURSE_PRICE} RON
                                    </span>
                                    <span className="text-md font-semibold text-gray-700 ml-3">
                                        – Plata integrală
                                    </span>
                                </div>

                                <div className="flex items-center">
                                    <span className="text-2xl font-bold text-blue-600">
                                        {CONST_EXCLUSIVE_COURSE_RATES_PRICE} RON
                                    </span>
                                    <div className="flex flex-col ml-3">
                                        <span className="text-md font-semibold text-gray-700">
                                            – Plata în 3 rate
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-2 text-sm font-semibold text-gray-600">
                                    * Avansul de <span className="text-black">{CONST_ADVANCE_PAYMENT_PRICE} RON</span> este necesar indiferent de opțiunea aleasă.
                                </div>
                            </div>

                            <div className="mt-4">
                                <h3 className="text-lg font-bold">Descriere</h3>
                                <p className="mt-2 text-sm leading-5">
                                    🧠Acest modul este gândit ca un curs de baza+o perfecționare <u><b>SUPER INTENSIV</b></u> ca tu să poți imediat dupa curs să ai cliente pe bani. 💰
                                </p>
                                <p className='text-sm pt-3 font-semibold'>Cursul meu este simplu și accesibil, ideal pentru începători🐣. </p>
                            </div>
                            <div className="mt-4">
                                <h4 className="text-md font-bold mb-2">📚 Ce vei învăța la curs?</h4>
                                <ul className="list-disc list-inside">
                                    {initialPoints.map((point, index) => (
                                        <li key={index} className="flex items-center">
                                            <span className="text-green-500 mr-2">💎</span>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                                {additionalPoints.length > 0 && (
                                    <button
                                        className="mt-2 text-blue-500 hover:underline"
                                        onClick={handleOpenModal}
                                    >
                                        Vezi lista intreaga
                                    </button>
                                )}
                                <Dialog open={showModal} onOpenChange={handleCloseModal}>
                                    <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto z-[99999999999999]">
                                        <DialogHeader>
                                            <DialogTitle>📚 Ce vei învăța la curs?</DialogTitle>
                                        </DialogHeader>
                                        <ul className="list-disc list-inside mt-4 space-y-2">
                                            {initialPoints.concat(additionalPoints).map((point, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="text-green-500 mr-2 mt-0.5">💎</span>
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div className="mt-4">
                                <h4 className="text-md font-bold">📢 Cod Promo</h4>
                                <div className="flex gap-2 mt-2 flex-wrap items-center">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            disabled={promoCodeLoading}
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                            placeholder="Cod promo.."
                                        />
                                        <span className="absolute w-3 h-3 top-1 right-5 text-slate-600 text-xl">
                                            🏷️
                                        </span>
                                    </div>
                                    <Button
                                        variant="secondary"
                                        onClick={checkPromoCode}
                                        disabled={promoCodeLoading || !promoCode || discount !== null}
                                        className="relative px-4 py-2"
                                    >
                                        {/* Text is hidden when loading */}
                                        <span className={promoCodeLoading ? 'invisible' : 'visible'}>
                                            {discount !== null ? 'Cod promo aplicat' : 'Verifică'}
                                        </span>

                                        {promoCodeLoading && (
                                            <span className="absolute inset-0 flex items-center justify-center">
                                                <LoadingSpinner />
                                            </span>
                                        )}
                                    </Button>
                                </div>

                                {discount !== null && !promoCodeLoading && (
                                    <p className="mt-2 text-green-600 text-sm">✅ Cod valid! Discount: {discount}%</p>
                                )}
                                {promoCodeError && (
                                    <p className="mt-2 text-red-600 text-sm">❌ {promoCodeError}</p>
                                )}
                            </div>

                            <hr className="my-4 border-gray-300" />
                            <BuyCourseButton
                                session={{ isSignedIn: session.isSignedIn || false }}
                                isLoading={isLoading}
                                handleIntegralPay={handleIntegralPay}
                                handleRatePay={handleRatePay}
                                product={product}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExclusiveCourse;