import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Modulul Express",
    description: "Curs de bază 1-2D, ideal pentru începători. Îți oferă o introducere clară și rapidă în lumea extensiilor de gene, ca să vezi dacă ți se potrivește această meserie.",
    icons: {
        icon: ['/icon.ico']
    },
    manifest: '/site.webmanifest',
};

const ExpressPageLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            {children}
        </>
    )
}

export default ExpressPageLayout;