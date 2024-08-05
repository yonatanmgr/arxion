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
          "h-10 w-full animate-pulse rounded-md bg-zinc-200",
          "dark:bg-zinc-700",
          className,
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
    },
  );

  if (paper === null) {
    return (
      <div
        className={cn(
          "flex flex-col gap-2 rounded-md border border-zinc-300 bg-white px-4 py-4 text-left font-cmu opacity-100 transition-all last:mb-4 hover:opacity-100 sm:px-8 sm:py-6 sm:text-lg sm:opacity-70",
          "dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:opacity-100",
        )}
      >
        <header className="flex w-full flex-row items-center justify-between gap-2 pb-4">
          <Placeholder className="h-6 w-2/5 sm:w-1/5" />
          <Placeholder className="h-6 w-20 rounded-full" />
        </header>
        <Placeholder className="mb-4 h-20 w-full place-self-center sm:h-10 sm:w-2/3" />
        <Placeholder className="mb-4 w-1/2 place-self-center" />
        <Placeholder className="h-6 w-full place-self-center sm:w-1/3" />
        <footer className="flex w-full flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <Placeholder className="h-6 w-1/4 sm:w-1/5" />
          <Placeholder className="h-6 w-full sm:w-1/5" />
        </footer>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-md border border-zinc-300 bg-white px-4 py-4 text-left font-cmu opacity-100 transition-all last:mb-4 hover:opacity-100 sm:px-8 sm:py-6 sm:text-lg sm:opacity-70",
        "dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:opacity-100",
      )}
    >
      <header className="flex w-full flex-row items-center justify-between gap-2">
        <a
          className="flex flex-row items-center gap-1.5 font-mono text-zinc-500 transition-all hover:text-arxiv-red hover:underline max-sm:underline dark:hover:text-arxiv-red-light"
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
          "relative select-text border-b border-b-transparent transition-all hover:border-b-zinc-200 max-sm:select-none",
          "dark:hover:border-b-zinc-700",
        )}
        {...bind()}
      >
        <div
          className={cn(
            "absolute bottom-0 h-[1px] w-0 rounded-lg bg-zinc-400/50 opacity-50 transition-all duration-500",
            isPressed || showAbstract ? "w-full opacity-100" : "w-0",
          )}
        ></div>
        <div
          className={cn(
            "absolute bottom-0 z-10 h-[1px] w-0 rounded-lg bg-zinc-500/50 opacity-50 transition-all duration-500",
            isPressed ? "w-full opacity-100" : "w-0",
          )}
        ></div>
        <Title title={paper.title[0]} />
      </button>
      <Authors authors={paper.author} />

      <>
        <div
          className={cn(
            "origin-top overflow-clip transition-all",
            showAbstract ? "h-full scale-y-100" : "h-0 scale-y-0",
          )}
        >
          <div className="w-full select-none text-center font-bold text-zinc-900 transition-colors dark:text-zinc-50">
            Abstract.
          </div>
          <MarkdownBlock
            className={
              "place-self-center hyphens-auto text-balance break-words text-zinc-900 sm:text-justify dark:text-zinc-50"
            }
            text={paper.summary[0]}
          />
        </div>

        <div
          className={cn(
            "w-full select-none text-pretty text-center font-mono text-sm italic text-zinc-400 transition-all",
            !showAbstract
              ? "scale-100 pb-4 opacity-100"
              : "h-0 scale-0 opacity-0",
          )}
        >
          <span className="max-sm:hidden">long-press</span>
          <span className="sm:hidden">Touch and hold</span> the title to view
          abstract
        </div>
      </>

      <footer className="flex w-full flex-col items-start justify-between sm:flex-row sm:items-center">
        <Links links={paper.link} id={paper.id} />
        <div
          className="flex flex-row items-center gap-1.5"
          onClick={() => {
            setShowUpdatedOn(!showUpdatedOn);
          }}
        >
          <span className="text-zinc-500">
            <BiTime />
          </span>
          <span className="cursor-pointer select-none text-zinc-500">
            {showUpdatedOn ? "Updated" : "Published"} on:
          </span>{" "}
          <span>
            {moment(
              new Date(paper[showUpdatedOn ? "updated" : "published"][0]),
            ).format("MMMM Do, YYYY")}
          </span>
        </div>
      </footer>
    </div>
  );
};

export default ArxivPaper;
