import React from "react";
import { Button } from "../../ui/button";
import { LucideArrowLeft, LucideArrowRight } from "lucide-react";
import { RESULT_LIMIT } from "@/app/constants";
import { TArxivEntry } from "@/app/types";

interface PaginationProps {
  debouncedSearchQuery: string;
  isFetching: boolean;
  papers: TArxivEntry[] | undefined;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({
  debouncedSearchQuery,
  isFetching,
  papers,
  page,
  setPage,
}: PaginationProps) =>
  debouncedSearchQuery && (
    <div className="flex flex-row gap-2">
      <Button
        variant={"outline"}
        onClick={() => setPage((prev) => prev - 1)}
        className="h-6 w-12 px-3.5 font-mono dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-700/50 dark:hover:text-zinc-50 dark:active:bg-zinc-700"
        disabled={page === 0 || !papers || isFetching}
      >
        <LucideArrowLeft className="inline" />
      </Button>
      <Button
        variant={"outline"}
        onClick={() => setPage((prev) => prev + 1)}
        className="h-6 w-12 px-3.5 font-mono dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-700/50 dark:hover:text-zinc-50 dark:active:bg-zinc-700"
        disabled={!papers || papers.length < RESULT_LIMIT || isFetching}
      >
        <LucideArrowRight className="inline" />
      </Button>
    </div>
  );

export default Pagination;
