import { ArxivEntry } from "../../types";
import { BiLinkExternal, BiTime } from "react-icons/bi";
import { useState } from "react";
import MarkdownBlock from "./Markdown";
import moment from "moment";
import Authors from "./Authors";
import Categories from "./Categories";
import Links from "./Links";
import Title from "./Title";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/app/utils/common";
import { useLongPress } from "use-long-press";

const ArxivPaper = ({ paper }: { paper: ArxivEntry | null }) => {
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
  const [showUpdatedOn, setShowUpdatedOn] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const bind = useLongPress(
    () => {
      setShowAbstract(!showAbstract);
    },
    {
      onStart: (event) => setIsPressed(true),
      onFinish: (event) => setIsPressed(false),
      onCancel: (event) => setIsPressed(false),
      filterEvents: (event) => true,
      threshold: 500,
      cancelOnMovement: 25,
      cancelOutsideElement: true,
    }
  );

  if (paper === null) {
    return (
      <div className="flex opacity-100 bg-white sm:opacity-70 transition-all hover:opacity-100 font-cmu text-lg flex-col py-6 px-8 gap-2 border border-zinc-300 rounded-md text-left">
        <header className="flex flex-row justify-between items-center w-full gap-2 pb-4">
          <Placeholder className="w-2/5 sm:w-1/5 h-6" />
          <Placeholder className="w-20 h-6 rounded-full" />
        </header>
        <Placeholder className="w-full h-20 sm:h-10 sm:w-2/3 place-self-center mb-4" />
        <Placeholder className="w-1/2 place-self-center mb-4" />
        <Placeholder className="w-full sm:w-1/3 h-6 place-self-center" />
        <footer className="flex flex-col gap-2 sm:flex-row w-full items-start sm:items-center justify-between">
          <Placeholder className="w-1/4 h-6 sm:w-1/5" />
          <Placeholder className="w-full h-6 sm:w-1/5" />
        </footer>
      </div>
    );
  }

  return (
    <div className="flex last:mb-4 opacity-100 bg-white sm:opacity-70 transition-all hover:opacity-100 font-cmu sm:text-lg flex-col sm:py-6 py-4 sm:px-8 px-4 gap-2 border border-zinc-300 rounded-md text-left">
      <header className="flex flex-row justify-between items-center w-full gap-2">
        <a
          className="flex transition-all flex-row items-center gap-1.5 max-sm:underline text-zinc-500 hover:text-arxiv-red hover:underline font-mono"
          href={paper.id[0]}
          target="_blank"
          rel="noreferrer"
        >
          <BiLinkExternal />
          {paper.id[0].replace("http://arxiv.org/abs/", "")}
        </a>

        <Categories
          primaryCategory={paper["arxiv:primary_category"]}
          categories={paper.category}
        />
      </header>
      <button
        className={cn(
          "relative max-sm:select-none select-text border-b border-b-transparent hover:border-b-zinc-200 transition-all"
        )}
        {...bind()}
      >
        <div
          className={cn(
            "w-0 bg-zinc-400/50 opacity-50 absolute mix-blend-multiply bottom-0 h-[1px] rounded-lg transition-all duration-500",
            isPressed || showAbstract ? "w-full opacity-100" : "w-0"
          )}
        ></div>
        <div
          className={cn(
            "w-0 bg-zinc-500/50 z-10 opacity-50 absolute mix-blend-multiply bottom-0 h-[1px] rounded-lg transition-all duration-500",
            isPressed ? "w-full opacity-100" : "w-0"
          )}
        ></div>
        <Title title={paper.title[0]} />
      </button>
      <Authors authors={paper.author} />

      <>
        <div
          className={cn(
            "transition-all overflow-clip origin-top",
            showAbstract ? "scale-y-100 h-full" : "scale-y-0 h-0"
          )}
        >
          <div className="text-zinc-900 select-none font-bold text-center w-full">
            Abstract.
          </div>
          <MarkdownBlock
            className={
              "text-balance sm:text-justify break-words hyphens-auto place-self-center"
            }
            text={paper.summary[0]}
          />
        </div>

        <div
          className={cn(
            "transition-all text-pretty text-zinc-400 font-mono italic text-sm select-none text-center w-full",
            !showAbstract
              ? "scale-100 opacity-100 pb-4"
              : "scale-0 opacity-0 h-0"
          )}
        >
          <span className="max-sm:hidden">long-press</span>
          <span className="sm:hidden">Touch and hold</span> the title to view
          abstract
        </div>
      </>

      <footer className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between">
        <Links links={paper.link} id={paper.id} />
        <div
          className="flex flex-row gap-1.5 items-center"
          onClick={() => {
            setShowUpdatedOn(!showUpdatedOn);
          }}
        >
          <span className="text-zinc-500">
            <BiTime />
          </span>
          <span className="text-zinc-500 select-none cursor-pointer">
            {showUpdatedOn ? "Updated" : "Published"} on:
          </span>{" "}
          <span>
            {moment(
              new Date(paper[showUpdatedOn ? "updated" : "published"][0])
            ).format("MMMM Do, YYYY")}
          </span>
        </div>
      </footer>
    </div>
  );
};

export default ArxivPaper;
