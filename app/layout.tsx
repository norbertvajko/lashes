import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import React from "react";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { roRO } from '@clerk/localizations'
import { localization } from "@/data/clerk-localization";

const inter = Montserrat({ weight: "400", preload: false });

export const metadata: Metadata = {
  title: "LL Lashes",
  description: "Fa dintr-o pasiune un lifestyle",
  icons: {
    icon: ['/icon.ico']
  },
  manifest: '/site.webmanifest',
};

const roLocalization = {
  ...roRO,
  ...localization,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider localization={roLocalization} >
      <html lang="en" suppressHydrationWarning={true}>
        <body suppressHydrationWarning={true} className={`${inter.className}`} >
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
