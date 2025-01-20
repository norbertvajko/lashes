"use client";

import lashesBanner from '../../assets/images/LLLashes0089m-removebg-preview.png';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import { motion } from "framer-motion";
import { SparklesCore } from '../ui/sparkles';
import { FlipWords } from '../ui/flip-words';
import ScrollDownButton from "@/components/ui/scroll-down-btn"
import useWindowWidth from '@/hooks/use-window-width';

const banners = [
  lashesBanner
];

export const BannerComponent = () => {
  const words = ["fermecătoare", "voluminoase", "seducătoare", "strălucitoare"];

  const { isMobile } = useWindowWidth();

  return (
    <div className='w-full px-0 h-fit lg:h-[600px] bg-black relative'>
      {banners.map((banner, index) => (
        <Card key={index} className='ml-0'>
          <CardContent className="w-full items-center h-full px-0 bg-black flex text-white justify-between">
            <div className="h-[40rem] relative w-full bg-black flex flex-row items-center justify-center overflow-hidden rounded-md">
              <div className="flex flex-col w-full absolute inset-0 h-screen">
                <SparklesCore
                  id="tsparticlesfullpage"
                  background="transparent"
                  minSize={0.6}
                  maxSize={1.4}
                  particleDensity={100}
                  className="w-full h-full"
                  particleColor="#FFD700"
                />
              </div>

              {/* Flex container for desktop and mobile */}
              <div className="flex flex-col sm:flex-row w-full h-full">

                {/* Imaginea pe mobil */}
                <div className="w-full sm:hidden flex justify-center items-center mb-4 pt-[106px] z-[99999]">
                  <img
                    src={banner.src}
                    alt={`banner-${index + 1}`}
                    className="w-[280px] h-[280px] object-cover rounded-full"  // Imaginea mai mica si rotunda pe mobil
                  />
                </div>

                {/* Imaginea pe desktop */}
                <motion.div
                  initial={{ opacity: 0.9 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="max-h-[640px] z-[9999] w-[30%] justify-center items-center hidden sm:flex"
                >
                  <img
                    src={banner.src}
                    alt={`banner-${index + 1}`}
                    className="w-full h-[177px] md:h-[450px] lg:h-[640px] max-w-[470px] object-cover"
                  />
                </motion.div>

                {/* Textul */}
                <div className="w-[100%] sm:w-[70%] h-full flex justify-center items-start px-4 pt-0 md:pt-[140px] text-center sm:text-end">
                  <div className="text-2xl sm:text-3xl lg:text-7xl mx-auto font-normal text-neutral-600 pt-0 md:pt-[60px]">
                    <div className="block sm:flex sm:flex-col sm:items-start">
                      {/* Textul Creează priviri pe mobil */}
                      <span className="block  text-center">
                        Creează priviri
                      </span>
                      {/* FlipWords pe mobil */}
                      <span className="text-3xl sm:text-4xl lg:text-7xl">
                        <FlipWords words={words} />
                      </span>
                    </div>
                    <h5 className="pt-7 text-xl sm:text-4xl lg:text-6xl">
                      împreună cu <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-rose-500">LL LASHES</span>
                      <span className="block text-sm sm:text-lg pt-0">
                        by <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-white text-sm sm:text-lg">Larisa Tonta</span>
                      </span>
                    </h5>
                  </div>
                </div>
              </div>

            </div>
          </CardContent>

        <ScrollDownButton
            text='Despre mine'
            className='absolute bottom-[-45px] sm:bottom-0 mt-0 sm:mt-10 bg-white'
            onClick={() => {
              window.scrollTo({
                top: isMobile ? 2530 : 1300,
                behavior: "smooth"
              });
            }}
          />

          {/* SVG positioned at the bottom */}
          <svg
            className="absolute bottom-0 w-full h-6 -mb-5 sm:-mb-10 sm:h-[7rem] sm:bg-white"
            preserveAspectRatio="none"
            viewBox="0 0 1440 320"
          >
            <path
              fill="black"
              d="M0,192L48,170.7C96,149,192,107,288,106.7C384,107,480,149,576,181.3C672,213,768,235,864,218.7C960,203,1056,149,1152,149.3C1248,149,1344,203,1392,229.3L1440,256L1440,0L0,0Z"
            />
          </svg>
        </Card>
      ))}
    </div>
  );
};