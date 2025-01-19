"use client";

import { Card, CardContent } from '@/components/ui/card';
import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import QuoteText from './quote-text';

export const AboutMeSection = () => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const isInView = useInView(videoRef, { once: true })

    const headingText = "Despre mine";
    const subHeadingText = "✨Fă dintr-o pasiune un lifestyle✨";
    const text = `
    Hello, numele meu este Larisa, am 26 de ani și aplic extensii de gene de 6 ani de zile din pasiune pentru frumusețea pe care ți-o conferă purtarea lor.
    \n 
    Îmi trec pragul anual aproximativ 1200 de cliente și sunt mândră de asta, dar tot ce am realizat a fost doar prin multă muncă și răbdare ☺️. Evident, iubesc ceea ce fac altfel nu ar fi fost așa☹️.
    \n 
    ⌛️În 2018 am finalizat primul meu curs de bază, după care până anul acesta am finalizat 40 de cursuri de perfecționare atât în domeniul extensiilor de gene cât și al sprâncenelor🤫
    \n 
    ⬆️Acum, în 2024 am decis că este timpul să trec la nivelul următor, adică cel de trainer așa că vin acum în fața voastră nu doar ca și Lari care pune gene 🙈... ci ca Lari Lash Trainer👩🏽‍🏫. Așa că am ales să fac un curs cu 3 module diferite în funcție de dorințele voastre pentru a vă ajuta să pășiți mai ușor și mai corect în acest domeniu frumos 😁 
    \n`;

    // Split the text into lines
    const textLines = text.trim().split('\n');

    // Animation variants
    const textVariantsLeft = {
        hidden: { opacity: 0, x: -50 },
        show: { opacity: 1, x: 0, transition: { duration: 1.85 } },
    };

    const textVariantsRight = {
        hidden: { opacity: 0, x: 50 },
        show: { opacity: 1, x: 0, transition: { duration: 1.85 } },
    };

    const quote = "Fa dintr-o pasiune un lifestyle";

    const gradientAnimation = {
        animate: {
            backgroundPosition: ['-500%', '500%', '-500%', '500%'], // Adjusted keyframes for continuous looping
            transition: {
                duration: 6, // Total duration of the animation
                ease: 'linear', // Linear easing for smoothness
                loop: Infinity, // Loop infinitely
            },
        },
    };

    useEffect(() => {
        if (isInView && videoRef.current) {
            videoRef.current.play()
        }
    }, [isInView])

    const handleTextAnimationComplete = () => {
        if (videoRef.current) {
            videoRef.current.play()
        }
    }

    const blink = {
        open: { scaleY: 1 }, // Eyelashes in the open position (full length)
        closed: { scaleY: 0.1 }, // Eyelashes in the closed position (small/hidden)
    };

    return (
        <div className='w-full px-4 md:px-[90px] py-16 md:pb-32 bg-black'>
            <Card className='max-w-4xl mx-auto'>
                <CardContent className='flex flex-col md:flex-row bg-black text-white p-6 items-center justify-between'>
                    <div className='flex flex-row'>
                        <div className='w-full mb-4 md:mb-0'>
                            <motion.h2
                                initial="hidden"
                                whileInView="show"
                                variants={textVariantsLeft}
                                className='text-5xl font-bold pb-3'
                            >
                                {headingText}
                            </motion.h2>

                            <motion.h3
                                initial="hidden"
                                whileInView="show"
                                variants={textVariantsRight}
                                className='text-2xl font-bold pb-10'
                                transition={{ delay: 0.2 }} // Delay for subheading
                            >
                                {subHeadingText}
                            </motion.h3>

                            {/* Main Text */}
                            <div className='pt-5'>
                                {textLines.map((line, index) => (
                                    <motion.h5
                                        key={index}
                                        initial="hidden"
                                        whileInView="show"
                                        variants={index % 2 === 0 ? textVariantsLeft : textVariantsRight} // Alternate between left and right
                                        className='text-xl'
                                        onAnimationComplete={index === textLines.length - 1 ? handleTextAnimationComplete : undefined} // Only show image after the last line
                                        transition={{ delay: 0.4 + index * 0.2 }} // Delay for each line in the main text
                                    >
                                        {line.trim() ? line : <br />} {/* Render new lines correctly */}
                                    </motion.h5>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
                <div className="relative w-full aspect-video overflow-hidden rounded-b-lg">
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover filter grayscale" // Apply grayscale filter
                        loop
                        playsInline
                        preload="auto"
                        controls
                        muted
                    >
                        <source src="/assets/videos/certificates-video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </Card>
            {/* <div className='pt-6'>
                <CertificationsSLider />
            </div>*/}
            <div className='pt-6 flex items-center justify-center mt-[90px]'>
                <QuoteText />
            </div>
        </div>
    );
};
