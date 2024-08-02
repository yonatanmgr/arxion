"use client";

import papersApi from "./api/papers";

import { QueryClientProvider, QueryClient, useQuery } from "react-query";
import ArxivPaper from "./components/Paper";
import { CgSpinner } from "react-icons/cg";
import { QueryState } from "./store/common";
import { MathJaxContext } from "better-react-mathjax";
import { MATHJAX_CONFIG } from "./constants";

const queryClient = new QueryClient();

const Home = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MathJaxContext config={MATHJAX_CONFIG}>
        <Articles />
      </MathJaxContext>
    </QueryClientProvider>
  );
};

const Articles = () => {
  const searchQuery = QueryState((state) => state.searchQuery);
  const setSearchQuery = QueryState((state) => state.setSearchQuery);

  const { isLoading, data: papers } = useQuery(
    ["arxiv", searchQuery],
    async () => {
      if (searchQuery) {
        const xml = await papersApi.fetchArxiv(searchQuery, 25);
        return xml;
      }
    },
    {
      enabled: !!searchQuery,
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
      {!searchQuery && !isLoading && (
        <h2 className="font-mono text-zinc-500 select-none text-center">
          Results will appear here...
        </h2>
      )}
      {papers?.length ? (
        <h2 className="font-mono text-zinc-500">
          {papers.length < 25 ? (
            papers.length == 1 ? (
              <span>One result found</span>
            ) : (
              <span>Showing all {papers?.length} results</span>
            )
          ) : (
            <span>Showing first 25 results</span>
          )}
        </h2>
      ) : (
        !isLoading &&
        searchQuery && (
          <h2 className="font-mono text-zinc-500">No results found</h2>
        )
      )}
      {isLoading ? (
        <>
          <h2 className="font-mono text-zinc-500 flex flex-row gap-2 items-center">
            <CgSpinner className="animate-spin inline-block" />
            <span>Searching...</span>
          </h2>
          <ArxivPaper index={1} paper={null} />
        </>
      ) : (
        <section className="flex flex-col gap-4 grow overflow-y-auto snap-y snap-proximity">
          {papers?.map((entry, index) => (
            <ArxivPaper index={index + 1} paper={entry} key={index} />
          ))}
        </section>
      )}
    </div>
  );
};

export default Home;
