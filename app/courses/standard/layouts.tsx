import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Modulul Standard",
    description: "Curs de bază 1-3D, ideal pentru începători care vor să testeze dacă extensiile de gene li se potrivesc. Simplu, accesibil și gândit să te ajute să descoperi această meserie pas cu pas.",
    icons: {
        icon: ['/icon.ico']
    },
    manifest: '/site.webmanifest',
};

const StandardPageLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            {children}
        </>
    )
}

export default StandardPageLayout;