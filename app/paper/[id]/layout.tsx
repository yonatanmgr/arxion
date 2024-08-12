"use client";
import { ReactNode, Suspense, useEffect } from "react";
import { useTransitionRouter } from "next-view-transitions";
import { MathJaxContext } from "better-react-mathjax";
import { MATHJAX_CONFIG } from "@/app/constants";
import Loading from "./loading";
import { Button } from "@/components/ui/button";
import { LucideSunMoon } from "lucide-react";
import { useDarkMode } from "@/app/hooks/useDarkMode";

const PapersLayout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) => {
  const router = useTransitionRouter();
  const { isDarkMode, toggle } = useDarkMode({
    defaultValue: false,
    localStorageKey: "arxion:darkMode",
  });

  useEffect(() => {
    isDarkMode !== undefined &&
      document.documentElement.setAttribute(
        "data-theme",
        isDarkMode ? "dark" : "light",
      );
  }, [isDarkMode]);

  return (
    <MathJaxContext config={MATHJAX_CONFIG}>
      <div className="flex min-h-screen flex-col gap-4 px-0 sm:px-4">
        <header className="flex flex-row items-center justify-between font-mono">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
            className="text-zinc-500 hover:text-arxiv-red hover:underline dark:hover:text-arxiv-red-light"
          >
            ← Back to search...
          </a>
          <span className="select-none text-zinc-500">
            {params.id.replace("_", "/")}
          </span>
          <Button
            aria-label="Toggle dark theme"
            name="theme-toggle"
            variant="secondary"
            className="absolute bottom-3 right-2 z-50 h-10 w-10 border border-zinc-300 bg-white p-0 transition-colors hover:bg-zinc-100 sm:top-2 dark:border-zinc-700/50 dark:bg-zinc-800 dark:hover:bg-zinc-700"
            onClick={toggle}
          >
            <LucideSunMoon className="h-full text-xl text-zinc-800 dark:text-zinc-50" />
          </Button>
        </header>
        <main className="flex-grow">
          {/* <Loading /> */}
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </main>
      </div>
    </MathJaxContext>
  );
};

export default PapersLayout;
