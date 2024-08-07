import React from "react";
import { TArxivEntry } from "@/app/types";
import ArxivPaper from "../../Paper";

interface ResultsProps {
  papers: TArxivEntry[] | undefined;
}

const Results = ({ papers }: ResultsProps) => (
  <section className="flex grow snap-y snap-proximity flex-col gap-4 overflow-y-auto">
    {papers?.map((entry, index) => <ArxivPaper paper={entry} key={index} />)}
  </section>
);

export default Results;
