import { AUTHOR_LIMIT } from "@/app/constants";
import { useQueryState } from "@/app/store/common";
import { TArxivEntry } from "@/app/types";
import { cn } from "@/app/utils/common";
import { useState } from "react";
import { BiLinkExternal } from "react-icons/bi";
import Keywords from "react-keywords";

const Authors = ({ authors }: { authors: TArxivEntry["author"] }) => {
  const [showAll, setShowAll] = useState(false);
  const setSearchQuery = useQueryState((state) => state.setSearchQuery);
  const debouncedSearchQuery = useQueryState(
    (state) => state.debouncedSearchQuery,
  );

  return (
    <div className="w-full pb-4 text-center">
      <section className="flex flex-row flex-wrap justify-center gap-1">
        {authors
          .slice(0, showAll ? authors.length : AUTHOR_LIMIT)
          .map((author) => (
            <span
              key={author.name[0]}
              className="group flex cursor-pointer flex-row items-center gap-1 italic transition-colors hover:underline"
              onClick={() => {
                setSearchQuery(`au:"${author.name[0]}"`);
              }}
            >
              <a
                href={`https://arxiv.org/search/?searchtype=author&query=${author.name[0]}`}
                target="_blank"
                rel="noreferrer"
                className="transition-all group-hover:text-sm sm:text-[0px]"
              >
                <BiLinkExternal className="inline-block" />
              </a>
              <Keywords
                color="#b31b1b"
                backgroundColor=""
                caseIgnored
                value={debouncedSearchQuery}
              >
                {author.name[0]}
                {authors.indexOf(author) !== authors.length - 1 ? "," : ""}
              </Keywords>
            </span>
          ))}
        {authors.length > AUTHOR_LIMIT && (
          <button
            className={cn(
              "ml-1.5 rounded-md border border-zinc-200 bg-zinc-100 px-2 font-mono text-sm font-bold",
              "transition-colors dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50",
            )}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show less..." : `Show all ${authors.length} authors`}
          </button>
        )}
      </section>
    </div>
  );
};

export default Authors;
