"use client";

import { MainNavbar } from "./main-nav-bar";

interface NavbarProps {}

export const Navbar = (props: NavbarProps) => {
    return (
        <div className="flex flex-col">
            <MainNavbar />
        </div>
    );
};