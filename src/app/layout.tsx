import "~/styles/globals.css";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { type Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "sonner";
import { extractRouterConfig } from "uploadthing/server";
import { ThemeProvider } from "~/components/theme-provider";
import { cn } from "~/lib/utils";
import { TRPCReactProvider } from "~/trpc/react";
import TopNav from "./_components/top-nav";
import { ourFileRouter } from "./api/uploadthing/core";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "PromoteThing | Promote yourself",
  description:
    "Created by abderrahmen, a platform to help promote your next big thing!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen w-full bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <TopNav />
            {children}
            <Toaster />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
