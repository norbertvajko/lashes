import FooterComponent from "@/components/general/footer-component";
import { Navbar } from "@/components/general/navbar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Comenzi",
    description: "Vizualizează și gestionează comenzile tale rapid și ușor. Verifică statusul livrărilor, detaliile produselor și istoricul achizițiilor tale.",
    icons: {
        icon: ['/icon.ico']
    },
    manifest: '/site.webmanifest',
};

const UserOrdersPageLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            <Navbar />
            {children}
            <FooterComponent />
        </>
    )
}

export default UserOrdersPageLayout;