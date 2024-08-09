import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { TooltipProvider } from "@/app/components/ui/tooltip";
import { Suspense } from "react";
import { cn } from "./utils/common";
import { SpeedInsights } from "@vercel/speed-insights/next";
import localFont from "next/font/local";
import { VercelToolbar } from "@vercel/toolbar/next";

const computerModern = localFont({
  src: [
    {
      path: "./fonts/cmunrm.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/cmunti.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/cmunbx.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/cmunbi.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-computer-modern",
});

const computerTypewriter = localFont({
  src: [
    {
      path: "./fonts/cmuntt.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/cmunit.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/cmuntb.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/cmuntx.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-computer-typewriter",
});

export const metadata: Metadata = {
  title: "arXion",
  description: "A simple arXiv explorer",
  applicationName: "arXion",
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
        url: "og-image.png",
        width: 800,
        height: 600,
        alt: "arXion",
      },
    ],
  },
  metadataBase: new URL("https://arxion.vercel.app/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const shouldInjectToolbar = process.env.NODE_ENV === "development";

  return (
    <html
      lang="en"
      className={`${computerModern.variable} ${computerTypewriter.variable}`}
    >
      <TooltipProvider>
        <body
          className={cn(
            "max-xs:px-8 relative flex h-[100dvh] flex-col overflow-hidden px-4 pb-[30px] pt-4 selection:bg-arxiv-red/10 sm:pt-16 lg:px-32 xl:px-64 dark:selection:bg-arxiv-red-light/20",
            "bg-zinc-50 text-zinc-950 transition-colors dark:bg-zinc-950 dark:text-zinc-50",
          )}
        >
          <Suspense>{children}</Suspense>
          {shouldInjectToolbar && <VercelToolbar />}
          <Analytics />
          <SpeedInsights />
          <footer
            role="contentinfo"
            className="absolute bottom-0 left-0 w-screen select-none text-balance border-t border-zinc-300 bg-zinc-100 py-1 text-center font-mono text-xs text-zinc-500 transition-colors sm:text-sm dark:border-zinc-700 dark:bg-zinc-800"
          >
            Thank you to arXiv for use of its open access interoperability.
          </footer>
        </body>
      </TooltipProvider>
    </html>
  );
}
