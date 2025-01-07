"use client";

import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ExitIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineManageAccounts } from "react-icons/md";
import { APP_ROUTES_USER } from "@/constants/routes";
import { CiLogin } from "react-icons/ci";
import { FaUserPlus, FaListCheck } from "react-icons/fa6";
import { Button } from "../ui/button";
import { LoginButton } from "./login-button";
import { RegisterButton } from "./register-button";
import { LuUser2 } from "react-icons/lu";

export const UserButton = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isSession, setIsSession] = useState(false);

    useEffect(() => {
        setIsSession(status === "authenticated");
    }, [status]);

    const handleSettings = () => {
        router.push(APP_ROUTES_USER.SETTINGS);
    };

    const handleMyAccount = () => {
        router.push(APP_ROUTES_USER.ACCOUNT);
    }

    const handleManageAccount = () => {
        router.push(APP_ROUTES_USER.SETTINGS_MANAGE_ACCOUNT);
    }

    const handleLogout = async () => {
        await signOut();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none border-none">
                <Avatar>
                    <AvatarImage className="object-cover bg-white" src={session?.user?.image || ""} />
                    <AvatarFallback className="bg-transparent">
                        <LuUser2 className="text-white bg-gradient-to-br from-sky-400 to-green-400 hover:bg-gradient-to-bl rounded-full p-1 font-bold" size={30} /> 
                    </AvatarFallback> 
                </Avatar>
            </DropdownMenuTrigger>
            {isSession ? (
                <DropdownMenuContent className="w-40 z-[999999999999999]" align="end">
                    <DropdownMenuItem className="cursor-pointer" onClick={handleMyAccount}>
                        <FaListCheck className="h-4 w-4 mr-2" />
                        Comenzi
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={handleManageAccount}>
                    <IoSettingsOutline className="h-4 w-4 mr-2" />
                        Setari
                    </DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}> 
                        <ExitIcon className="h-4 w-4 mr-2" />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            ) : (
                <DropdownMenuContent className="w-40 pl-3 z-[999999999999999]" align="end">
                    <DropdownMenuItem asChild>
                        <LoginButton>
                            <Button className="p-0 gap-2" color="#15803D" variant={"link"} size={"lg"}>
                                <CiLogin size={20} />
                                Login
                            </Button>
                        </LoginButton>
                    </DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem asChild>
                        <RegisterButton asChild>
                            <Button className="p-0 gap-2" color="#15803D" variant={"link"} size={"lg"}>
                                <FaUserPlus size={20} />
                                Register
                            </Button>
                        </RegisterButton>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            )}
        </DropdownMenu>
    )
}
