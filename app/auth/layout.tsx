import { BackToHomeButton } from "@/components/general/back-to-home-button";
import PageLoader from "@/components/page-loader";
import React, { Suspense } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <Suspense fallback={<PageLoader />}>
            <div className="flex items-center justify-center w-full h-full" >
                {children}
                <BackToHomeButton />
            </div>
        </Suspense>
    )
}

export default AuthLayout;