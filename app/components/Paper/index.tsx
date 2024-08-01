import { ArxivEntry } from "../../types";
import "katex/dist/katex.min.css";
import { BiLink, BiLinkExternal, BiPaperclip, BiTime } from "react-icons/bi";

import { useState } from "react";
import "katex/dist/katex.min.css";
import MarkdownBlock from "../Markdown";
import moment from "moment";
import { BsFilePdf } from "react-icons/bs";
import Authors from "./Authors";
import Categories from "./Categories";
import Links from "./Links";
import Title from "./Title";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/app/utils/common";

const ArxivPaper = ({
  paper,
  index,
}: {
  paper: ArxivEntry | null;
  index: number;
}) => {
  const Placeholder = ({ className }: { className: ClassNameValue }) => {
    return (
      <div
        className={cn(
          "bg-zinc-200 rounded-md animate-pulse w-full h-10",
          className
        )}
      ></div>
    );
  };

  const [showAbstract, setShowAbstract] = useState(false);

  if (paper === null) {
    return (
      <div className="flex opacity-100 bg-white sm:opacity-70 transition-all hover:opacity-100 font-cmu text-lg flex-col py-6 px-8 gap-2 border border-zinc-300 hover:border-red-600 rounded-lg text-left">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-2">
          <Placeholder className="w-40" />
          <Placeholder className="w-20 h-8" />
        </header>
        <Placeholder className="w-1/2 place-self-center mb-4" />
        <Placeholder className="w-1/4 place-self-center mb-4" />
        <Placeholder className="w-full h-40" />
        <footer className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between">
          <Placeholder className="w-40" />
          <Placeholder className="w-60" />
        </footer>{" "}
      </div>
    );
  }

  return (
    <div className="flex opacity-100 bg-white sm:opacity-70 transition-all hover:opacity-100 font-cmu sm:text-lg flex-col sm:py-6 py-4 sm:px-8 px-4 gap-2 border border-zinc-300 hover:border-red-600 rounded-lg text-left">
      <header className="flex flex-row justify-between items-center w-full gap-2">
        <div>
          <span className="text-zinc-500 font-mono">
            {paper.id[0].replace("http://arxiv.org/abs/", "")}
          </span>
        </div>

        <Categories
          primaryCategory={paper["arxiv:primary_category"]}
          categories={paper.category}
        />
      </header>
      <div onClick={() => setShowAbstract(!showAbstract)}>
        <Title title={paper.title[0]} />
      </div>
      <Authors authors={paper.author} />
      {showAbstract ? (
        <>
          <div className="text-zinc-900 select-none font-bold text-center w-full">
            Abstract.
          </div>
          <MarkdownBlock
            className={
              "text-balance sm:text-justify mb-4 break-words hyphens-auto place-self-center"
            }
            text={paper.summary[0]}
          />
        </>
      ) : (
        <div className="text-zinc-600 text-sm select-none text-center w-full pb-4">
          Click paper title to toggle abstract
        </div>
      )}
      <footer className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between">
        <Links links={paper.link} id={paper.id} />
        <div className="flex flex-row gap-1.5 items-center">
          <span className="text-zinc-500">
            <BiTime />
          </span>
          <span className="text-zinc-500">Published on:</span>{" "}
          <span>
            {moment(new Date(paper.published[0])).format("MMMM Do, YYYY")}
          </span>
        </div>
      </footer>
    </div>
  );
};

export default ArxivPaper;
