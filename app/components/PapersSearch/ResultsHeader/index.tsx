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
  totalResults: number;
}

const ResultsHeader = ({
  debouncedSearchQuery,
  isFetching,
  papers,
  totalResults,
}: ResultsHeaderProps) => {
  const [page] = useQueryState("page", parseAsInteger);

  const safePage = page !== null ? page - 1 : 0;
  const showPagination = Boolean(
    isFetching || (debouncedSearchQuery && papers && papers.length > 0),
  );

  return (
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
              Results {safePage * RESULT_LIMIT + 1}-{totalResults}
            </span>
          ) : (
            <span>
              Results {safePage * RESULT_LIMIT + 1}-
              {(safePage + 1) * papers.length} of {totalResults}
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

      {showPagination && (
        <Pagination
          debouncedSearchQuery={debouncedSearchQuery}
          isFetching={isFetching}
          papers={papers}
          totalResults={totalResults}
        />
      )}
    </section>
  );
};

export default ResultsHeader;
