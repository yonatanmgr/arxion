"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TArxivEntry } from "@/app/types";
import WithMathJax from "@/components/common/WithMathJax";
import PublishDate from "@/components/Paper/PublishDate";
import { useState } from "react";
import { AUTHOR_LIMIT } from "@/app/constants";
import { BiLinkExternal } from "react-icons/bi";
import { cn } from "@/app/utils/common";
import Link from "next/link";
import Links from "@/components/Paper/Links";

const PaperContent = ({ paper }: { paper: TArxivEntry }) => {
  const { author, id, published, updated, title, summary, link } = paper;
  const [showAllAuthors, setShowAllAuthors] = useState(false);

  const slicedAuthors = author.slice(
    0,
    showAllAuthors ? author.length : AUTHOR_LIMIT,
  );

  return (
    <AnimatePresence>
      <motion.main
        role="main"
        key={`paper-${id[0]}`}
        initial={{ opacity: 0, y: 10, filter: "blur(4px)", scale: 0.99 }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        exit={{ opacity: 0, y: 10, filter: "blur(4px)", scale: 0.99 }}
        transition={{ duration: 0.3 }}
        className="flex h-[calc(100dvh-9rem)] flex-col gap-4 overflow-y-auto font-serif max-sm:h-[calc(100dvh-6.5rem)]"
      >
        <header className="flex flex-col gap-4">
          <WithMathJax>
            <h1 className="text-balance text-2xl font-bold sm:text-3xl">
              {title[0]}
            </h1>
          </WithMathJax>
          <section className="flex w-full flex-row items-center gap-1 overflow-x-auto">
            {slicedAuthors.map((a) => (
              <>
                <Link
                  aria-label={`Search for papers by ${a.name[0]}`}
                  href={`https://arxiv.org/search/?searchtype=author&query=${a.name[0]}`}
                  target="_blank"
                  rel="noreferrer"
                  key={a.name[0]}
                  className="group min-w-fit cursor-pointer gap-1 break-words text-lg italic transition-colors"
                >
                  <BiLinkExternal className="sm:group-sm:hover:text-sm my-auto mb-1 inline-block opacity-50 transition-all sm:text-[0px]" />
                  <span className="group-sm:hover:ml-1.5 group-sm:hover:underline max-sm:ml-1.5">
                    {a.name[0]}
                  </span>
                </Link>
                {author.indexOf(a) !== author.length - 1 && (
                  <span className="pointer-events-none mx-2 font-bold no-underline opacity-50">
                    ·
                  </span>
                )}
              </>
            ))}
            {author.length > AUTHOR_LIMIT && (
              <button
                aria-label={
                  showAllAuthors
                    ? "- Show less..."
                    : `+ Show all ${author.length} authors`
                }
                className={cn(
                  "min-w-fit select-none rounded-lg border border-zinc-300/50 bg-zinc-200/50 px-2 py-1 font-mono text-zinc-500 active:scale-95 sm:hover:bg-zinc-200 dark:sm:hover:bg-zinc-800",
                  "transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400",
                  showAllAuthors && "ml-2",
                )}
                onClick={() => setShowAllAuthors((prev) => !prev)}
              >
                {showAllAuthors
                  ? "- Show less..."
                  : `+ Show all ${author.length} authors`}
              </button>
            )}
          </section>
          <span className="flex flex-row flex-wrap items-start justify-between gap-2 rounded-lg border-2 border-dashed border-zinc-300/50 bg-zinc-200/50 px-2 py-1 text-base transition-all sm:items-center dark:border-zinc-800 dark:bg-zinc-900">
            <section className="xs:flex-row xs:items-center flex flex-col gap-2">
              <PublishDate
                publishedOn={published[0]}
                updatedOn={updated[0]}
                variant="published"
              />
              {published[0] !== updated[0] && (
                <>
                  <span className="max-xs:hidden select-none opacity-50">
                    |
                  </span>
                  <PublishDate
                    publishedOn={published[0]}
                    updatedOn={updated[0]}
                    variant="updated"
                  />
                </>
              )}
            </section>
            {/* <Categories
              primaryCategory={paper["arxiv:primary_category"]}
              categories={paper["category"] || []}
              direction="rtl"
            /> */}
          </span>
        </header>
        <WithMathJax>
          <p className="text-pretty text-[18px]">{summary[0]}</p>
        </WithMathJax>
        <Links
          className="mb-8 w-full justify-start sm:justify-end"
          linkClassName="text-lg"
          arXivUrl={id[0]}
          links={link}
        />
      </motion.main>
    </AnimatePresence>
  );
};

export default PaperContent;
