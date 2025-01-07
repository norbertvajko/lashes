import { BackButton } from "@/components/general/back-button";
import React from "react";

const ContactPageLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            {children}
            <BackButton />
        </>
    )
}

export default ContactPageLayout;