import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Modulul Exclusive",
    description: "Un curs intensiv și accesibil pentru începători, care te pregătește să începi imediat să ai cliente plătitoare. Învață totul despre extensiile de gene, de la bază până la perfecționare!",
    icons: {
        icon: ['/icon.ico']
    },
    manifest: '/site.webmanifest',
};

const ExclusivePageLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            {children}
        </>
    )
}

export default ExclusivePageLayout;