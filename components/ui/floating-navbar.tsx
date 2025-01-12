"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/utils/cn";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import useWindowWidth from "@/hooks/use-window-width";
import { LoginButton } from "../general/login-button";
import { SignedIn, UserButton, useSession } from "@clerk/nextjs";
import { IoIosListBox } from "react-icons/io";

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
  const [isClient, setIsClient] = useState(false);
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const { isMobile } = useWindowWidth();

  const user = isClient ? useSession() : null;
  const isLoggedIn = isClient && user?.isSignedIn;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetch('/api/auth/check-user')
        .then((response) => response.json())
        .then((data) => {
          console.log('User:', data);
        })
        .catch((error) => {
          console.error('Error checking user:', error);
        });
    }
  }, [isLoggedIn]);


  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress?.getPrevious()!;

      if (scrollYProgress.get() < 0.03) {
        setVisible(true);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      {isClient && (
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
                    <span className="hover:bg-teal-600 transition duration-300 ease-in-out transform hover:scale-105">
                      {navItem.icon}
                    </span>
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
          {isLoggedIn ? (
            <div className="flex flex-row gap-2 mt-[2px] items-center">
              <Separator orientation="vertical" className="h-6 text-gray-400" />
              <SignedIn>
                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Link
                      label="Cursurile mele"
                      labelIcon={<IoIosListBox />}
                      href="/user/orders"
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </SignedIn>
            </div>
          ) : (
            <LoginButton />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
