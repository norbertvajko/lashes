"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/utils/cn";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
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

  // State to track loading status
  const [isLoading, setIsLoading] = useState(true);

  // Call useSession unconditionally at the top
  const user = useSession();
  const isLoggedIn = user?.isSignedIn;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      // Ensure we wait for the 'check-user' API response before rendering
      const fetchUserData = async () => {
        try {
          const response = await fetch('/api/auth/check-user');
          if (!response.ok) {
            throw new Error('Failed to check user');
          }
          const data = await response.json();
        } catch (error) {
          console.error('Error checking user:', error);
          // In case of error, we can keep trying or show an error message
        } finally {
          setIsLoading(false); // Always stop loading
        }
      };

      fetchUserData();
    } else {
      setIsLoading(false); // Stop loading if user is not logged in
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

  // Prevent rendering of the navigation until we have finished the user check
  if (isLoading) {
    return null; // Or show a loading spinner here
  }

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
                  "relative group inline-block items-center text-white dark:hover:text-neutral-300 hover:text-neutral-500",
                  "text-sm md:text-base font-medium transition-all duration-200 ease-in-out"
                )}
              >
                <span className="text-xs md:text-sm tracking-wide">{navItem.name}</span>
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
                      label="Comenzile mele"
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
