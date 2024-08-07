import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { useCurrentQueryState } from "./store/common";
import { TooltipProvider } from "@/app/components/ui/tooltip";
import { Button } from "./components/ui/button";
import { LucideSunMoon } from "lucide-react";
import { useDarkMode } from "usehooks-ts";
import { Suspense, useEffect } from "react";
import { cn } from "./utils/common";

export const metadata: Metadata = {
  title: "arXion",
  description: "A simple arXiv search engine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TooltipProvider>
        <body
          className={cn(
            "max-xs:px-8 relative flex h-[100dvh] flex-col overflow-hidden px-4 pb-[30px] pt-4 selection:bg-arxiv-red/10 sm:pt-16 lg:px-32 xl:px-64",
            "bg-zinc-50 text-zinc-950 transition-colors dark:bg-zinc-950 dark:text-zinc-50",
          )}
        >
          <Suspense>{children}</Suspense>
          <Analytics />
          <footer className="absolute bottom-0 left-0 w-screen py-1 font-mono text-xs text-center transition-colors border-t select-none text-balance border-zinc-300 bg-zinc-100 text-zinc-400 sm:text-sm dark:border-zinc-700 dark:bg-zinc-800">
            Thank you to arXiv for use of its open access interoperability.
          </footer>
        </body>
      </TooltipProvider>
    </html>
  );
}
