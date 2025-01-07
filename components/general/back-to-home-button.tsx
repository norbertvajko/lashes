"use client";

import { APP_ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IoHomeOutline } from "react-icons/io5";

export const BackToHomeButton = () => {
    const router = useRouter();

    const handleBackButtonClick = () => {
        router.push(APP_ROUTES.HOME);
    };

    return (
        <div className={"absolute bottom-3 right-3 flex flex-row items-center justify-center"}>
            <Button variant={"default"} className="rounded-full" onClick={handleBackButtonClick}>
                <IoHomeOutline size={20} />
            </Button>
        </div>
    )
}