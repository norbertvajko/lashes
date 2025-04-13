import FooterComponent from "@/components/general/footer-component";
import { Navbar } from "@/components/general/navbar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Contact",
    description: "Ia legătura cu noi pentru întrebări, colaborări sau feedback. Suntem mereu deschiși la conversații!",
    icons: {
        icon: ['/icon.ico']
    },
    manifest: '/site.webmanifest',
};

const ContactPageLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            <Navbar />
            {children}
            <FooterComponent />
        </>
    )
}

export default ContactPageLayout;