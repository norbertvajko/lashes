"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";
import { Separator } from "@/components/ui/separator"
import {cn} from "@/lib/utils";
import React from "react";


interface CardWrapperProps {
    children: React.ReactNode;
    headerTitle: string;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
    className?: string
}

export const CardWrapper = ({
    children,
    headerTitle,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial,
    className
}: CardWrapperProps) => {

    return (
        <Card className={cn("px-6 mw-[450px] w-[430px] shadow-md", className)}>
            <CardHeader>
                <Header title={headerTitle} label={headerLabel} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <>
                    <div className="flex gap-3 overflow-hidden p-2 mb-3 items-center justify-center w-[100%]">
                        <Separator className="max-w-[125px]" />
                        <div className="rounded-full max-w-[17px] max-h-[17px] bg-slate-300 border-slate-700 p-4 relative text-gray-800 ">
                            <span className="uppercase font-sans font-semibold text-xs absolute inset-0 flex items-center justify-center text-[9px]">Or</span>
                        </div>
                        <Separator className="max-w-[125px]" />
                    </div>
                    <CardFooter>
                        <Social />
                    </CardFooter>
                </>
            )}
            <CardFooter>
                <BackButton
                    label={backButtonLabel}
                    href={backButtonHref}
                />
            </CardFooter>

        </Card>
    )
}