"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/utils/cn";
import { FavoritesButton } from "../general/favorites-button";
import { Separator } from "@/components/ui/separator";
import { CartButton } from "../general/cart-button";
import { UserButton } from "../auth/user-button";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/cart-context";
import { useFavorites } from "@/context/favorites-context";
import { LoginButton } from "../auth/login-button";
import Link from "next/link";
import useWindowWidth from "@/hooks/use-window-width";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
    onClick?: () => void;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  const { isMobile } = useWindowWidth();

  const session = useSession();

  const { itemsLength: cartItemsLength } = useCart();
  const { itemsLength: favoriteItemsLength } = useFavorites();

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.03) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 0.9,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 0.9 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-10 border border-slate-400 rounded-full bg-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        <ul className="flex space-x-4">
          {navItems.map((navItem, idx: number) => (
            <Link
              key={navItem.name + idx}
              href={navItem.link}
              onClick={navItem.onClick && navItem.onClick}
              className={cn(
                "relative group inline-block items-center space-x-1 text-white dark:hover:text-neutral-300 hover:text-neutral-500 text s"
              )}
            >
              {isMobile ? (
                <>
                  <span className="hover:bg-teal-600 transition duration-300 ease-in-out transform hover:scale-105">{navItem.icon}</span>
                  <div className="invisible group-hover:opacity-100 group-hover:visible absolute bg-black opacity-90 text-white rounded-sm shadow-md">
                    <p className="px-4 py-2">{navItem.name}</p>
                  </div>
                </>
              ) : (
                <span className="text-sm">{navItem.name}</span>
              )}
            </Link>
          ))}
        </ul>
        {session?.data?.user?.name && session?.data?.user?.name !== "" ? (
          <div className="flex flex-row gap-2 mt-[2px] items-center">
            <Separator orientation="vertical" className="h-6 text-gray-400 ml-2" />
            <div className="flex">
              <FavoritesButton favCount={favoriteItemsLength} className="m-0 p-0" />
              <CartButton itemsCount={cartItemsLength} className="m-0 p-0" />
            </div>
            <Separator orientation="vertical" className="h-6 text-gray-400 ml-2" />
            <UserButton />
          </div>
        ) : (
          <LoginButton mode={"modal"} asChild>
            <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl font-medium rounded-full text-sm px-5 py-2 text-center">
              Login
            </button>
          </LoginButton>
        )}
      </motion.div>
    </AnimatePresence>
  );
};