"use client";

import { QueryClientProvider, QueryClient } from "react-query";
import { MathJaxContext } from "better-react-mathjax";
import { MATHJAX_CONFIG } from "./constants";
import PapersSearch from "./components/PapersSearch";
import { LucideLibrary, LucideSunMoon } from "lucide-react";
import { useEffect } from "react";
import { useDarkMode } from "@/app/hooks/useDarkMode";
import { Button } from "./components/ui/button";
import { useQueryState } from "nuqs";
import { useMediaQuery } from "usehooks-ts";

const queryClient = new QueryClient();

const Home = () => {
  const [, setSearchQuery] = useQueryState("query");
  const [, setPage] = useQueryState("page");
  const isSmallViewport = useMediaQuery("(max-width: 639px)");

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
    <QueryClientProvider client={queryClient}>
      <header className="flex flex-col items-center justify-center gap-2 select-none max-sm:mb-2 max-sm:flex max-sm:flex-row max-sm:items-baseline max-sm:justify-between">
        <Button
          variant="secondary"
          className="absolute z-50 w-10 h-10 p-0 transition-colors bg-white border bottom-3 right-2 border-zinc-300 hover:bg-zinc-100 sm:top-2 dark:border-zinc-700/50 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          onClick={toggle}
        >
          <LucideSunMoon className="h-full text-xl text-zinc-800 dark:text-zinc-50" />
        </Button>
        <h1
          onClick={() => {
            setSearchQuery(null);
            setPage(null);
          }}
          className="flex flex-row items-center gap-1 text-4xl font-bold text-center transition-colors cursor-pointer w-fit font-cmu text-zinc-800 hover:text-arxiv-red max-sm:text-2xl dark:text-zinc-50 dark:hover:text-red-500"
        >
          arXion
          <LucideLibrary size={isSmallViewport ? 20 : 32} />
        </h1>
        <h2 className="font-mono text-center text-zinc-500 max-sm:text-sm sm:mb-4">
          a simple arXiv explorer
        </h2>
      </header>
      <MathJaxContext config={MATHJAX_CONFIG}>
        <PapersSearch />
      </MathJaxContext>
    </QueryClientProvider>
  );
};

export default Home;
