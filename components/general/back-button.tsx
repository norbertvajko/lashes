"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IoReturnDownBack } from "react-icons/io5";

interface BackButtonProps {
    variant?: "outline" | "default";
}

export const BackButton = (props: BackButtonProps) => {
    const { variant = "default" } = props;
    const router = useRouter();

    const handleBackButtonClick = () => {
       router.back();
    };

    return (
        <div className="fixed bottom-4 right-4 flex items-center justify-end z-[9999]">
            <Button variant={variant} className="rounded-full" onClick={handleBackButtonClick}>
                <IoReturnDownBack size={20} />
            </Button>
        </div>
    );
};
