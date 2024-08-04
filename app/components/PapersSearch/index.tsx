import papersApi from "@/app/api/papers";
import { useQueryState } from "@/app/store/common";
import { CgSpinner } from "react-icons/cg";
import { useQuery } from "react-query";
import { useDebounceValue } from "usehooks-ts";
import ArxivPaper from "../Paper";
import { useEffect, useState } from "react";
import { Combobox } from "../ui/combobox";
import { CATEGORIES } from "@/app/categories";
import { Button } from "../ui/button";
import { cn } from "@/app/utils/common";
import { LucideFilter } from "lucide-react";
import { RESULT_LIMIT } from "@/app/constants";

const PapersSearch = () => {
  const [subject, setSubject] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(0);
  const searchQuery = useQueryState((state) => state.searchQuery);
  const setSearchQuery = useQueryState((state) => state.setSearchQuery);
  const setDebouncedSearchQuery = useQueryState(
    (state) => state.setDebouncedSearchQuery
  );

  const allSubjects = CATEGORIES.map((category) =>
    category.subjects.map((subject) => ({
      ...subject,
      category: category.category,
    }))
  ).flat();

  const debouncedSearchQuery = useDebounceValue(searchQuery, 300)[0];

  useEffect(() => {
    setDebouncedSearchQuery(debouncedSearchQuery);
    if (
      !allSubjects.some((subject) =>
        debouncedSearchQuery.startsWith("cat:" + subject.abbreviation)
      )
    ) {
      setSubject("");
    }
  }, [setDebouncedSearchQuery, debouncedSearchQuery]);

  useEffect(() => {
    if (subject) {
      if (searchQuery.includes("AND") || !searchQuery.startsWith("cat:")) {
        if (searchQuery.startsWith("cat:")) {
          setSearchQuery(`cat:${subject} AND${searchQuery.split("AND")[1]}`);
        } else {
          setSearchQuery(`cat:${subject} AND ${searchQuery}`);
        }
      } else {
        setSearchQuery(`cat:${subject}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSearchQuery, subject]);

  const { data: papers, isFetching } = useQuery(
    ["arxiv", debouncedSearchQuery, page],
    async () => {
      if (debouncedSearchQuery) {
        const xml = await papersApi.fetchArxiv(
          debouncedSearchQuery,
          RESULT_LIMIT,
          page
        );
        return xml;
      }
    },
    {
      enabled: !!debouncedSearchQuery,
      retry: 0,
      //   keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (debouncedSearchQuery) {
      setPage(0);
    }
  }, [debouncedSearchQuery]);

  // const filteredPapers = subject
  //   ? papers?.filter((paper) => paper.category[0].$.term == subject) ?? []
  //   : papers ?? [];

  return (
    <div className="flex font-cmu flex-col overflow-y-hidden max-sm:mb-3 max-h-[100dvh] gap-4">
      <section
        className={cn("flex flex-col w-full", showFilters ? "gap-2" : "")}
      >
        <section className="flex flex-row grow">
          <input
            className="p-2 w-full mr-2 border border-zinc-300 font-mono text-lg rounded-lg px-4 placeholder:italic"
            type="text"
            placeholder="Search arXiv papers..."
            autoFocus
            autoComplete="off"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className={cn("max-sm:hidden", showFilters && "mr-2")}>
            {showFilters && (
              <Combobox
                value={subject}
                onChange={(value) => setSubject(value)}
                schema={allSubjects.map((subject) => ({
                  value: subject.abbreviation,
                  label: `${subject.abbreviation} (${subject.category}: ${subject.full_name})`,
                }))}
              />
            )}
          </div>
          <Button
            variant={"outline"}
            onClick={() => setShowFilters((prev) => !prev)}
            className={cn(
              "w-12 h-12 text-base transition-all active:bg-zinc-200 hover:bg-zinc-100 justify-between font-mono border border-zinc-300 rounded-lg px-4",
              showFilters
                ? "bg-zinc-900 text-zinc-50 hover:bg-zinc-800 hover:text-zinc-100 active:bg-zinc-700"
                : ""
            )}
          >
            <LucideFilter className="inline-block" />
          </Button>
        </section>

        <div className="sm:hidden">
          {showFilters && (
            <Combobox
              value={subject}
              onChange={(value) => setSubject(value)}
              schema={allSubjects.map((subject) => ({
                value: subject.abbreviation,
                label: `${subject.abbreviation} (${subject.category}: ${subject.full_name})`,
              }))}
            />
          )}
        </div>
      </section>
      <section
        className={cn(
          "flex flex-row justify-between",
          !debouncedSearchQuery && "justify-center"
        )}
      >
        {!debouncedSearchQuery && !isFetching && (
          <h2 className="font-mono text-zinc-500 select-none text-center">
            Results will appear here...
          </h2>
        )}
        {papers?.length && !isFetching ? (
          <h2 className="font-mono text-zinc-500">
            {papers?.length < RESULT_LIMIT ? (
              papers?.length == 1 ? (
                <span>One result found</span>
              ) : (
                <span>Found {papers?.length} results</span>
              )
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
          <h2 className="font-mono text-zinc-500 flex flex-row gap-2 items-center">
            <CgSpinner className="animate-spin inline-block" />
            <span>Searching...</span>
          </h2>
        )}
        {debouncedSearchQuery && (
          <div className="flex flex-row gap-2">
            <Button
              variant={"outline"}
              onClick={() => setPage((prev) => prev - 1)}
              className="font-mono h-6"
              disabled={page == 0 || !papers}
            >
              Prev
            </Button>
            <Button
              variant={"outline"}
              onClick={() => setPage((prev) => prev + 1)}
              className="font-mono h-6"
              disabled={!papers || papers.length < RESULT_LIMIT}
            >
              Next
            </Button>
          </div>
        )}
      </section>

      {isFetching ? (
        <ArxivPaper paper={null} />
      ) : (
        <section className="flex flex-col gap-4 grow overflow-y-auto snap-y snap-proximity">
          {papers?.map((entry, index) => (
            <ArxivPaper paper={entry} key={index} />
          ))}
        </section>
      )}
    </div>
  );
};

export default PapersSearch;
