import papersApi from "@/app/api/papers";
import { useQueryState } from "@/app/store/common";
import { CgSpinner } from "react-icons/cg";
import { useQuery } from "react-query";
import { useDebounceValue } from "usehooks-ts";
import ArxivPaper from "../Paper";
import { useEffect, useState } from "react";
import { Combobox, ComboboxSchema, GroupedCombobox } from "../ui/combobox";
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
    (state) => state.setDebouncedSearchQuery,
  );

  const allSubjects = CATEGORIES.map((category) =>
    category.subjects.map((subject) => ({
      ...subject,
      category: category.category,
    })),
  ).flat();

  const debouncedSearchQuery = useDebounceValue(searchQuery, 300)[0];

  useEffect(() => {
    setDebouncedSearchQuery(debouncedSearchQuery);
    if (
      !allSubjects.some((subject) =>
        debouncedSearchQuery.startsWith("cat:" + subject.abbreviation),
      )
    ) {
      setSubject("");
    }
  }, [setDebouncedSearchQuery, debouncedSearchQuery, allSubjects]);

  useEffect(() => {
    if (subject) {
      if (searchQuery.includes("AND") || !searchQuery.startsWith("cat:")) {
        if (searchQuery.startsWith("cat:")) {
          setSearchQuery(`cat:${subject} AND${searchQuery.split("AND")[1]}`);
        } else if (searchQuery) {
          setSearchQuery(`cat:${subject} AND ${searchQuery}`);
        } else {
          setSearchQuery(`cat:${subject}`);
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
          page,
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
    },
  );

  useEffect(() => {
    if (debouncedSearchQuery) {
      setPage(0);
    }
  }, [debouncedSearchQuery]);

  // const filteredPapers = subject
  //   ? papers?.filter((paper) => paper.category[0].$.term == subject) ?? []
  //   : papers ?? [];

  const groupedSubjects = CATEGORIES.map((category) => ({
    label: category.category,
    options: [
      ...category.subjects.map((subject) => ({
        value: subject.abbreviation,
        label: `${subject.abbreviation} (${subject.full_name})`,
      })),
    ],
  }));

  return (
    <div className="flex max-h-[100dvh] flex-col gap-4 overflow-y-hidden font-cmu max-sm:mb-3">
      <section
        className={cn("flex w-full flex-col", showFilters ? "gap-2" : "")}
      >
        <section className="flex grow flex-row">
          <input
            className={cn(
              "mr-2 w-full rounded-lg border border-zinc-300 p-2 px-4 font-mono text-lg outline-none transition-colors placeholder:italic focus-within:border-zinc-400",
              "transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-300 dark:focus-within:border-zinc-500",
            )}
            type="text"
            placeholder="Search arXiv papers..."
            autoFocus
            autoComplete="off"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className={cn("max-sm:hidden", showFilters && "mr-2")}>
            {showFilters && (
              <GroupedCombobox
                value={subject}
                onChange={(value) => setSubject(value)}
                schema={groupedSubjects}
              />
            )}
          </div>
          <Button
            variant={"outline"}
            onClick={() => setShowFilters((prev) => !prev)}
            className={cn(
              "h-12 w-12 justify-between rounded-lg border border-zinc-300 px-3.5 font-mono text-base transition-colors hover:bg-zinc-100 active:bg-zinc-200",
              "dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-700",
              showFilters &&
                "bg-zinc-900 text-zinc-50 hover:bg-zinc-800 hover:text-zinc-100 active:bg-zinc-700 dark:bg-zinc-800",
            )}
          >
            <LucideFilter
              className={cn(
                "inline-block text-zinc-800 transition-colors dark:text-zinc-50",
                showFilters && "text-zinc-50",
              )}
            />
          </Button>
        </section>

        <div className="sm:hidden">
          {showFilters && (
            <GroupedCombobox
              value={subject}
              onChange={(value) => setSubject(value)}
              schema={groupedSubjects}
            />
          )}
        </div>
      </section>
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
          <h2 className="flex flex-row items-center gap-2 font-mono text-zinc-500">
            <CgSpinner className="inline-block animate-spin" />
            <span>Searching...</span>
          </h2>
        )}
        {debouncedSearchQuery && (
          <div className="flex flex-row gap-2">
            <Button
              variant={"outline"}
              onClick={() => setPage((prev) => prev - 1)}
              className="h-6 font-mono dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-700/50 dark:hover:text-zinc-50 dark:active:bg-zinc-700"
              disabled={page == 0 || !papers}
            >
              Prev
            </Button>
            <Button
              variant={"outline"}
              onClick={() => setPage((prev) => prev + 1)}
              className="h-6 font-mono dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-700/50 dark:hover:text-zinc-50 dark:active:bg-zinc-700"
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
        <section className="flex grow snap-y snap-proximity flex-col gap-4 overflow-y-auto">
          {papers?.map((entry, index) => (
            <ArxivPaper paper={entry} key={index} />
          ))}
        </section>
      )}
    </div>
  );
};

export default PapersSearch;
