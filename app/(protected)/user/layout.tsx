import { Navbar } from "@/components/general/navbar";
import React from "react";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = (props: ProtectedLayoutProps) => {
    const { children } = props;

    return (
        <div className="flex flex-col  w-full">
            <Navbar />
            <div className="px-3 w-full">{children}</div>
        </div>
    );
};

export default ProtectedLayout;