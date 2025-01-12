import React, { useState } from 'react';
import {
    Carousel, CarouselContent, CarouselItem, 
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import useWindowWidth from '@/hooks/use-window-width';
import Image from "next/image";

interface ProductGalleryProps {
    images?: string[]
}

export const ProductGallery = (props: ProductGalleryProps) => {
    const { images } = props;
    const { isMobile } = useWindowWidth();
    const [activeIndex, setActiveIndex] = useState(0);

    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: false })
    );

    const handleThumbnailHover = (index: number) => {
        setActiveIndex(index);
    };

    if (!images || images.length === 0) {
        return <div>No images available</div>;
    }

    return (
        <div className="flex bg-off-white lg:w-[420px] 2xl:w-[580px] h-[350px] lg:h-full">
            <div className="overflow-hidden">
                <div className="relative mb-2 bg-white">
                    <Image
                        src={images[activeIndex]}
                        alt="Gallery Hero"
                        className="p-[55px] h-[350px] w-[1018px] lg:w-[420px] lg:h-[518px] 2xl:w-[580px] transition-transform duration-300 transform hover:scale-105 object-contain"
                    />
                </div>
                <div className="text-center bg-white h-[70px] md:h-[130px]">
                    <Carousel
                        plugins={[plugin.current]}
                    >
                        <CarouselContent className='flex flex-row items-center justify-center '>
                            {images.map((image, index) => (
                                <a
                                    key={index}
                                    href={image}
                                    onClick={(e) => e.preventDefault()}
                                    onMouseEnter={() => handleThumbnailHover(index)}
                                    className={`flex ${index === activeIndex ? 'opacity-20' : 'opacity-75 hover:opacity-100'}`}
                                >
                                    <CarouselItem>
                                        <Image 
                                            src={image} 
                                            alt={`Thumbnail ${index + 1}`} 
                                            className="object-contain w-[128px] h-[70px] md:h-[128px] p-[13px]" 
                                        />
                                    </CarouselItem>
                                </a>
                            ))}
                        </CarouselContent >
                    </Carousel>
                </div>
            </div>
        </div>
    );
};
