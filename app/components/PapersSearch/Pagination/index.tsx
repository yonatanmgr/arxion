import React from "react";
import { Button } from "../../ui/button";
import { LucideArrowLeft, LucideArrowRight } from "lucide-react";
import { RESULT_LIMIT } from "@/app/constants";
import { TArxivEntry } from "@/app/types";
import { useQueryState, parseAsInteger } from "nuqs";

interface PaginationProps {
  debouncedSearchQuery: string | null;
  isFetching: boolean;
  papers: TArxivEntry[] | undefined;
}

const Pagination = ({
  debouncedSearchQuery,
  isFetching,
  papers,
}: PaginationProps) => {
  const [page, setPage] = useQueryState("page", parseAsInteger);

  const handlePagination = (direction: "prev" | "next") => {
    if (page !== null) {
      setPage(direction === "prev" ? page - 1 : page + 1);
    }
  };

  if (debouncedSearchQuery) {
    return (
      <div className="flex flex-row gap-2">
        <Button
          variant={"outline"}
          onClick={() => handlePagination("prev")}
          className="h-6 w-12 px-3.5 font-mono dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-700/50 dark:hover:text-zinc-50 dark:active:bg-zinc-700"
          disabled={page === 1 || !papers || isFetching}
        >
          <LucideArrowLeft className="inline" />
        </Button>
        <Button
          variant={"outline"}
          onClick={() => handlePagination("next")}
          className="h-6 w-12 px-3.5 font-mono dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-700/50 dark:hover:text-zinc-50 dark:active:bg-zinc-700"
          disabled={!papers || papers.length < RESULT_LIMIT || isFetching}
        >
          <LucideArrowRight className="inline" />
        </Button>
      </div>
    );
  }
};

export default Pagination;
