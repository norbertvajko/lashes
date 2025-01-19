'use client';

import React, { useState } from 'react';
import expressModuleImg from "../../../assets/images/Curs_Modul_Express.jpg";
import { useRouter } from 'next/navigation';
import { RatingReviews } from '@/components/general/rating-reviews';
import { Product } from '../exclusive/page';
import { useSession } from '@clerk/nextjs';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import axios from 'axios';

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
            <span className="text-sm font-bold text-gray-700">Curs de baza 1-3D</span>
        </div>
    );
};

const ExpressCourse = () => {
    const initialPoints = [
        "📝Vei învăța elementele de bază ale aplicării extensiilor de gene, doar la suprafață, pentru a înțelege mai bine despre ce este vorba în această meserie. ",
        "✅Scopul meu este să îți ofer o privire de ansamblu, astfel încât să îți poți forma o opinie informată și să descoperi dacă ai o înclinație spre acest domeniu sau NU❌"
    ];

    const [isLoading, setIsLoading] = useState(false);


    const session = useSession();

    const product: Product = {
        name: "Modul Express",
        image: "https://ll-lashes.ro/assets/images/Curs_Modul_Express.jpg",
        price: 100000,
    };

    const handlePay = async (product: Product) => {
        setIsLoading(true); // Set loading to true when payment is being processed

        const totalAmount = 300000;

        const payload = {
            ...product,
            totalAmount, // Include the calculated totalAmount
        };

        try {
            const res = await axios.post('/api/stripe/checkout', payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const session = res.data;

            if (session.url) {
                window.location.href = session.url; // Redirect to Stripe checkout
            } else {
                console.error("Failed to create session:", session.error);
            }
        } catch (error) {
            console.error("Error during payment request:", error);
        } finally {
            setIsLoading(false); // Reset loading state once the request is complete
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center sm:mt-0 mb-7">
            <div className="w-full max-w-5xl">
                <div className="flex flex-col md:flex-row gap-5">
                    {/* Product Image Section */}
                    <div className="w-full md:w-1/2">
                        <div className="relative w-full">
                            <div className="max-h-[480px] bg-gray-200">
                                <img
                                    src={expressModuleImg.src}
                                    alt=""
                                    className="w-full h-full object-contain rounded-md"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Product Details Section */}
                    <div className="w-full md:w-1/2">
                        <div className="bg-white p-4 rounded-md">
                            <Breadcrumb />

                            <h2 className="mt-4 text-2xl font-bold">Curs de baza 1-2D</h2>

                            <div className="flex mt-2 mb-4 items-center">
                                {Array(5).fill(null).map((_, index) => (
                                    <span key={index}>
                                        <i className="bx bxs-star text-yellow-500"></i>
                                    </span>
                                ))}
                                <RatingReviews ratingScore={5} />
                            </div>

                            <div className="flex items-center mt-2">
                                <span className="text-4xl font-bold">3.000 RON</span>
                                <div className='flex flex-col'>
                                    <span className="text-lg font-medium line-through text-gray-500 ml-2">3.900 RON</span>
                                    <span className="text-xs font-semibold text-gray-500 ml-2">1.000 RON - AVANS</span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h3 className="text-lg font-bold">Descriere</h3>
                                <p className="mt-2 text-sm leading-5">
                                    🧠Acest modul este gândit ca un curs de baza+o perfecționare SUPER INTENSIV ca tu să poți imediat dupa curs să ai cliente pe bani. 💰
                                </p>
                                <p className='text-sm pt-3 font-semibold'>Cursul meu este simplu și accesibil, ideal pentru începători🐣. </p>
                            </div>
                            <div className="mt-4">
                                <h4 className="text-md font-bold mb-2">📚 Ce vei învăța la curs?</h4>
                                <ul className="list-disc list-inside">
                                    {initialPoints.map((point, index) => (
                                        <li key={index} className="flex items-center pb-[14px]">
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* Color Selection */}
                            <div className="mt-4">
                                <h4 className="text-md font-bold">📢 Cod Promo</h4>
                                <div className="flex gap-2 mt-2 flex-wrap">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                            placeholder="Cod promo.."
                                        />

                                        {/* Înlocuit SVG cu emoji */}
                                        <span className="absolute w-3 h-3 top-1 right-5 text-slate-600 text-xl">
                                            🏷️
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <hr className="my-4 border-gray-300" />
                            <Button
                                onClick={() => {
                                    if(!session.isSignedIn) {
                                        toast.warning("Trebuie sa fii autentificat pentru a putea achizitiona acest curs")
                                    }
                                    else {
                                        handlePay(product)
                                    }
                                }}
                                disabled={isLoading}
                                className="flex items-center justify-center bg-gradient-to-r from-red-500 to-yellow-500 text-white font-bold rounded px-4 py-2 hover:from-red-600 hover:to-yellow-600"
                            >
                                <i className="bx bxs-zap"></i> Cumpara acum
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpressCourse;
