import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { TooltipProvider } from "@/app/components/ui/tooltip";
import { Suspense } from "react";
import { cn } from "./utils/common";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "arXion",
  description: "A simple arXiv explorer",
  applicationName: "arXion",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arxion.vercel.app/",
    siteName: "arXion",
    title: "arXion",
    description: "A simple arXiv explorer",
    images: [
      {
        url: "https://github.com/user-attachments/assets/0febb239-f635-4b31-93ee-eb02a2b9c3bb",
        width: 800,
        height: 600,
        alt: "arXion",
      },
    ],
  },
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
            "max-xs:px-8 relative flex h-[100dvh] flex-col overflow-hidden px-4 pb-[30px] pt-4 selection:bg-arxiv-red/10 sm:pt-16 lg:px-32 xl:px-64 dark:selection:bg-arxiv-red-light/20",
            "bg-zinc-50 text-zinc-950 transition-colors dark:bg-zinc-950 dark:text-zinc-50",
          )}
        >
          <Suspense>{children}</Suspense>
          <Analytics />
          <SpeedInsights />
          <footer className="absolute bottom-0 left-0 w-screen select-none text-balance border-t border-zinc-300 bg-zinc-100 py-1 text-center font-mono text-xs text-zinc-400 transition-colors sm:text-sm dark:border-zinc-700 dark:bg-zinc-800">
            Thank you to arXiv for use of its open access interoperability.
          </footer>
        </body>
      </TooltipProvider>
    </html>
  );
}
