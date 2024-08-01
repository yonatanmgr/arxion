import { ArxivEntry } from "@/app/types";
import { useState } from "react";

const Authors = ({ authors }: { authors: ArxivEntry["author"] }) => {
  const [showAll, setShowAll] = useState(false);
  const LIMIT = 5;
  return (
    <div className="w-full text-center pb-4">
      <section className="flex flex-row justify-center flex-wrap gap-1">
        {authors.slice(0, showAll ? authors.length : LIMIT).map((author) => (
          <a
            className="italic hover:underline"
            key={author.name[0]}
            href={`https://arxiv.org/search/?searchtype=author&query=${author.name[0]}`}
            target="_blank"
            rel="noreferrer"
          >
            {author.name[0]}
            {authors.indexOf(author) !== authors.length - 1 ? "," : ""}
          </a>
        ))}
        {authors.length > LIMIT && (
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
