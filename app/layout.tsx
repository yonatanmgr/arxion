import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";

// VERCEL
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VercelToolbar } from "@vercel/toolbar/next";

// PROVIDERS
import { TooltipProvider } from "@/components/ui/tooltip";
import { ViewTransitions } from "next-view-transitions";

// FONTS
import { cn } from "@/app/lib/utils/common";
import localFont from "next/font/local";
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
  display: "swap",
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
  display: "swap",
});

// METADATA
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
        url: "opengraph-image.png",
        width: 800,
        height: 600,
        alt: "arXion",
      },
    ],
  },
  metadataBase: new URL("https://arxion.vercel.app/"),
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  const shouldInjectToolbar = process.env.NODE_ENV === "development";

  return (
    <html
      lang="en"
      className={`${computerModern.variable} ${computerTypewriter.variable}`}
    >
      <ViewTransitions>
        <TooltipProvider>
          <body className="relative flex h-[100dvh] flex-col overflow-hidden bg-zinc-50 px-4 pb-[30px] pt-4 text-zinc-900 transition-all selection:bg-arxiv-red/10 sm:pt-16 lg:px-32 xl:px-64 dark:bg-zinc-950 dark:text-zinc-50 dark:selection:bg-arxiv-red-light/20">
            <Suspense>
              {children}
              {shouldInjectToolbar && <VercelToolbar />}
              <Analytics />
              <SpeedInsights />
              <footer
                role="contentinfo"
                className={cn(
                  "absolute bottom-0 left-0 w-screen select-none text-balance border-t border-zinc-300 bg-zinc-100 py-1 text-center font-mono text-xs text-zinc-500 transition-colors sm:text-sm dark:border-zinc-700 dark:bg-zinc-800",
                )}
              >
                Thank you to arXiv for use of its open access interoperability.
              </footer>
              {shouldInjectToolbar && (
                <div className="fixed -bottom-[39px] left-0 h-10 w-full select-none border-8 border-dashed border-yellow-400 bg-transparent font-mono sm:-left-10 sm:top-0 sm:w-40 sm:-rotate-[40deg]">
                  DEV DEV DEV DEV
                </div>
              )}
            </Suspense>
          </body>
        </TooltipProvider>
      </ViewTransitions>
    </html>
  );
}
