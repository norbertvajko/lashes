'use client';

import React from 'react';
import freeImage from "../../../assets/images/Curs_Gratis.jpeg";
import { useRouter } from 'next/navigation';
import { RatingReviews } from '@/components/general/rating-reviews';
import Image from 'next/image';

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
            <span className="text-sm font-bold text-gray-700">Curs GRATUIT</span>
        </div>
    );
};

const FreeCourse = () => {

    const initialPoints = [
        "📝Vei învăța elementele de bază ale aplicării extensiilor de gene, doar la suprafață, pentru a înțelege mai bine despre ce este vorba în această meserie. ",
        "✅Scopul meu este să îți ofer o privire de ansamblu, astfel încât să îți poți forma o opinie informată și să descoperi dacă ai o înclinație spre acest domeniu sau NU❌"
    ];

    return (
        <div className="flex flex-col md:flex-row items-center justify-center sm:mt-0 mb-7">
            <div className="w-full max-w-5xl">
                <div className="flex flex-col md:flex-row gap-5">
                    {/* Product Image Section */}
                    <div className="w-full md:w-1/2">
                        <div className="relative w-full">
                            <div className="max-h-[480px] bg-gray-200">
                                <Image
                                    src={freeImage.src}
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

                            <h2 className="mt-4 text-2xl font-bold">Curs GRATUIT</h2>

                            <div className="flex mt-2 mb-4 items-center">
                                {Array(5).fill(null).map((_, index) => (
                                    <span key={index}>
                                        <i className="bx bxs-star text-yellow-500"></i>
                                    </span>
                                ))}
                                <RatingReviews ratingScore={5} />
                            </div>

                            <div className="flex items-center mt-2">
                                <span className="text-4xl font-bold">0 RON</span>
                            </div>

                            <div className="mt-4">
                                <h3 className="text-lg font-bold">Descriere</h3>
                                <p className="mt-2 text-sm leading-5">
                                    Daca ai vrea sa te intri in domeniul extensiilor de gene dar inca nu esti sigura ca te vei descurca financiar ,eu am creat pentru tine acest webinar informativ si GRATUIT unde vei afla costurile reale ale acestei meserii frumoase
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

                            <hr className="my-4 border-gray-300" />

                            <div className="flex gap-4 flex-wrap">
                                <a
                                    href="/assets/WEBINAR_LL_LASHES.pdf"
                                    download
                                    className="flex items-center justify-center bg-gradient-to-r from-red-500 to-yellow-500 text-white font-bold rounded px-4 py-2 hover:from-red-600 hover:to-yellow-600"
                                >
                                    <i className='bx bxs-download'></i> Descarca cursul acum 🔥
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreeCourse;
