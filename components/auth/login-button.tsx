"use client";

import React from 'react';
import { APP_ROUTES_AUTH } from "@/constants/routes";
import { redirect, useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { LoginForm } from "@/components/auth/login-form";
import useWindowWidth from "@/hooks/use-window-width";

interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect",
    asChild?: boolean,
};

export const LoginButton = React.forwardRef<HTMLSpanElement, LoginButtonProps>((props, ref) => {
    const { children, mode, asChild } = props;

    const router = useRouter();
    const { isMobile } = useWindowWidth();

    const onClick = () => {
        router.push(APP_ROUTES_AUTH.LOGIN)
    }

    if (mode === "modal" && !isMobile) {
        return (
            <Dialog key="loginModal">
                <DialogTrigger asChild={asChild}>
                    <span ref={ref}>
                        {children}
                    </span>
                </DialogTrigger>
                <DialogContent className="p-0 w-auto bg-primary-foreground border-none">
                    <LoginForm />
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
    )
});

LoginButton.displayName = 'LoginButton';
