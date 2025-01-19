'use client';

import React, { useState } from 'react';
import standarModuleImg from "../../../assets/images/Curs_Modul_Standard.jpg";
import { useRouter } from 'next/navigation';
import { RatingReviews } from '@/components/general/rating-reviews';
import { Product } from '../exclusive/page';
import { useSession } from "@clerk/nextjs";
import { toast } from 'sonner';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { CONST_ADVANCE_PAYMENT_PRICE, CONST_STANDARD_COURSE_PRICE } from '@/constants/courses/data';

interface ModalProps {
    isOpen: boolean;      // Determines if the modal is open or not
    onClose: () => void;  // Function to call when closing the modal
    children: React.ReactNode; // The content to display inside the modal
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null; // If modal is not open, return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>
                    ✖️
                </button>
                {children} {/* Display the content passed to the modal */}
            </div>
        </div>
    );
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
            <span className="text-sm font-bold text-gray-700">Modul Standard</span>
        </div>
    );
};

const StandardCourse = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
        const [isLoading, setIsLoading] = useState(false); // State to track loading status
    

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const router = useRouter();

    const session = useSession();

    const product: Product = {
        name: "Modul Standard",
        image: "https://ll-lashes.ro/assets/images/Curs_Modul_Express.jpg",
        price: CONST_ADVANCE_PAYMENT_PRICE * 100,
    };

    const handlePay = async (product: Product) => {
        setIsLoading(true); // Set loading to true when payment is being processed

        const totalAmount = CONST_STANDARD_COURSE_PRICE * 100;

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
        "Durata 5 zile",
        "Diplomă acreditată",
        "KIT CU PRODUSE în valoare de 950 RON"
    ];

    return (
        <div className="flex flex-col md:flex-row items-center justify-center sm:mt-0 mb-7">
            <div className="w-full max-w-5xl">
                <div className="flex flex-col md:flex-row gap-5">
                    {/* Product Image Section */}
                    <div className="w-full md:w-1/2">
                        <div className="relative w-full">
                            <div className="max-h-[480px] bg-gray-200">
                                <img
                                    src={standarModuleImg.src}
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

                            <h2 className="mt-4 text-2xl font-bold">Curs de baza 1-3D</h2>

                            <div className="flex mt-2 mb-4 items-center">
                                {Array(5).fill(null).map((_, index) => (
                                    <span key={index}>
                                        <i className="bx bxs-star text-yellow-500"></i>
                                    </span>
                                ))}
                                <RatingReviews ratingScore={5} />
                            </div>

                            <div className="flex items-center mt-2">
                            <span className="text-4xl font-bold">
                                    {new Intl.NumberFormat('ro-RO').format(CONST_STANDARD_COURSE_PRICE)} RON
                                </span>                                <div className='flex flex-col'>
                                    <span className="text-lg font-medium line-through text-gray-500 ml-2">3.800 RON</span>
                                    <span className="text-xs font-semibold text-gray-500 ml-2">1.000 RON - AVANS</span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h3 className="text-lg font-bold">Descriere</h3>
                                <p className="mt-2 text-sm leading-5">
                                    🧠Am gândit acest modul introductiv de extensii de gene pentru persoanele care NU SUNT ÎNCĂ SIGURE dacă vor să urmeze o carieră în acest domeniu fascinant, dar doresc să ÎNCERCE și să vadă dacă LE PLACE.
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
                                <Modal isOpen={showModal} onClose={handleCloseModal}>
                                    <h4 className="text-md font-bold">📚 Ce vei învăța la curs?</h4>
                                    <ul className="list-disc list-inside mt-4">
                                        {initialPoints.concat(additionalPoints).map((point, index) => (
                                            <li key={index} className="flex items-center">
                                                <span className="text-green-500 mr-2">💎</span>
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </Modal>
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

export default StandardCourse;
