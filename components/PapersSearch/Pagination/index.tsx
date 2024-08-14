"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { LucideArrowLeft, LucideArrowRight } from "lucide-react";
import { RESULT_LIMIT } from "@/app/constants";
import { useQueryState, parseAsInteger } from "nuqs";
import { usePapers } from "@/app/hooks/usePapers";

const Pagination = () => {
  const [searchQuery] = useQueryState("query");
  const [page, setPage] = useQueryState("page", parseAsInteger);

  const safePage = page !== null ? page : 1;

  const { papers, totalResults, isFetching } = usePapers(searchQuery, safePage);

  const handlePagination = (direction: "prev" | "next") => {
    if (page !== null) {
      setPage(direction === "prev" ? page - 1 : page + 1);
    }
  };
  const isLastPage =
    ((page ?? 1) - 1) * RESULT_LIMIT + (papers ?? []).length >=
    (totalResults ?? 0);

  if (searchQuery) {
    return (
      <div className="flex flex-row gap-2">
        <Button
          aria-label="Previous page"
          variant={"outline"}
          onClick={() => handlePagination("prev")}
          className="h-6 w-12 border-zinc-300 px-3.5 font-mono dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-700/50 dark:hover:text-zinc-50 dark:active:bg-zinc-700"
          disabled={page === 1 || !papers || isFetching}
        >
          <LucideArrowLeft className="inline" />
        </Button>
        <Button
          aria-label="Next page"
          variant={"outline"}
          onClick={() => handlePagination("next")}
          className="h-6 w-12 border-zinc-300 px-3.5 font-mono dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-700/50 dark:hover:text-zinc-50 dark:active:bg-zinc-700"
          disabled={!papers || isLastPage || isFetching}
        >
          <LucideArrowRight className="inline" />
        </Button>
      </div>
    );
  }
};

export default Pagination;
