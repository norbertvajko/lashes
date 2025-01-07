import { BackButton } from "@/components/general/back-button";
import FooterComponent from "@/components/general/footer-component";
import { Navbar } from "@/components/general/navbar";
import React from "react";

const CoursesPageLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            <Navbar />
            <div className="lg:pb-[70px] lg:pt-[130px]">
                {children}
                <BackButton variant="outline" />
            </div>
            <FooterComponent />
        </>
    )
}

export default CoursesPageLayout;