import React from 'react';
import newsletterImg from "../../assets/images/newsletter-img.png";

export const NewsletterComponent = () => {
    return (
        <div className='flex flex-col'>
            <svg
                className="w-full h-6 -mb-5 sm:-mb-10 sm:h-16 text-deep-purple-accent-400"
                preserveAspectRatio="none"
                viewBox="0 0 1440 320"
            >
                <path
                    fill="black"
                    d="M0,128L48,149.3C96,171,192,213,288,213.3C384,213,480,171,576,138.7C672,107,768,85,864,101.3C960,117,1056,171,1152,192C1248,213,1344,203,1392,197.7L1440,192L1440,320L0,320Z"
                />
            </svg>
            <div className="bg-black relative mt-4 sm:mt-8">
                <section className="mb-16 text-center lg:text-left">
                    <div className="py-12 md:px-12">
                        <div className="container mx-auto xl:px-32">
                            <div className="grid items-center grid-cols-1 lg:grid-cols-2">
                                <div className="mb-12 lg:mb-0 lg:mr-12">
                                    <div className="relative z-10 block rounded-lg bg-opacity-50 bg-gray-200 dark:bg-opacity-50 dark:bg-gray-800 px-6 py-12 shadow-md backdrop-blur-md md:px-12 lg:-mr-14">
                                        <h1 className="mt-0 mb-12 text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl text-white">
                                            Abonează-te și primești lunar oferte
                                            <span className="text-yellow-600"> direct pe email!</span>
                                        </h1>
                                        <div className="mb-6 flex flex-col md:flex-row">
                                            <input
                                                type="text"
                                                className="peer block w-full min-h-[auto] rounded border-0 bg-transparent py-2 px-3 leading-normal outline-none transition duration-200 ease-linear placeholder-opacity-0 peer-focus:text-white text-white dark:focus:text-primary dark:peer-focus:text-primary"
                                                id="exampleFormControlInput2"
                                                placeholder="Adresa e-mail"
                                            />
                                            <label
                                                className="absolute top-0 left-3 mb-0 max-w-[90%] truncate peer-focus:-translate-y-6 peer-focus:scale-75 text-gray-500 transition duration-200 ease-out dark:text-gray-200 dark:peer-focus:text-primary dark:placeholder-gray-200 dark:focus:text-primary">
                                            </label>
                                            <button
                                                type="submit"
                                                className="inline-block mt-3 md:mt-0 rounded bg-yellow-600 px-7 py-2.5 text-sm font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-yellow-700 focus:bg-yellow-700 focus:outline-none focus:ring-0 active:bg-yellow-800">
                                                Aboneazate
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <img
                                        src={newsletterImg.src}
                                        className="w-full rounded-lg shadow-lg transform rotate-6"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <svg
                className="bottom-0 w-full h-6 sm:-mb-10 sm:h-16 text-deep-purple-accent-400"
                preserveAspectRatio="none"
                viewBox="0 0 1440 320"
            >
                <path
                    fill="black"
                    d="M0,192L48,170.7C96,149,192,107,288,106.7C384,107,480,149,576,181.3C672,213,768,235,864,218.7C960,203,1056,149,1152,149.3C1248,149,1344,203,1392,229.3L1440,256L1440,0L0,0Z"
                />
            </svg>
        </div>
    );
};
