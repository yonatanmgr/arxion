"use client";

import { QueryClientProvider, QueryClient } from "react-query";
import { useQueryState } from "./store/common";
import { MathJaxContext } from "better-react-mathjax";
import { MATHJAX_CONFIG } from "./constants";
import PapersSearch from "./components/PapersSearch";
import { LucideMoon, LucideSun, LucideSunMoon } from "lucide-react";
import { useEffect } from "react";
import { useDarkMode } from "@/app/hooks/useDarkMode";
import { Button } from "./components/ui/button";

const queryClient = new QueryClient();

const Home = () => {
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
      <header className="flex select-none flex-col items-center justify-center gap-2 max-sm:mb-2 max-sm:flex max-sm:flex-row max-sm:items-baseline max-sm:justify-between">
        <Button
          variant="secondary"
          className="absolute bottom-3 right-2 z-50 h-10 w-10 border border-zinc-300 bg-white p-0 transition-colors hover:bg-zinc-100 sm:top-2 dark:border-zinc-700/50 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          onClick={toggle}
        >
          <LucideSunMoon className="h-full text-xl text-zinc-800 dark:text-zinc-50" />
        </Button>
        <h1
          onClick={() => {
            useQueryState.setState({ searchQuery: "" });
          }}
          className="w-fit cursor-pointer text-center font-cmu text-4xl font-bold text-zinc-800 transition-colors hover:text-arxiv-red max-sm:text-2xl dark:text-zinc-50 dark:hover:text-red-500"
        >
          arXion
        </h1>
        <h2 className="text-center font-mono text-zinc-500 max-sm:text-sm sm:mb-4">
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
