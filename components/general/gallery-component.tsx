'use client'
import { useIsMobile } from '@/hooks/use-is-mobile';
import Autoplay from 'embla-carousel-autoplay';
import { XCircle } from 'lucide-react';

import React, { useState, useEffect, useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageSrc: string;
    imageAlt: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imageSrc, imageAlt }) => {
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        // Disable scroll when the modal is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleEscapeKey);
        } else {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="relative w-full h-full bg-white rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
            >
                <img src={imageSrc} alt={imageAlt} className="w-full h-full object-contain" />
                <button
                    className="absolute top-4 right-4 bg-white bg-opacity-80 border-none cursor-pointer p-2 rounded-md"
                    onClick={onClose}
                >
                    <XCircle size={32} />
                </button>
            </div>
        </div>
    );
};

// Define the photo type
interface Photo {
    src: string;
    alt: string;
}

// Define the gallery strips with their photos
const galleryStrips: Photo[][] = [
    [
        { src: "/assets/images/gallery/1.jpeg", alt: "Image 1" },
        { src: "/assets/images/gallery/2.jpeg", alt: "Image 2" },
        { src: "/assets/images/gallery/3.jpeg", alt: "Image 3" },
        { src: "/assets/images/gallery/4.jpeg", alt: "Image 4" },
        { src: "/assets/images/gallery/5.jpeg", alt: "Image 5" },
        { src: "/assets/images/gallery/6.png", alt: "Image 6" },
        { src: "/assets/images/gallery/7.jpeg", alt: "Image 7" },
        { src: "/assets/images/gallery/8.png", alt: "Image 8" },
    ],
    [
        { src: "/assets/images/gallery/9.jpeg", alt: "Image 9" },
        { src: "/assets/images/gallery/10.jpeg", alt: "Image 10" },
        { src: "/assets/images/gallery/33.jpeg", alt: "Image 33" },
        { src: "/assets/images/gallery/12.jpeg", alt: "Image 12" },
        { src: "/assets/images/gallery/13.jpeg", alt: "Image 13" },
        { src: "/assets/images/gallery/14.jpeg", alt: "Image 14" },
        { src: "/assets/images/gallery/15.jpeg", alt: "Image 15" },
        { src: "/assets/images/gallery/16.jpeg", alt: "Image 16" },
    ],
    [
        { src: "/assets/images/gallery/17.jpeg", alt: "Image 17" },
        { src: "/assets/images/gallery/18.jpeg", alt: "Image 18" },
        { src: "/assets/images/gallery/19.jpeg", alt: "Image 19" },
        { src: "/assets/images/gallery/20.jpeg", alt: "Image 20" },
        { src: "/assets/images/gallery/21.jpeg", alt: "Image 21" },
        { src: "/assets/images/gallery/22.jpeg", alt: "Image 22" },
        { src: "/assets/images/gallery/23.jpeg", alt: "Image 23" },
        { src: "/assets/images/gallery/24.jpeg", alt: "Image 24" },
        { src: "/assets/images/gallery/34.jpeg", alt: "Image 34" }
    ],
    [
        { src: "/assets/images/gallery/25.jpeg", alt: "Image 25" },
        { src: "/assets/images/gallery/26.jpeg", alt: "Image 26" },
        { src: "/assets/images/gallery/27.jpeg", alt: "Image 27" },
        { src: "/assets/images/gallery/28.jpeg", alt: "Image 28" },
        { src: "/assets/images/gallery/29.jpeg", alt: "Image 29" },
        { src: "/assets/images/gallery/30.jpeg", alt: "Image 30" },
        { src: "/assets/images/gallery/31.jpeg", alt: "Image 31" },
        { src: "/assets/images/gallery/32.jpeg", alt: "Image 32" },
    ],
];

// Flatten the array for mobile
const galleryForMobile: Photo[] = galleryStrips.flat();

const GalleryComponent: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

    //for mobile autoplay
    const plugin = useRef(Autoplay({ delay: 5500, stopOnInteraction: true }));

    const isMobile = useIsMobile();

    const openModal = (photo: Photo) => {
        setSelectedPhoto(photo);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPhoto(null);
    };

    return (
        <>
            <h3 className='text-center text-4xl font-bold py-10 pt-10 pb-0 md:py-10'>
                Galerie foto 📸
            </h3>
            {isMobile ? (
                <div className='mt-10 mb-7'>
                    <Carousel
                        plugins={[plugin.current]}
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.start}
                    >
                        <CarouselContent>
                            {galleryForMobile.map((photo, index) => (
                                <CarouselItem key={index}>
                                    <div className="cursor-pointer" onClick={() => openModal(photo)}>
                                        <div className="relative w-full h-[250px]"> {/* Set a fixed height for consistency */}
                                            <img
                                                src={photo.src}
                                                alt={photo.alt}
                                                className="object-cover w-full h-full rounded-lg" // Ensure the image covers the area and rounds the corners
                                            />
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-2 top-1/2 z-10 opacity-60 hover:opacity-100 transition-opacity duration-300" />
                        <CarouselNext className="absolute right-2 top-1/2 z-10 opacity-60 hover:opacity-100 transition-opacity duration-300" />
                    </Carousel>
                </div>
            ) : (
                <div className="gallery">
                    {galleryStrips.map((strip, index) => {
                        const stripClass = `gallery__strip__wrapper gallery__strip ${index === 0 ? 'one' : index === 1 ? 'two' : index === 2 ? 'three' : 'four'
                            }`;

                        return (
                            <div key={index} className={stripClass}>
                                {strip.map((photo, photoIndex) => (
                                    <div key={photoIndex} className="photo" onClick={() => openModal(photo)}>
                                        <div className="photo__image">
                                            <img src={photo.src} alt={photo.alt} className="object-cover w-full h-full" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                    <Modal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        imageSrc={selectedPhoto?.src || ''}
                        imageAlt={selectedPhoto?.alt || ''}
                    />
                </div>
            )}
        </>
    );
};

export default GalleryComponent;
