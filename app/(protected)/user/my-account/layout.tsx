"use client";

import { BackButton } from "@/components/general/back-button";
import { Navbar } from "@/components/general/navbar";
import useWindowWidth from "@/hooks/use-window-width";
import React from "react";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = (props: ProtectedLayoutProps) => {
    const { children } = props;

    const { isMobile } = useWindowWidth();

    return (
        <div className="flex flex-col  w-full">
            {!isMobile && (
                <BackButton />
            )}
            <Navbar />
            <div className="px-3 w-full">{children}</div>
        </div>
    );
};

export default ProtectedLayout;