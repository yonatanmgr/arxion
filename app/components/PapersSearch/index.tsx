import { useState, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { useDebounceValue } from "usehooks-ts";

import papersApi from "@/app/api/papers";
import { useCurrentQueryState } from "@/app/store/common";
import { CATEGORIES } from "@/app/categories";
import { RESULT_LIMIT } from "@/app/constants";

import ArxivPaper from "../Paper";

import Filters from "./Filters";
import ResultsHeader from "./ResultsHeader";
import Results from "./Results";
import { flattenCategories, buildGroupedSubjects } from "@/app/utils/common";
import { parseAsInteger, useQueryState } from "nuqs";

const PapersSearch = () => {
  const [subject, setSubject] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [page] = useQueryState("page", parseAsInteger);
  const safePage = page !== null ? page : 1;

  const [searchQuery, setSearchQuery] = useQueryState("query");
  const setDebouncedSearchQuery = useCurrentQueryState(
    (state) => state.setDebouncedSearchQuery,
  );

  const allSubjects = useMemo(() => flattenCategories(CATEGORIES), []);
  const groupedSubjects = useMemo(() => buildGroupedSubjects(CATEGORIES), []);

  const debouncedSearchQuery = useDebounceValue(searchQuery, 300)[0];

  useEffect(() => {
    setDebouncedSearchQuery(debouncedSearchQuery);
    if (
      !allSubjects.some((subject) =>
        debouncedSearchQuery?.startsWith(`cat:${subject.abbreviation}`),
      )
    ) {
      setSubject("");
    }
  }, [debouncedSearchQuery, allSubjects, setDebouncedSearchQuery]);

  useEffect(() => {
    if (!subject) return;

    let newQuery = `cat:${subject}`;
    if (searchQuery?.includes("AND") || !searchQuery?.startsWith("cat:")) {
      newQuery = searchQuery?.startsWith("cat:")
        ? `cat:${subject} AND${searchQuery.split("AND")[1]}`
        : `cat:${subject} AND ${searchQuery}`;
    }

    setSearchQuery(newQuery);
  }, [subject, searchQuery, setSearchQuery]);

  const { data: papers, isFetching } = useQuery(
    ["arxiv", debouncedSearchQuery, safePage],
    async () => {
      if (debouncedSearchQuery && safePage) {
        return await papersApi.fetchArxiv(
          debouncedSearchQuery,
          RESULT_LIMIT,
          safePage - 1,
        );
      }
    },
    {
      enabled: !!debouncedSearchQuery,
      retry: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  return (
    <div className="flex max-h-[100dvh] flex-col gap-4 overflow-y-hidden font-cmu max-sm:mb-3">
      <Filters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        subject={subject}
        setSubject={setSubject}
        groupedSubjects={groupedSubjects}
      />

      <ResultsHeader
        debouncedSearchQuery={debouncedSearchQuery}
        isFetching={isFetching}
        papers={papers}
      />
      {!papers && !isFetching && debouncedSearchQuery && (
        <div className="flex h-[66dvh] items-center justify-center rounded-md max-sm:h-[90dvh]">
          <p className="font-mono text-xl italic text-center select-none text-balance text-zinc-500/50 dark:text-zinc-400/50">
            No papers matched the query{" "}
            <span className="not-italic">&quot;{searchQuery}&quot;</span>
          </p>
        </div>
      )}
      {isFetching ? <ArxivPaper paper={null} /> : <Results papers={papers} />}
    </div>
  );
};

export default PapersSearch;
