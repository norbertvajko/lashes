"use client";

import { CookieIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const COOKIE_BANNER_DELAY = 7000;

export default function CookieConsentBanner({ demo = false, onAcceptCallback = () => { }, onDeclineCallback = () => { } }) {
    const [isOpen, setIsOpen] = useState(false);

    const consentCookieName = "cookieConsent";

    const accept = () => {
        setIsOpen(false);
        document.cookie = `${consentCookieName}=true; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
        onAcceptCallback();
    };

    const decline = () => {
        setIsOpen(false);
        document.cookie = `${consentCookieName}=false`;
        onDeclineCallback();
    };

    useEffect(() => {
        const consentCookieValue = document.cookie
            .split('; ')
            .find(cookie => cookie.startsWith(`${consentCookieName}=`));

        if (!consentCookieValue) {
            setIsOpen(true);
        }

        const interval = setInterval(() => {
            if (!document.cookie.includes(`${consentCookieName}=true`) && !isOpen) {
                setIsOpen(true);
            }
        }, COOKIE_BANNER_DELAY);

        return () => clearInterval(interval);
    }, [isOpen]);

    return (
        <>
            {isOpen && (
                <div className={cn("fixed z-[999999] bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md transition-transform duration-700", !isOpen ? "transition-[opacity,transform] translate-y-8 opacity-0" : "transition-[opacity,transform] translate-y-0 opacity-100")}>
                    <div className="bg-[#000000E6] text-white sm:rounded-md">
                        <div className="grid gap-2">
                            <div className="border-bborder-b-slate-700 h-14 flex items-center justify-between p-4">
                                <h1 className="text-lg font-medium">We care about your privacy!</h1>
                                <CookieIcon className="h-[1.2rem] w-[1.2rem]" />
                            </div>
                            <Separator />
                            <div className="p-4 pt-2">
                                <div className="h-16 overflow-y-auto">
                                    <p className="text-sm font-normal">
                                        We use cookies to ensure you get the best experience on our website. For more information on how we use cookies, please see our cookie policy.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 p-4 py-5 border-t border-border">
                                <Button style={{ backgroundColor: "#F2CE00" }} onClick={accept} className="w-full text-black hover:text-[#FFF]">Accept toate</Button>
                                {/* TODO: implement necessary/custom cookies  */}
                                <Button onClick={decline} style={{ backgroundColor: "#F2CE00" }} className="w-full text-black hover:text-[#FFF]">Refuza toate</Button>
                                <Button onClick={decline} className="w-full" variant="ghost">Administreaza preferinte</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}