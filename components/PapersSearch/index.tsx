import Filters from "./Filters";
import ResultsHeader from "./ResultsHeader";
import Results from "./Results";

const PapersSearch = () => {
  return (
    <main
      role="main"
      className="flex max-h-[100dvh] flex-col gap-4 overflow-y-hidden font-serif max-sm:mb-3"
    >
      <Filters />
      <ResultsHeader />
      <Results />
    </main>
  );
};

export default PapersSearch;
