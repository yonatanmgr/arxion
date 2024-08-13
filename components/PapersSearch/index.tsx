import { useState, useEffect, useMemo } from "react";
import { useQuery } from "react-query";

import papersApi from "@/app/api/papers";
import { CATEGORIES } from "@/app/categories";
import { RESULT_LIMIT } from "@/app/constants";

import ArxivPaper from "../Paper";

import Filters from "./Filters";
import ResultsHeader from "./ResultsHeader";
import Results from "./Results";
import { buildGroupedSubjects } from "@/app/utils/categories";
import { parseAsInteger, useQueryState } from "nuqs";
import { usePapersStore } from "@/app/state/papers-store";

const PapersSearch = () => {
  const [subject, setSubject] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useQueryState("query");
  const [page] = useQueryState("page", parseAsInteger);
  const { setPapers } = usePapersStore();

  const safePage = page !== null ? page : 1;
  const groupedSubjects = useMemo(() => buildGroupedSubjects(CATEGORIES), []);

  const fetchQueryResult = async (
    query: string | null,
    limit: number,
    page: number
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
    if (subject) {
      if (!searchQuery) {
        setSearchQuery(`cat:${subject}`);
      } else {
        if (searchQuery?.startsWith(`cat:`)) {
          const [, ...rest] = searchQuery.split("AND");
          if (rest.length === 0) {
            setSearchQuery(`cat:${subject}`);
          } else setSearchQuery(`cat:${subject} AND${rest.join("AND")}`);
        } else {
          setSearchQuery(`cat:${subject} AND ${searchQuery}`);
        }
      }
    }
  }, [subject, setSearchQuery]);

  const { data, isFetching, isFetched } = useQuery(
    ["arxiv", searchQuery, safePage],
    () => fetchQueryResult(searchQuery, RESULT_LIMIT, safePage),
    {
      enabled: !!searchQuery,
      retry: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (isFetched) {
      setPapers(data?.papers ?? []);
    }
  }, [isFetched]);

  return (
    <main
      role="main"
      className="flex max-h-[100dvh] flex-col gap-4 overflow-y-hidden font-serif max-sm:mb-3"
    >
      <Filters
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        subject={subject}
        setSubject={setSubject}
        groupedSubjects={groupedSubjects}
        isFetching={isFetching}
      />

      <ResultsHeader
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
    </main>
  );
};

export default PapersSearch;
