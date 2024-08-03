import { AUTHOR_LIMIT } from "@/app/constants";
import { useQueryState } from "@/app/store/common";
import { ArxivEntry } from "@/app/types";
import { useState } from "react";
import { BiLinkExternal } from "react-icons/bi";
import Keywords from "react-keywords";

const Authors = ({ authors }: { authors: ArxivEntry["author"] }) => {
  const [showAll, setShowAll] = useState(false);
  const setSearchQuery = useQueryState((state) => state.setSearchQuery);
  const debouncedSearchQuery = useQueryState(
    (state) => state.debouncedSearchQuery
  );

  return (
    <div className="w-full text-center pb-4">
      <section className="flex flex-row justify-center flex-wrap gap-1">
        {authors
          .slice(0, showAll ? authors.length : AUTHOR_LIMIT)
          .map((author) => (
            <span
              key={author.name[0]}
              className="italic group hover:underline flex flex-row items-center gap-1 cursor-pointer"
              onClick={() => {
                setSearchQuery(`au:"${author.name[0]}"`);
              }}
            >
              <a
                href={`https://arxiv.org/search/?searchtype=author&query=${author.name[0]}`}
                target="_blank"
                rel="noreferrer"
                className="sm:text-[0px] group-hover:text-sm transition-all"
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
            className="font-bold font-mono ml-1.5 px-2 text-sm border border-zinc-200 bg-zinc-100 rounded-md"
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
