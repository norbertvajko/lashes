import { BackButton } from "@/components/general/back-button";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Termeni si conditii",
    description: "Citește cu atenție termenii și condițiile de utilizare a site-ului și serviciilor noastre. Transparență, responsabilitate și siguranță pentru toți utilizatorii.",
    icons: {
        icon: ['/icon.ico']
    },
    manifest: '/site.webmanifest',
};

const TermsAndConditionsPageLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            {children}
            <BackButton />
        </>
    )
}

export default TermsAndConditionsPageLayout;