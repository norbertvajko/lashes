import { BackButton } from "@/components/general/back-button";
import FooterComponent from "@/components/general/footer-component";
import { Navbar } from "@/components/general/navbar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Cursuri",
    description: "Explorează cursurile noastre și învață într-un mod practic și interactiv. Fă un pas înainte în dezvoltarea ta personală și profesională!",
    icons: {
        icon: ['/icon.ico']
    },
    manifest: '/site.webmanifest',
};

const CoursesPageLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            <Navbar />
            <div className="mt-[120px] md:mt-[5px] lg:pb-[70px] lg:pt-[130px]">
                {children}
                <BackButton variant="outline" />
            </div>
            <FooterComponent />
        </>
    )
}

export default CoursesPageLayout;