"use client";

import { useEnrichedPaper } from "@/app/hooks/usePapers";
import { AUTHOR_LIMIT } from "@/app/lib/constants/common";
import { cn } from "@/app/lib/utils/common";
import { TArxivEntry } from "@/app/types";
import AnimatedBlob from "@/components/AnimatedBlob";
import WithMathJax from "@/components/common/WithMathJax";
import Links from "@/components/Paper/Links";
import PublishDate from "@/components/Paper/PublishDate";
import { NewButton } from "@/components/ui/new-button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { AnimatePresence, motion } from "framer-motion";
import {
  LucideBot,
  LucideLoaderCircle,
  LucideScrollText,
  LucideUserMinus2,
  LucideUserPlus2,
  SquareArrowOutUpRight,
} from "lucide-react";
import Link from "next/link";
import { Fragment, useState } from "react";

const PaperContent = ({ paper }: { paper: TArxivEntry }) => {
  const { author, id, published, updated, title, summary, link } = paper;
  const [showAllAuthors, setShowAllAuthors] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [showTldr, setShowTldr] = useState(true);

  const { data, isLoading, error } = useEnrichedPaper(
    id[0].replace("http://arxiv.org/abs/", "").replace(/v\d+/, ""),
    shouldFetch,
  );

  const slicedAuthors = author.slice(
    0,
    showAllAuthors ? author.length : AUTHOR_LIMIT,
  );

  return (
    <AnimatePresence>
      <motion.main
        role="main"
        key={`paper-${id[0]}`}
        initial={{ opacity: 0, y: 10, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.99 }}
        transition={{ duration: 0.3 }}
        className="flex h-[calc(100dvh-9rem)] flex-col gap-4 overflow-y-auto font-serif max-sm:h-[calc(100dvh-6.5rem)]"
      >
        <header className="flex flex-col gap-4">
          <section className="flex w-full flex-row gap-2 overflow-x-auto">
            <Tooltip>
              <TooltipTrigger asChild>
                <NewButton
                  className="cursor-default"
                  disabled={
                    isLoading ||
                    (data && (data[0].tldr || !("tldr" in data[0]))) ||
                    error
                  }
                  onClick={() => {
                    setShouldFetch(true);
                  }}
                >
                  {isLoading ? (
                    <LucideLoaderCircle size={16} className="animate-spin" />
                  ) : (
                    <LucideBot size={16} />
                  )}
                  {isLoading
                    ? "Summarizing..."
                    : data
                      ? "tldr" in data[0]
                        ? "Summarized"
                        : "Could not summarize"
                      : "Summarize"}
                </NewButton>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <span className="text-sm text-zinc-500">
                  Tries to create a summary of the abstract using Semantic
                  Scholar's API
                </span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <NewButton className="cursor-default" asChild>
                  <Link
                    href={
                      link
                        .find((l) => l.$.title === "pdf")
                        ?.$.href.replace("arxiv", "ar5iv") || ""
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LucideScrollText size={16} />
                    Read Paper
                  </Link>
                </NewButton>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <span className="text-sm text-zinc-500">
                  Opens the HTML version of this paper on{" "}
                  <Link className="underline" href="https://ar5iv.org">
                    ar5iv.org
                  </Link>
                </span>
              </TooltipContent>
            </Tooltip>
            {published[0] !== updated[0] && (
              <NewButton
                className="pointer-events-none cursor-default"
                disabled={false}
                onClick={() => {
                  setShouldFetch(true);
                }}
              >
                <PublishDate
                  publishedOn={published[0]}
                  updatedOn={updated[0]}
                  variant="updated"
                />
              </NewButton>
            )}
            <NewButton
              className="pointer-events-none cursor-default"
              disabled={false}
              onClick={() => {
                setShouldFetch(true);
              }}
            >
              <PublishDate
                publishedOn={published[0]}
                updatedOn={updated[0]}
                variant="published"
              />
            </NewButton>
          </section>
          <WithMathJax>
            <h1 className="text-balance text-2xl font-bold sm:text-3xl">
              {title[0]}
            </h1>
          </WithMathJax>
          <section className="flex w-full flex-row items-center gap-1 overflow-x-auto">
            {slicedAuthors.map((a) => (
              <Fragment key={a.name[0]}>
                <Link
                  aria-label={`Search for papers by ${a.name[0]}`}
                  href={`https://arxiv.org/search/?searchtype=author&query=${a.name[0]}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group min-w-fit cursor-pointer gap-1 break-words text-lg italic transition-colors"
                >
                  <SquareArrowOutUpRight className="my-auto mb-1 inline-block w-4 opacity-50 transition-all sm:w-0 sm:group-hover:w-4" />
                  <span className="max-sm:ml-1.5 sm:group-hover:ml-1.5 sm:group-hover:underline">
                    {a.name[0]}
                  </span>
                </Link>
                {author.indexOf(a) !== author.length - 1 && (
                  <span className="pointer-events-none mx-2 font-bold no-underline opacity-50">
                    ·
                  </span>
                )}
              </Fragment>
            ))}
            {author.length > AUTHOR_LIMIT && (
              <NewButton
                aria-label={
                  showAllAuthors
                    ? "Show less..."
                    : `Show all ${author.length} authors`
                }
                className={cn("cursor-default", showAllAuthors && "ml-2")}
                onClick={() => setShowAllAuthors((prev) => !prev)}
              >
                {showAllAuthors ? (
                  <LucideUserMinus2 size={16} />
                ) : (
                  <LucideUserPlus2 size={16} />
                )}
                {showAllAuthors
                  ? "Show less..."
                  : `Show all ${author.length} authors`}
              </NewButton>
            )}
          </section>
        </header>

        <motion.article
          role="article"
          key={`paper-article-${id[0]}`}
          initial={{ opacity: 0, y: 10, filter: "blur(4px)", scale: 0.99 }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, y: 10, filter: "blur(4px)", scale: 0.99 }}
          transition={{ duration: 0.3 }}
          className="flex h-[calc(100dvh-9rem)] flex-col gap-4 overflow-y-auto overflow-x-hidden font-serif max-sm:h-[calc(100dvh-6.5rem)]"
        >
          {!error &&
            !isLoading &&
            data &&
            data[0].tldr &&
            data[0].tldr.length > 0 && (
              <section className="flex flex-col rounded-lg border bg-zinc-200/50 transition-colors dark:border-zinc-700 dark:bg-zinc-700/50">
                <h2
                  onClick={() => {
                    setShowTldr(!showTldr);
                  }}
                  className={cn(
                    "flex w-full cursor-pointer flex-row items-center gap-3 text-pretty px-4 py-3 font-mono text-lg font-bold active:bg-zinc-300 sm:hover:bg-zinc-200",
                    showTldr ? "rounded-t-lg" : "rounded-lg",
                    "transition-colors dark:active:bg-zinc-700 sm:dark:hover:bg-zinc-700/50",
                  )}
                >
                  <AnimatedBlob
                    isVisible={true}
                    className="mb-7 ml-1 mr-8 h-0 w-0 scale-[0.1] dark:mb-5 dark:scale-[0.08]"
                  />
                  <div className="my-auto flex select-none flex-col opacity-70">
                    <span className="h-5 font-bold leading-5">AI Summary</span>
                    <span className="h-4 text-sm opacity-80">
                      using Semantic Scholar API
                    </span>
                  </div>
                </h2>
                <AnimatePresence>
                  {showTldr && (
                    <WithMathJax>
                      <motion.p
                        key={`tldr-${id[0]}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.1 }}
                        className="overflow-hidden text-pretty px-4 pb-3 pt-2 text-[18px]"
                      >
                        {data[0].tldr}
                      </motion.p>
                    </WithMathJax>
                  )}
                </AnimatePresence>
              </section>
            )}
          <WithMathJax>
            <p className="text-pretty text-[18px]">{summary[0]}</p>
          </WithMathJax>
          <Links
            className="mb-8 w-full justify-start sm:justify-end"
            linkClassName="text-lg"
            arXivUrl={id[0]}
            links={link}
          />
        </motion.article>
      </motion.main>
    </AnimatePresence>
  );
};

export default PaperContent;
