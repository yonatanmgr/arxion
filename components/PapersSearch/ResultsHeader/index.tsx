import { RESULT_LIMIT } from "@/app/constants";
import { TArxivEntry } from "@/app/types";
import { cn } from "@/app/utils/common";
import React, { useEffect } from "react";
import { CgSpinner } from "react-icons/cg";
import Pagination from "../Pagination";
import { parseAsInteger, useQueryState } from "nuqs";
import AnimatedBlob from "@/components/AnimatedBlob";

interface ResultsHeaderProps {
  isFetching: boolean;
  papers: TArxivEntry[] | undefined;
  totalResults: number;
}

const ResultsHeader = ({
  isFetching,
  papers,
  totalResults,
}: ResultsHeaderProps) => {
  const [searchQuery] = useQueryState("query");
  const [page] = useQueryState("page", parseAsInteger);

  const safePage = page !== null ? page - 1 : 0;
  const showPagination = Boolean(
    isFetching || (searchQuery && papers && papers.length > 0)
  );

  return (
    <section
      className={cn(
        "flex flex-row justify-between",
        !searchQuery && "justify-center"
      )}
    >
      {!searchQuery && !isFetching && (
        <h2 className="select-none text-center font-mono text-zinc-500">
          Results will appear here...
        </h2>
      )}
      {papers?.length && !isFetching ? (
        <h2 className="font-mono text-zinc-500">
          {papers?.length < RESULT_LIMIT && page === 1 ? (
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
        !isFetching && searchQuery && <span></span>
      )}
      {isFetching && (
        <h2 className="flex select-none flex-row items-center gap-2 font-mono text-zinc-500">
          <CgSpinner className="inline-block animate-spin" />
          <span>Searching...</span>
        </h2>
      )}

      <AnimatedBlob
        className="fixed left-1/2 -translate-x-1/2 -translate-y-1/2 -top-0 scale-x-150 -z-50 scale-y-[0.04] sm:scale-x-[4] sm:scale-y-[0.06]"
        isVisible={isFetching}
      />
      {showPagination && (
        <Pagination
          isFetching={isFetching}
          papers={papers}
          totalResults={totalResults}
        />
      )}
    </section>
  );
};

export default ResultsHeader;
