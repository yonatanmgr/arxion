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
import { LucideBookOpen } from "lucide-react";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { useQueryState } from "nuqs";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ArxivPaperProps {
  paper: TArxivEntry | null;
}

const ArxivPaper = ({ paper }: ArxivPaperProps) => {
  const [showAbstract, setShowAbstract] = useState(false);
  const [searchQuery] = useQueryState("query");
  const [page] = useQueryState("page");
  const router = useRouter();

  const [, setLastSearchParams] = useLocalStorage(
    "arxion:lastSearchParams",
    ""
  );

  if (!paper) {
    return <PaperPlaceholder />;
  }
  const paperId = paper.id[0].replace("http://arxiv.org/abs/", "");

  return (
    <Card>
      <header className="flex flex-row items-center justify-between w-full gap-2">
        <Link
          className="flex flex-row items-center gap-2 font-mono transition-all dark:text-zinc-400 text-zinc-500 sm:hover:text-arxiv-red sm:hover:underline max-sm:underline dark:sm:hover:text-arxiv-red-light"
          onClick={(e) => {
            e.preventDefault();
            const params = new URLSearchParams();
            params.set("query", searchQuery || "");
            params.set("page", page || "");
            setLastSearchParams(params.toString());
            router.replace(`/paper/${paperId.replace("/", "_")}`);
          }}
          href={`/paper/${paperId.replace("/", "_")}`}
        >
          <LucideBookOpen className="w-4 h-4" />
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

      <footer className="flex flex-col items-start justify-between w-full sm:flex-row sm:items-center">
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
