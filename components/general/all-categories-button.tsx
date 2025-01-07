import React, { useEffect } from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Link from "next/link";

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]

interface AllCategoriesButtonProps {
    className?: string;
    hasDropdown?: boolean;
}

export const AllCategoriesButton = (props: AllCategoriesButtonProps) => {
    const { className, hasDropdown = true } = props;

    const [navigationItem, setNavigationItem] = React.useState("vindeAcum");
    const [hasDropdownItem, setHasDropdownItem] = React.useState(hasDropdown);

    return (
        <NavigationMenu value={navigationItem}>
            <NavigationMenuList className="flex items-center gap-3">
                <NavigationMenuItem value={"vindeAcum"}>
                    <NavigationMenuTrigger style={{ background: "#15803D", color: "white", fontWeight: "bold" }}
                        onPointerMove={(event) => {
                            event.preventDefault()
                            setNavigationItem("vindeAcum");
                            setHasDropdownItem(true);
                        }}
                    >
                        Vinde acum
                    </NavigationMenuTrigger>
                    {hasDropdownItem && (
                        <NavigationMenuContent
                            className="h-[512px]"
                            onPointerMove={(event) => event.preventDefault()}
                            onPointerLeave={() => {
                                if (hasDropdown) {
                                    setHasDropdownItem(true);
                                    setNavigationItem("vindeAcum");
                                } else {
                                    setHasDropdownItem(true);
                                    setNavigationItem("");
                                }
                            }}
                        >
                            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                        <a
                                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                            href="/"
                                        >
                                            <div className="mb-2 mt-4 text-lg font-medium">
                                                shadcn/ui
                                            </div>
                                            <p className="text-sm leading-tight text-muted-foreground">
                                                Beautifully designed components built with Radix UI and
                                                Tailwind CSS.
                                            </p>
                                        </a>
                                    </NavigationMenuLink>
                                </li>
                                <Link href="/docs" title="Introduction">
                                    Re-usable components built using Radix UI and Tailwind CSS.
                                </Link>
                                <Link href="/docs/installation" title="Installation">
                                    How to install dependencies and structure your app.
                                </Link>
                                <Link href="/docs/primitives/typography" title="Typography">
                                    Styles for headings, paragraphs, lists...etc
                                </Link>
                            </ul>
                        </NavigationMenuContent>
                    )}
                </NavigationMenuItem>
                <NavigationMenuItem
                    value="components"
                    onMouseEnter={() => setNavigationItem("components")}
                    onMouseLeave={() => setNavigationItem("components")}
                >
                    <NavigationMenuTrigger
                        onPointerMove={(event) => {
                            event.preventDefault()
                            setNavigationItem("components");
                            setHasDropdownItem(true);
                        }}
                    >
                        Components
                    </NavigationMenuTrigger>
                    {hasDropdownItem && (
                        <NavigationMenuContent
                            onPointerLeave={() => {
                                if (hasDropdown) {
                                    setHasDropdownItem(true);
                                    setNavigationItem("components");
                                } else {
                                    setHasDropdownItem(true);
                                    setNavigationItem("");
                                }
                            }}
                            className="h-[512px] fixed"
                        >
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {components.map((component) => (
                                    <Link
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}
                                    </Link>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    )}
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/docs" legacyBehavior passHref>
                        <NavigationMenuLink>
                            Documentation
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}