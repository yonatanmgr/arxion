"use client";

import { QueryClientProvider, QueryClient } from "react-query";
import { useQueryState } from "./store/common";
import { MathJaxContext } from "better-react-mathjax";
import { MATHJAX_CONFIG } from "./constants";
import PapersSearch from "./components/PapersSearch";

const queryClient = new QueryClient();

const Home = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <header className="select-none flex items-center flex-col max-sm:flex max-sm:flex-row gap-2 max-sm:items-baseline max-sm:mb-2 justify-center max-sm:justify-between">
        <h1
          onClick={() => {
            useQueryState.setState({ searchQuery: "" });
          }}
          className="font-cmu hover:text-arxiv-red transition-all font-bold max-sm:text-2xl text-4xl w-fit text-center cursor-pointer"
        >
          arXion
        </h1>
        <h2 className="font-mono text-zinc-500 text-center sm:mb-4 max-sm:text-sm">
          A simple arXiv search engine
        </h2>
      </header>
      <MathJaxContext config={MATHJAX_CONFIG}>
        <PapersSearch />
      </MathJaxContext>
    </QueryClientProvider>
  );
};

export default Home;
