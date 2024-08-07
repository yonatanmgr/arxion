import { RESULT_LIMIT } from "@/app/constants";
import { TArxivEntry } from "@/app/types";
import { cn } from "@/app/utils/common";
import React from "react";
import { CgSpinner } from "react-icons/cg";
import Pagination from "../Pagination";

interface ResultsHeaderProps {
  debouncedSearchQuery: string;
  isFetching: boolean;
  papers: TArxivEntry[] | undefined;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const ResultsHeader = ({
  debouncedSearchQuery,
  isFetching,
  papers,
  page,
  setPage,
}: ResultsHeaderProps) => (
  <section
    className={cn(
      "flex flex-row justify-between",
      !debouncedSearchQuery && "justify-center",
    )}
  >
    {!debouncedSearchQuery && !isFetching && (
      <h2 className="select-none text-center font-mono text-zinc-500">
        Results will appear here...
      </h2>
    )}
    {papers?.length && !isFetching ? (
      <h2 className="font-mono text-zinc-500">
        {papers?.length < RESULT_LIMIT && page === 0 ? (
          papers?.length === 1 ? (
            <span>One result found</span>
          ) : (
            <span>Found {papers?.length} results</span>
          )
        ) : papers?.length < RESULT_LIMIT ? (
          <span>
            Showing results {page * RESULT_LIMIT + 1}-
            {page * RESULT_LIMIT + papers?.length}
          </span>
        ) : (
          <span>
            Showing results {page * RESULT_LIMIT + 1}-
            {(page + 1) * papers.length}
          </span>
        )}
      </h2>
    ) : (
      !isFetching &&
      debouncedSearchQuery !== "" && (
        <h2 className="font-mono text-zinc-500">No results found</h2>
      )
    )}
    {isFetching && (
      <h2 className="flex flex-row items-center gap-2 font-mono text-zinc-500">
        <CgSpinner className="inline-block animate-spin" />
        <span>Searching...</span>
      </h2>
    )}

    <Pagination
      debouncedSearchQuery={debouncedSearchQuery}
      isFetching={isFetching}
      papers={papers}
      page={page}
      setPage={setPage}
    />
  </section>
);

export default ResultsHeader;
