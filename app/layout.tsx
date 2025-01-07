import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import React from "react";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { UserProvider } from "@/context/user-context";
import { CartProvider } from "@/context/cart-context";
import { FavoritesProvider } from "@/context/favorites-context";

const inter = Montserrat({ weight: "400", preload: false });

export const metadata: Metadata = {
  title: "LL Lashes",
  description: "Fa dintr-o pasiune un lifestyle",
  icons: {
    icon: ['/icon.ico']
  },
  manifest: '/site.webmanifest',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <UserProvider>
        <CartProvider>
          <FavoritesProvider>
            <html lang="en" suppressHydrationWarning={true}>
              <body suppressHydrationWarning={true} className={`${inter.className} bg-slate-50 dark:bg-[#09090B]`} >
                <NextSSRPlugin
                  routerConfig={extractRouterConfig(ourFileRouter)}
                />
                <Toaster />
                {children}
                {/* <ConsentBanner>
                  <CookieConsentBanner />
                </ConsentBanner> */}
              </body>
            </html>
          </FavoritesProvider>
        </CartProvider>
      </UserProvider>
    </SessionProvider >
  );
}
