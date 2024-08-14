"use client";

import React, { useEffect } from "react";
import ArxivPaper from "../../Paper";
import { animate, AnimatePresence, stagger } from "framer-motion";
import { usePapers } from "@/app/hooks/usePapers";
import { useQueryState, parseAsInteger } from "nuqs";

const Results = () => {
  const [searchQuery] = useQueryState("query");
  const [page] = useQueryState("page", parseAsInteger);
  const safePage = page !== null ? page : 1;
  const { papers, totalResults, isFetching, error } = usePapers(
    searchQuery,
    safePage
  );

  useEffect(() => {
    papers !== undefined &&
      papers.length > 0 &&
      animate("li", { opacity: 1 }, { delay: stagger(0.1) });
  }, [papers]);

  if (isFetching == null) {
    return <ArxivPaper paper={null} />;
  }

  if (
    !papers &&
    (totalResults == 0 || totalResults !== (papers ?? []).length) &&
    !isFetching &&
    searchQuery
  ) {
    return (
      <div className="flex h-[66dvh] items-center justify-center rounded-md max-sm:h-[16dvh]">
        <p className="font-mono text-xl italic text-center select-none text-balance text-zinc-500/50 dark:text-zinc-400/50">
          No papers matched the query{" "}
          <span className="not-italic">&quot;{searchQuery}&quot;</span>
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[66dvh] items-center justify-center rounded-md max-sm:h-[16dvh]">
        <p className="font-mono text-xl italic text-center select-none text-balance text-zinc-500/50 dark:text-zinc-400/50">
          An error occurred while fetching papers. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <ul
        key={"papers-list"}
        className="flex flex-col gap-4 overflow-x-visible overflow-y-auto grow"
      >
        {papers?.map((entry) => <ArxivPaper paper={entry} key={entry.id[0]} />)}
      </ul>
    </AnimatePresence>
  );
};

export default Results;
