import Filters from "./Filters";
import ResultsHeader from "./ResultsHeader";
import Results from "./Results";
import { Suspense } from "react";

const PapersSearch = () => {
  return (
    <main
      role="main"
      className="flex max-h-[100dvh] flex-col gap-4 overflow-y-hidden font-serif max-sm:mb-3"
    >
      <Filters />
      <ResultsHeader />
      <Suspense>
        <Results />
      </Suspense>
    </main>
  );
};

export default PapersSearch;
