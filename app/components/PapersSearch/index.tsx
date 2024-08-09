import { useState, useEffect, useMemo } from "react";
import { useQuery } from "react-query";

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

  const fetchArxiv = async (
    query: string | null,
    limit: number,
    page: number,
  ) => {
    if (
      query &&
      ["AND", "OR", "NOT"].every((operator) => !query.endsWith(operator)) &&
      page
    ) {
      return await papersApi.fetchArxiv(query, limit, page - 1);
    }
  };

  useEffect(() => {
    setDebouncedSearchQuery(searchQuery);
    if (
      !allSubjects.some((subject) =>
        searchQuery?.startsWith(`cat:${subject.abbreviation}`),
      )
    ) {
      setSubject("");
    }
  }, [searchQuery, allSubjects, setDebouncedSearchQuery]);

  // when we choose a subject, prefix the search query with the subject abbreviation
  useEffect(() => {
    if (subject) {
      // if the query is empty, just set the subject
      if (!searchQuery) {
        setSearchQuery(`cat:${subject}`);
      } else {
        // if the query is not empty, add the subject to the query
        if (searchQuery?.startsWith(`cat:`)) {
          // split the query by AND and replace the first part with a new subject
          const [, ...rest] = searchQuery.split("AND");
          if (rest.length === 0) {
            setSearchQuery(`cat:${subject}`);
          } else setSearchQuery(`cat:${subject} AND${rest.join("AND")}`);
        } else {
          setSearchQuery(`cat:${subject} AND ${searchQuery}`);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject, setSearchQuery]);

  const { data, isFetching } = useQuery(
    ["arxiv", searchQuery, safePage],
    () => fetchArxiv(searchQuery, RESULT_LIMIT, safePage),
    {
      enabled: !!searchQuery,
      retry: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  return (
    <div className="font-serif flex max-h-[100dvh] flex-col gap-4 overflow-y-hidden max-sm:mb-3">
      <Filters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        subject={subject}
        setSubject={setSubject}
        groupedSubjects={groupedSubjects}
        isFetching={isFetching}
      />

      <ResultsHeader
        debouncedSearchQuery={searchQuery}
        isFetching={isFetching}
        papers={data?.papers}
        totalResults={data?.totalResults ?? 0}
      />
      {!data?.papers &&
        (data?.totalResults == 0 ||
          data?.totalResults !== (data?.papers ?? []).length) &&
        !isFetching &&
        searchQuery && (
          <div className="flex h-[66dvh] items-center justify-center rounded-md max-sm:h-[16dvh]">
            <p className="select-none text-balance text-center font-mono text-xl italic text-zinc-500/50 dark:text-zinc-400/50">
              No papers matched the query{" "}
              <span className="not-italic">&quot;{searchQuery}&quot;</span>
            </p>
          </div>
        )}
      {isFetching ? (
        <ArxivPaper paper={null} />
      ) : (
        <Results papers={data?.papers} />
      )}
    </div>
  );
};

export default PapersSearch;
