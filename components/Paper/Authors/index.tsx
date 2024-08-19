import { AUTHOR_LIMIT } from "@/app/lib/constants/common";
import { TArxivEntry } from "@/app/types";
import { cn } from "@/app/lib/utils/common";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { BiLinkExternal } from "react-icons/bi";
import { NewButton } from "@/components/ui/new-button";
import { LucideUserMinus2, LucideUserPlus2 } from "lucide-react";

const Authors = ({ authors }: { authors: TArxivEntry["author"] }) => {
  const [showAll, setShowAll] = useState(false);
  const [, setSearchQuery] = useQueryState("query");

  return (
    <div className="w-full pb-4 text-center">
      <section className="flex flex-row flex-wrap justify-center gap-1">
        {authors
          .slice(0, showAll ? authors.length : AUTHOR_LIMIT)
          .map((author) => (
            <span
              key={author.name[0]}
              className="group flex cursor-pointer flex-row items-center gap-1 italic transition-colors sm:hover:underline"
              onClick={() => {
                setSearchQuery(`au:"${author.name[0]}"`);
              }}
            >
              <a
                aria-label={`Search for papers by ${author.name[0]}`}
                href={`https://arxiv.org/search/?searchtype=author&query=${author.name[0]}`}
                target="_blank"
                rel="noreferrer"
                className="transition-all sm:group-hover:text-sm sm:text-[0px]"
              >
                <BiLinkExternal className="inline-block" />
              </a>
              {author.name[0]}
              {authors.indexOf(author) !== authors.length - 1 ? "," : ""}
            </span>
          ))}
        {authors.length > AUTHOR_LIMIT && (
          <NewButton
            aria-label={
              showAll ? "Show less..." : `Show all ${authors.length} authors`
            }
            className={cn(
              "cursor-default text-sm shadow-none ml-2 dark:hover:bg-zinc-900/50 dark:active:bg-zinc-900/10  dark:active:border-zinc-700"
            )}
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? (
              <LucideUserMinus2 size={16} />
            ) : (
              <LucideUserPlus2 size={16} />
            )}
            {showAll ? "Show less..." : `Show all ${authors.length} authors`}
          </NewButton>
        )}
      </section>
    </div>
  );
};

export default Authors;
