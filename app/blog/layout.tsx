import FooterComponent from "@/components/general/footer-component";
import { Navbar } from "@/components/general/navbar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Blog",
    description: "Descoperă articole, povești și resurse utile din diverse domenii, scrise cu pasiune și autenticitate.",
    icons: {
        icon: ['/icon.ico']
    },
    manifest: '/site.webmanifest',
};

const BlogPageLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            <Navbar />
            {children}
            <FooterComponent />
        </>
    )
}

export default BlogPageLayout;