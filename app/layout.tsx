import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { useQueryState } from "./store/common";
import { TooltipProvider } from "@/app/components/ui/tooltip";

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
          className={
            "xl:px-64 lg:px-32 relative max-xs:px-8 px-4 pt-4 sm:pt-16 pb-[30px] overflow-hidden bg-zinc-50 flex flex-col h-[100dvh] selection:bg-arxiv-red/10"
          }
        >
          {children}
          <Analytics />
          <footer className="absolute left-0 bottom-0 text-xs sm:text-sm bg-zinc-100 py-1 select-none w-screen font-mono text-center text-balance text-zinc-500 border-t border-zinc-300">
            Thank you to arXiv for use of its open access interoperability.
          </footer>
        </body>
      </TooltipProvider>
    </html>
  );
}
