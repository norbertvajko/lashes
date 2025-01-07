"use client";

import React from 'react';
import { APP_ROUTES_AUTH } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { RegisterForm } from "./register-form";
import useWindowWidth from "@/hooks/use-window-width";

interface RegisterButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect",
    asChild?: boolean,
};

export const RegisterButton = React.forwardRef<HTMLSpanElement, RegisterButtonProps>((props, ref) => {
    const { children, mode, asChild } = props;
    const router = useRouter();
    const { isMobile } = useWindowWidth();

    const onClick = () => {
        router.push(APP_ROUTES_AUTH.REGISTER);
    };

    if (mode === "modal" && !isMobile) {
        return (
            <Dialog key="registerModal">
                <DialogTrigger asChild={asChild}>
                    <span ref={ref}>
                        {children}
                    </span>
                </DialogTrigger>
                <DialogContent className="p-0 w-auto bg-primary-foreground border-none">
                    <RegisterForm />
                    {/* <SignupFormDemo /> */}
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <span
            onClick={onClick}
            className="cursor-pointer"
            ref={ref}
        >
            {children}
        </span>
    );
});

RegisterButton.displayName = 'RegisterButton';
