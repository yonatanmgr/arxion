import { useState } from "react";
import { TArxivEntry } from "@/app/types";
import Authors from "./Authors";
import Categories from "./Categories";
import Links from "./Links";
import Title from "./Title";
import PaperPlaceholder from "./Placeholder";
import Abstract from "./Abstract";
import Card from "../common/Card";
import PublishDate from "./PublishDate";
import { Link, useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "@/app/utils/animate";
import { LucideBookOpen } from "lucide-react";

interface ArxivPaperProps {
  paper: TArxivEntry | null;
}

const ArxivPaper = ({ paper }: ArxivPaperProps) => {
  const [showAbstract, setShowAbstract] = useState(false);
  const router = useTransitionRouter();

  if (!paper) {
    return <PaperPlaceholder />;
  }
  const paperId = paper.id[0].replace("http://arxiv.org/abs/", "");

  return (
    <Card>
      <header className="flex w-full flex-row items-center justify-between gap-2">
        <Link
          className="flex flex-row items-center gap-2 font-mono text-zinc-500 transition-all hover:text-arxiv-red hover:underline max-sm:underline dark:hover:text-arxiv-red-light"
          onClick={(e) => {
            e.preventDefault();
            router.push(`/paper/${paperId.replace("/", "_")}`, {
              onTransitionReady: slideInOut,
            });
          }}
          href={`/paper/${paperId.replace("/", "_")}`}
        >
          <LucideBookOpen className="h-4 w-4" />
          {paperId}
        </Link>
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
      <Abstract
        paperId={paper.id[0]}
        abstract={paper.summary[0]}
        showAbstract={showAbstract}
      />

      <footer className="flex w-full flex-col items-start justify-between sm:flex-row sm:items-center">
        <Links links={paper.link} arXivUrl={paper.id[0]} />
        <PublishDate
          publishedOn={paper.published[0]}
          updatedOn={paper.updated[0]}
        />
      </footer>
    </Card>
  );
};

export default ArxivPaper;
