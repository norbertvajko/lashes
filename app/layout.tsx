import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import React from "react";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { roRO } from '@clerk/localizations'

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

  return (
    <ClerkProvider localization={roRO}>
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
    </ClerkProvider>
  );
}
