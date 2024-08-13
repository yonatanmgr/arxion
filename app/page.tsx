"use client";

import { QueryClientProvider, QueryClient } from "react-query";
import { MathJaxContext } from "better-react-mathjax";
import { MATHJAX_CONFIG } from "./constants";
import PapersSearch from "@/components/PapersSearch";
import { LucideSunMoon } from "lucide-react";
import { useEffect } from "react";
import { useDarkMode } from "@/app/hooks/useDarkMode";
import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";
import { cn } from "./utils/common";
import Logo from "@/components/Logo";
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const Home = () => {
  const [searchQuery, setSearchQuery] = useQueryState("query");
  const [, setPage] = useQueryState("page");

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
      <MathJaxContext config={MATHJAX_CONFIG}>
        <AnimatePresence>
          <header
            key={"page-header"}
            className="flex select-none flex-col items-center justify-center gap-2 max-sm:mb-2 max-sm:flex max-sm:flex-row max-sm:items-center max-sm:justify-between"
          >
            <Button
              aria-label="Toggle dark theme"
              name="theme-toggle"
              variant="secondary"
              className="absolute bottom-3 right-2 z-40 h-10 w-10 border border-zinc-300 bg-white p-0 transition-colors hover:bg-zinc-100 sm:top-2 dark:border-zinc-700/50 dark:bg-zinc-800 dark:hover:bg-zinc-700"
              onClick={toggle}
            >
              <LucideSunMoon className="h-full text-xl text-zinc-800 dark:text-zinc-50" />
            </Button>
            <Logo
              className={cn(
                !searchQuery && "pointer-events-none",
                "max-sm:scale-90",
              )}
              onClick={() => {
                setSearchQuery(null);
                setPage(null);
              }}
            />
            <h2 className="text-center font-mono text-zinc-500 max-sm:text-sm sm:mb-4">
              a simple arXiv explorer
            </h2>
          </header>
          <PapersSearch key={"papers-search"} />
        </AnimatePresence>
      </MathJaxContext>
    </QueryClientProvider>
  );
};

export default Home;
