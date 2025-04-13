import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Modulul Gratis",
    description: "Webinar informativ și GRATUIT pentru începătoare care vor să afle ce presupune cu adevărat meseria de lash artist și ce costuri implică. Simplu, clar și fără obligații.",
    icons: {
        icon: ['/icon.ico']
    },
    manifest: '/site.webmanifest',
};

const FreePageLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            {children}
        </>
    )
}

export default FreePageLayout;