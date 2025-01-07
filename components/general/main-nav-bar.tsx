import { useRouter } from "next/navigation";
import React, { useEffect } from "react"
import { usePathname } from 'next/navigation'
import { FloatingNavDemo } from "./floating-nav-demo"

export const MainNavbar = () => {
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        // Clean up the event listener on component unmount
        return () => {
            // Add any necessary cleanup code here if needed
        };
    }, [router]);


    return (
        <FloatingNavDemo />
    )
}
