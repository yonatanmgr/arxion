import papersApi from "@/app/api/papers";
import { useQueryState } from "@/app/store/common";
import { CgSpinner } from "react-icons/cg";
import { useQuery } from "react-query";
import { useDebounceValue } from "usehooks-ts";
import ArxivPaper from "../Paper";

const PapersSearch = () => {
  const searchQuery = useQueryState((state) => state.searchQuery);
  const setSearchQuery = useQueryState((state) => state.setSearchQuery);

  const debouncedSearchQuery = useDebounceValue(searchQuery, 300)[0];

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

  return (
    <div className="flex font-cmu flex-col overflow-y-hidden max-sm:mb-3 max-h-[100dvh] gap-4">
      <input
        className="p-2 border border-zinc-300 font-mono text-lg rounded-lg px-4 placeholder:italic"
        type="text"
        placeholder="Search arXiv papers..."
        autoFocus
        autoComplete="off"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {!debouncedSearchQuery && !isFetching && (
        <h2 className="font-mono text-zinc-500 select-none text-center">
          Results will appear here...
        </h2>
      )}
      {papers?.length && !isFetching ? (
        <h2 className="font-mono text-zinc-500">
          {papers.length < 25 ? (
            papers.length == 1 ? (
              <span>One result found</span>
            ) : (
              <span>Found {papers?.length} results</span>
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
          {papers?.map((entry, index) => (
            <ArxivPaper paper={entry} key={index} />
          ))}
        </section>
      )}
    </div>
  );
};

export default PapersSearch;
