"use client";

import { APP_ROUTES_AUTH } from "@/constants/routes";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import useWindowWidth from "@/hooks/use-window-width";
import { NewPasswordForm } from "./new-password-form";
import { cn } from "@/lib/utils";


interface ResetPasswordButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect",
    asChild?: boolean,
    className?: string;
};

export const ResetPasswordButton = (props: ResetPasswordButtonProps) => {
    const { children, mode, asChild, className } = props;

    const router = useRouter();
    const { isMobile } = useWindowWidth();

    const onClick = () => {
        router.push(APP_ROUTES_AUTH.LOGIN)
    }

    if (mode === "modal" && !isMobile) {
        return (
            <Dialog key="reset-password-modal">
                <DialogTrigger asChild={asChild}>
                    {children}
                </DialogTrigger>
                <DialogContent className="p-0 w-auto bg-primary-foreground border-none">
                    <NewPasswordForm />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <span
            onClick={onClick}
            className={cn("cursor-pointer", className)}
        >
            {children}
        </span>
    )
}