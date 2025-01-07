"use client";

import { useSidebar } from "@/hooks/use-side-bar";
import { User, Store, Settings, UserCog, CombineIcon, BookOpen, FolderCog, MessageSquareHeart, Contact, ListOrdered } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { APP_ROUTES, APP_ROUTES_ADMIN, APP_ROUTES_USER } from "@/constants/routes";
import { useCurentUserRole } from "@/hooks/use-current-user-role";
import { UserRole } from "@prisma/client";
import { useCurrentUser } from "@/hooks/use-current-user";

export interface NavItem {
    title: string;
    href: string;
    icon: LucideIcon;
    color?: string;
    isChidren?: boolean;
    children?: NavItem[];
}

export const NavItems: NavItem[] = [
    {
        title: "Cursuri",
        icon: BookOpen,
        href: "/",
        color: "text-sky-500",
    },
    {
        title: "Blog",
        icon: MessageSquareHeart,
        color: "text-purple-500",
        href: "/blog",
    },
    {
        title: "Contact",
        icon: Contact,
        color: "text-yellow-500",
        href: "/contact",
    },
];

export const NavItemsUser: NavItem[] = [
    {
        title: "Contul meu",
        icon: User,
        color: "text-green-500",
        isChidren: true,
        href: APP_ROUTES_USER.SETTINGS,
        children: [
            {
                title: "Setari",
                icon: Settings,
                color: "text-orange-500",
                href: APP_ROUTES_USER.SETTINGS_PROFILE,
            },
            {
                title: "Administrare cont",
                icon: FolderCog,
                color: "text-purple-700",
                href: APP_ROUTES_USER.SETTINGS_MANAGE_ACCOUNT,
            },
            {
                title: "Comenzi",
                icon: ListOrdered,
                href: APP_ROUTES_USER.ACCOUNT,
                color: "text-red-500",
            },
        ],
    },
    ...NavItems
];

interface SideBarProps {
    items: NavItem[];
    setOpen?: (open: boolean) => void;
    className?: string;
}

export const SideBar: React.FC<SideBarProps> = (props: SideBarProps) => {
    const { items, setOpen, className } = props;

    const currentUserRole = useCurentUserRole();
    const { user } = useCurrentUser();

    const path = usePathname();

    const { isOpen } = useSidebar();
    const [openItem, setOpenItem] = useState("");
    const [lastOpenItem, setLastOpenItem] = useState("");

    useEffect(() => {
        if (isOpen) {
            setOpenItem(lastOpenItem);
        } else {
            setLastOpenItem(openItem);
            setOpenItem("");
        }
    }, [isOpen]);

    const isAdmin = () => currentUserRole === UserRole.ADMIN;
    const adminItem: NavItem = {
        title: "Admin",
        icon: UserCog,
        href: APP_ROUTES_ADMIN.ADMIN,
        color: "text-destructive",
        isChidren: true,
        children: [
            {
                title: "Dashboard",
                icon: CombineIcon,
                color: "text-sky-800",
                href: APP_ROUTES_ADMIN.ADMIN,
            },
            {
                title: "Scrape",
                icon: CombineIcon,
                color: "text-green-800",
                href: APP_ROUTES_ADMIN.SCRAPE,
            },
        ],
    };
    const updatedNavItems = useMemo(() => {
        if (!user) {
            return [...NavItems];
        }

        return isAdmin() ? [...NavItemsUser, adminItem] : NavItemsUser;
    }, [adminItem, isAdmin]);


    return (
        <div className={`mt-[30px] lg:mt-[78px] lg:space-y-3 lg:left-0 w-[220px] lg:h-full lg:border-r-2 lg:fixed space-y-2 lg:px-3 lg:pt-4 ${className ?? ''}`}>
            {updatedNavItems.map((item) =>
                item.isChidren ? (
                    <Accordion
                        type="single"
                        collapsible
                        className="space-y-6"
                        key={item.title}
                        value={openItem}
                        onValueChange={setOpenItem}
                    >
                        <AccordionItem value={item.title} className="border-none">
                            <AccordionTrigger
                                className={cn(
                                    buttonVariants({ variant: 'ghost' }),
                                    'group relative flex h-12 justify-between px-4 py-3 text-base duration-200 hover:bg-muted hover:no-underline',
                                )}
                            >
                                <div>
                                    <item.icon className={cn('h-5 w-5', item.color)} />
                                </div>
                                <div
                                    className={cn(
                                        'absolute left-12 text-base duration-200 ',
                                        !isOpen && className,
                                    )}
                                >
                                    {item.title}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-2 pt-1">
                                {item.children?.map((child) => (
                                    <Link
                                        key={child.title}
                                        href={child.href}
                                        onClick={() => {
                                            if (setOpen) setOpen(false)
                                        }}
                                        className={cn(
                                            buttonVariants({ variant: 'ghost' }),
                                            'group relative flex h-12 justify-start gap-x-3 ml-3',
                                            path === child.href &&
                                            'bg-muted font-bold hover:bg-muted',
                                        )}
                                    >
                                        <child.icon className={cn('h-5 w-5', child.color)} />
                                        <div
                                            className={cn(
                                                'absolute left-12 text-base duration-200',
                                                !isOpen && className,
                                            )}
                                        >
                                            {child.title}
                                        </div>
                                    </Link>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ) : (
                    <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => {
                            if (setOpen) setOpen(false)
                        }}
                        className={cn(
                            buttonVariants({ variant: 'ghost' }),
                            'group relative flex h-12 justify-start',
                            path === item.href && 'bg-muted font-bold hover:bg-muted',
                        )}
                    >
                        <item.icon className={cn('h-5 w-5', item.color)} />
                        <span
                            className={cn(
                                'absolute left-12 text-base duration-200',
                                !isOpen && className,
                            )}
                        >
                            {item.title}
                        </span>
                    </Link>
                ),
            )}
        </div>
    );
}