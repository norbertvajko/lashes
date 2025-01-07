import FooterComponent from "@/components/general/footer-component";
import { Navbar } from "@/components/general/navbar";
import React from "react";

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