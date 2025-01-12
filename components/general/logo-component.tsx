"use client";

import { Button } from "@/components/ui/button"
import logo from "../../assets/images/logo-white.png";
import { useRouter} from "next/navigation";
import { APP_ROUTES } from "@/constants/routes";

export const LogoComponent = () => {
    const router = useRouter();

    const handleLogoClick = () => {
        router.push(APP_ROUTES.HOME)
    }

    return (
        <Button variant={"icon"} className="p-0" onClick={handleLogoClick}>
            <img
                onClick={handleLogoClick}
                src={logo.src}
                alt={"logo"}
                className="pt-1 h-[60px] w-[60px] md:h-[165px] md:w-[215px] object-cover cursor-pointer"
            />
        </Button>
    )
}