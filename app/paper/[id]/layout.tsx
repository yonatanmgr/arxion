"use client";

import { ReactNode, Suspense, useEffect, useState } from "react";
import { Link, useTransitionRouter } from "next-view-transitions";
import { MathJaxContext } from "better-react-mathjax";
import { MATHJAX_CONFIG } from "@/app/constants";
import Loading from "./loading";
import { Button } from "@/components/ui/button";
import { LucideSunMoon } from "lucide-react";
import { useDarkMode } from "@/app/hooks/useDarkMode";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./error";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";

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

  const [localSearchQuery, setLocalSearchQuery] = useState(
    params.id.replace("_", "/"),
  );

  useEffect(() => {
    if (params.id) {
      setLocalSearchQuery(params.id.replace("_", "/"));
    }
  }, [params.id]);

  const [lastSearchParams] = useLocalStorage("arxion:lastSearchParams", "");
  const { query, page } = Object.fromEntries(
    new URLSearchParams(lastSearchParams),
  );

  const navigateBackToSearch = (e: React.MouseEvent<HTMLAnchorElement>) => {
    router.push(`/?${lastSearchParams}`);
  };

  return (
    <MathJaxContext config={MATHJAX_CONFIG}>
      <div className="flex flex-col min-h-screen gap-4 px-0 sm:px-4">
        <header className="flex flex-row items-center justify-between font-mono">
          <Suspense>
            <Link
              href={`/?${lastSearchParams}`}
              as={`/?${lastSearchParams}`}
              onClick={navigateBackToSearch}
              className="text-zinc-400 hover:text-arxiv-red hover:underline dark:hover:text-arxiv-red-light"
            >
              ← Back <span className="max-sm:hidden"> to search</span>
            </Link>
          </Suspense>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.replace(localSearchQuery.replace("/", "_"));
            }}
          >
            <input
              aria-label="Search for a paper"
              placeholder="Paper ID"
              value={localSearchQuery}
              type="text"
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              className="font-mono text-center transition-all bg-transparent border-b outline-none select-none w-fit border-zinc-300 text-zinc-400 placeholder:italic placeholder:opacity-70 focus:border-zinc-500 dark:border-zinc-700/50 dark:text-zinc-400"
            />
          </form>
          <Button
            aria-label="Toggle dark theme"
            name="theme-toggle"
            variant="secondary"
            className="absolute z-40 w-10 h-10 p-0 transition-colors bg-white border bottom-3 right-2 border-zinc-300 hover:bg-zinc-100 sm:top-2 dark:border-zinc-700/50 dark:bg-zinc-800 dark:hover:bg-zinc-700"
            onClick={toggle}
          >
            <LucideSunMoon className="h-full text-xl text-zinc-800 dark:text-zinc-50" />
          </Button>
        </header>
        <main className="flex-grow">
          {/* <Loading /> */}
          <ErrorBoundary errorComponent={Error}>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </MathJaxContext>
  );
};

export default PapersLayout;
