"use client";

import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {

    const onClick = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
        })
    }

    return (
        <div className="flex items-cente justify-center w-full gap-x-[16px]">
            <Button
                className="gap-1 text-xs font-medium uppercase"
                variant="outline"
                onClick={() => onClick("google")}
            >
                <FcGoogle size={20} />
                Continua cu Google
            </Button>
        </div>
    )
}