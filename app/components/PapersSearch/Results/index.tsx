import React, { useEffect } from "react";
import { TArxivEntry } from "@/app/types";
import ArxivPaper from "../../Paper";
import { animate, AnimatePresence, stagger } from "framer-motion";

interface ResultsProps {
  papers: TArxivEntry[] | undefined;
}

const Results = ({ papers }: ResultsProps) => {
  useEffect(() => {
    papers !== undefined &&
      papers.length > 0 &&
      animate("li", { opacity: 1 }, { delay: stagger(0.1) });
  }, [papers]);

  return (
    <section className="flex grow flex-col gap-4 overflow-y-auto">
      <AnimatePresence>
        {papers?.map((entry, index) => (
          <ArxivPaper paper={entry} key={index} />
        ))}
      </AnimatePresence>
    </section>
  );
};

export default Results;
