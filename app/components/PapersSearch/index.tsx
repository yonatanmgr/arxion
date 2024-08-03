import papersApi from "@/app/api/papers";
import { useQueryState } from "@/app/store/common";
import { CgSpinner } from "react-icons/cg";
import { useQuery } from "react-query";
import { useDebounceValue } from "usehooks-ts";
import ArxivPaper from "../Paper";
import { useEffect, useState } from "react";
import { Combobox } from "../ui/combobox";
import { CATEGORIES } from "@/app/categories";

const PapersSearch = () => {
  const [subject, setSubject] = useState("");
  const searchQuery = useQueryState((state) => state.searchQuery);
  const setSearchQuery = useQueryState((state) => state.setSearchQuery);
  const setDebouncedSearchQuery = useQueryState(
    (state) => state.setDebouncedSearchQuery
  );

  const debouncedSearchQuery = useDebounceValue(searchQuery, 300)[0];

  useEffect(() => {
    setDebouncedSearchQuery(debouncedSearchQuery);
  }, [setDebouncedSearchQuery, debouncedSearchQuery]);

  useEffect(() => {
    if (subject) {
      if (searchQuery.includes("AND")) {
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

  const allSubjects = CATEGORIES.map((category) =>
    category.subjects.map((subject) => ({
      ...subject,
      category: category.category,
    }))
  ).flat();

  const { data: papers, isFetching } = useQuery(
    ["arxiv", debouncedSearchQuery],
    async () => {
      if (debouncedSearchQuery) {
        const xml = await papersApi.fetchArxiv(debouncedSearchQuery, 25);
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

  const filteredPapers =
    papers?.filter((paper) => paper.category[0].$.term == subject) || [];

  return (
    <div className="flex font-cmu flex-col overflow-y-hidden max-sm:mb-3 max-h-[100dvh] gap-4">
      <section className="flex flex-col sm:flex-row w-full gap-2">
        <input
          className="p-2 sm:w-[calc(100%-200px)] border border-zinc-300 font-mono text-lg rounded-lg px-4 placeholder:italic"
          type="text"
          placeholder="Search arXiv papers..."
          autoFocus
          autoComplete="off"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Combobox
          value={subject}
          onChange={(value) => setSubject(value)}
          schema={allSubjects.map((subject) => ({
            value: subject.abbreviation,
            label: `${subject.abbreviation} (${subject.category}: ${subject.full_name})`,
          }))}
        />
      </section>
      {!debouncedSearchQuery && !isFetching && (
        <h2 className="font-mono text-zinc-500 select-none text-center">
          Results will appear here...
        </h2>
      )}
      {papers?.length && !isFetching ? (
        <h2 className="font-mono text-zinc-500">
          {filteredPapers.length < 25 ? (
            filteredPapers.length == 1 ? (
              <span>One result found</span>
            ) : (
              <span>Found {filteredPapers.length} results</span>
            )
          ) : (
            <span>Showing first 25 results</span>
          )}
        </h2>
      ) : (
        !isFetching &&
        debouncedSearchQuery !== "" && (
          <h2 className="font-mono text-zinc-500">No results found</h2>
        )
      )}
      {isFetching ? (
        <>
          <h2 className="font-mono text-zinc-500 flex flex-row gap-2 items-center">
            <CgSpinner className="animate-spin inline-block" />
            <span>Searching...</span>
          </h2>
          <ArxivPaper paper={null} />
        </>
      ) : (
        <section className="flex flex-col gap-4 grow overflow-y-auto snap-y snap-proximity">
          {filteredPapers.map((entry, index) => (
            <ArxivPaper paper={entry} key={index} />
          ))}
        </section>
      )}
    </div>
  );
};

export default PapersSearch;
