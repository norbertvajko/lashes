import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Plată reușită",
    description: "Îți mulțumim pentru achiziție! Plata a fost procesată cu succes. Verifică emailul pentru detalii despre curs și pașii următori.",
    icons: {
        icon: ['/icon.ico'],
    },
    manifest: '/site.webmanifest',
};

const PaymentSuccessPageLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            {children}
        </>
    )
}

export default PaymentSuccessPageLayout;