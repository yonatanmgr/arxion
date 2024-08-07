import { useState } from "react";
import { BiLinkExternal } from "react-icons/bi";
import { TArxivEntry } from "../../types";
import Authors from "./Authors";
import Categories from "./Categories";
import Links from "./Links";
import Title from "./Title";
import PaperPlaceholder from "./Placeholder";
import Abstract from "./Abstract";
import Card from "../common/Card";
import PublishDate from "./PublishDate";

interface ArxivPaperProps {
  paper: TArxivEntry | null;
}

const ArxivPaper = ({ paper }: ArxivPaperProps) => {
  const [showAbstract, setShowAbstract] = useState(false);

  if (!paper) {
    return <PaperPlaceholder />;
  }

  return (
    <Card>
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

      <Title
        title={paper.title[0]}
        showAbstract={showAbstract}
        setShowAbstract={setShowAbstract}
      />
      <Authors authors={paper.author} />
      <Abstract abstract={paper.summary[0]} showAbstract={showAbstract} />

      <footer className="flex w-full flex-col items-start justify-between sm:flex-row sm:items-center">
        <Links links={paper.link} />
        <PublishDate
          publishedOn={paper.published[0]}
          updatedOn={paper.updated[0]}
        />
      </footer>
    </Card>
  );
};

export default ArxivPaper;
