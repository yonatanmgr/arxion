import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

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
      <body
        className={
          "xl:px-64 lg:px-32 relative max-xs:px-8 px-4 pt-8 sm:pt-16 pb-12 overflow-hidden bg-zinc-50 flex flex-col h-[100dvh]"
        }
      >
        <header className="select-none flex flex-col max-sm:flex max-sm:flex-row gap-2 max-sm:items-baseline max-sm:mb-2 justify-center max-sm:justify-between">
          <a
            href="/"
            className="font-cmu font-bold max-sm:text-2xl text-4xl sm:mb-2 text-center"
          >
            arXion
          </a>
          <h2 className="font-mono text-zinc-500 text-center sm:mb-4 max-sm:text-sm">
            A simple arXiv search engine
          </h2>
        </header>

        {children}
        <Analytics />
        <footer className="absolute left-0 bottom-0 text-xs sm:text-sm bg-zinc-100 py-1 select-none w-screen font-mono text-center text-balance text-zinc-500 border-t border-zinc-300">
          Thank you to arXiv for use of its open access interoperability.
        </footer>
      </body>
    </html>
  );
}
