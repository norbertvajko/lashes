"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export interface IRedoAnimTextProps {
    delay: number;
}

export default function RedoAnimText({ delay }: IRedoAnimTextProps) {
    const textIndex = useMotionValue(0);
    const texts = [
        "Bună!",
        "Sunt Larisa Tonta, specialist certificat în aplicarea genelor false, cu o experiență de peste 2 ani în domeniu. Mă dedic să ofer clienților mei un look perfect, adaptat nevoilor și dorințelor fiecăruia."
    ];

    const baseText = useTransform(textIndex, (latest) => texts[latest] || "");
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const displayText = useTransform(rounded, (latest) =>
        baseText.get().slice(0, latest)
    );
    const updatedThisRound = useMotionValue(true);


    useEffect(() => {
        animate(count, 100, {
            type: "tween",
            delay: delay,
            duration: 1,
            ease: "easeIn",
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 1,
            onUpdate(latest) {
                if (updatedThisRound.get() === true && latest > 0) {
                    updatedThisRound.set(false);
                    console.log(1);
                } else if (updatedThisRound.get() === false && latest === 0) {
                    if (textIndex.get() === texts.length - 1) {
                        console.log(2);
                    } else {
                        textIndex.set(textIndex.get() + 1);
                        console.log(3);
                    }
                    updatedThisRound.set(false);
                    return;
                }
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <motion.span className='md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20'
        transition={{ duration: 3 }}>{displayText}</motion.span>;
}