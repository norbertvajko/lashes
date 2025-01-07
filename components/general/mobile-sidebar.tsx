"use client";

import { useState } from "react";
import { AlignLeft } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavItems, NavItemsUser, SideBar } from "./side-bar";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoComponent } from "./logo-component";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { APP_ROUTES_AUTH } from "@/constants/routes";

interface MobileSideBarProps {
    className?: string;
}

export const MobileSidebar = (props: MobileSideBarProps) => {
    const { className } = props;

    const [open, setOpen] = useState(false);
    const { user } = useCurrentUser();
    const router = useRouter();

    return (
        <div className={cn("cursor-pointer flex flex-row", className)}>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <div className="flex items-center justify-center gap-2 text-white">
                        <AlignLeft size={38} />
                    </div>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 z-[9999]">
                    {user ? <SideBar items={NavItemsUser} setOpen={setOpen} /> :
                        <>
                            <div className="flex flex-col w-full pt-8 gap-2 text-center">
                                <h3 className="text-sm font-semibold">Autentifica-te in contul tau si ai control deplin asuptra ofertelor!</h3>
                                <Button onClick={() => router.push(APP_ROUTES_AUTH.LOGIN)} variant="default">Intra in cont</Button>
                            </div>
                            <SideBar items={NavItems} setOpen={setOpen} />
                        </>
                    }
                </SheetContent>
            </Sheet>
            <LogoComponent />
        </div>
    );
};