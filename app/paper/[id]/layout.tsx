"use client";

import { ReactNode, Suspense, useEffect, useState } from "react";
import { MathJaxContext } from "better-react-mathjax";
import { MATHJAX_CONFIG } from "@/app/lib/constants/mathjax";
import Loading from "./loading";
import { Button } from "@/components/ui/button";
import { LucideSunMoon } from "lucide-react";
import { useDarkMode } from "@/app/hooks/useDarkMode";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./error";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PapersLayout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) => {
  const router = useRouter();
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

  const navigateBackToSearch = (e: React.MouseEvent<HTMLAnchorElement>) => {
    router.push(`/?${lastSearchParams}`);
  };

  return (
    <MathJaxContext config={MATHJAX_CONFIG}>
      <div className="flex min-h-screen flex-col gap-4 px-0 sm:px-4">
        <header className="flex flex-row items-center justify-between font-mono">
          <Link
            href={`/?${lastSearchParams}`}
            as={`/?${lastSearchParams}`}
            onClick={navigateBackToSearch}
            className="text-zinc-400 sm:hover:text-arxiv-red sm:hover:underline dark:sm:hover:text-arxiv-red-light"
          >
            ← Back <span className="max-sm:hidden"> to search</span>
          </Link>
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
              className="w-fit select-none border-b border-zinc-300 bg-transparent text-center font-mono text-zinc-400 outline-none transition-all placeholder:italic placeholder:opacity-70 focus:border-zinc-500 dark:border-zinc-700/50 dark:text-zinc-400"
            />
          </form>
          <Button
            aria-label="Toggle dark theme"
            name="theme-toggle"
            variant="secondary"
            className="absolute bottom-3 right-2 z-40 h-10 w-10 border border-zinc-300 bg-white p-0 transition-colors sm:top-2 sm:hover:bg-zinc-100 dark:border-zinc-700/50 dark:bg-zinc-800 dark:sm:hover:bg-zinc-700"
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
