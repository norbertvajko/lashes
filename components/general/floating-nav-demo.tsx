"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { FloatingNav } from "../ui/floating-navbar";
import { RiHome4Line } from "react-icons/ri";
import { TiContacts } from "react-icons/ti";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { FaBlog } from "react-icons/fa";
import useWindowWidth from "@/hooks/use-window-width";



export function FloatingNavDemo() {
    const pathname = usePathname();
    const router = useRouter();
    const [shouldScroll, setShouldScroll] = useState(false);

    const { isMobile } = useWindowWidth();

    const scrollToPosition = (position: number) => {
        window.scrollTo({
            top: position,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        if (shouldScroll && pathname === "/") {
            scrollToPosition(600);
            setShouldScroll(false);
        }
    }, [shouldScroll, pathname]);

    const handleCursuriClick = () => {
        router.push("/courses")
    };

    const navItems = [
        {
            name: "Acasa",
            link: "/",
            icon: <RiHome4Line className="h-4 w-4" />,

        },
        {
            name: "Cursuri",
            link: "/courses",
            icon: <MdOutlineLibraryBooks className="h-4 w-4" />,
            onClick: handleCursuriClick,
        },
        {
            name: "Blog",
            link: "/blog",
            icon: <FaBlog className="h-4 w-4" />,

        },
        {
            name: "Contact",
            link: "/contact",
            icon: (
                <TiContacts className="h-4 w-4" />
            ),
        },
    ];

    return (
        <div className="relative w-full z-[999999999] flex items-center justify-center">
            <FloatingNav navItems={navItems} />
        </div>
    );
}
