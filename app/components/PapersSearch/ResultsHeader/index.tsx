import { RESULT_LIMIT } from "@/app/constants";
import { TArxivEntry } from "@/app/types";
import { cn } from "@/app/utils/common";
import React from "react";
import { CgSpinner } from "react-icons/cg";
import Pagination from "../Pagination";
import { parseAsInteger, useQueryState } from "nuqs";

interface ResultsHeaderProps {
  debouncedSearchQuery: string | null;
  isFetching: boolean;
  papers: TArxivEntry[] | undefined;
}

const ResultsHeader = ({
  debouncedSearchQuery,
  isFetching,
  papers,
}: ResultsHeaderProps) => {
  const [page] = useQueryState("page", parseAsInteger);

  const safePage = page !== null ? page - 1 : 0;

  return (
    <section
      className={cn(
        "flex flex-row justify-between",
        !debouncedSearchQuery && "justify-center",
      )}
    >
      {!debouncedSearchQuery && !isFetching && (
        <h2 className="font-mono text-center select-none text-zinc-500">
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
              Showing results {safePage * RESULT_LIMIT + 1}-
              {safePage * RESULT_LIMIT + papers?.length}
            </span>
          ) : (
            <span>
              Showing results {safePage * RESULT_LIMIT + 1}-
              {(safePage + 1) * papers.length}
            </span>
          )}
        </h2>
      ) : (
        !isFetching && debouncedSearchQuery && <span></span>
      )}
      {isFetching && (
        <h2 className="flex flex-row items-center gap-2 font-mono text-zinc-500">
          <CgSpinner className="inline-block animate-spin" />
          <span>Searching...</span>
        </h2>
      )}

      {papers && papers.length > 0 && (
        <Pagination
          debouncedSearchQuery={debouncedSearchQuery}
          isFetching={isFetching}
          papers={papers}
        />
      )}
    </section>
  );
};

export default ResultsHeader;
