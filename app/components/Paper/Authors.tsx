import { AUTHOR_LIMIT } from "@/app/constants";
import { QueryState } from "@/app/store/common";
import { ArxivEntry } from "@/app/types";
import { useState } from "react";
import { BiLinkExternal } from "react-icons/bi";

const Authors = ({ authors }: { authors: ArxivEntry["author"] }) => {
  const [showAll, setShowAll] = useState(false);
  const setSearchQuery = QueryState((state) => state.setSearchQuery);

  return (
    <div className="w-full text-center pb-4">
      <section className="flex flex-row justify-center flex-wrap gap-1">
        {authors
          .slice(0, showAll ? authors.length : AUTHOR_LIMIT)
          .map((author) => (
            <span
              className="italic group hover:underline flex flex-row items-center gap-1 cursor-pointer"
              key={author.name[0]}
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
              {author.name[0]}
              {authors.indexOf(author) !== authors.length - 1 ? "," : ""}
            </span>
          ))}
        {authors.length > AUTHOR_LIMIT && (
          <button
            className="font-bold ml-1.5 px-2 py-1 text-sm bg-zinc-200 rounded-md"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show less" : "Show all"}
          </button>
        )}
      </section>
    </div>
  );
};

export default Authors;
