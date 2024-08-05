import { ArxivEntry } from "@/app/types";
import { cn, findSubject } from "@/app/utils/common";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { ClassNameValue } from "tailwind-merge";
import { BiLinkExternal } from "react-icons/bi";
import { useState } from "react";
import { useClickAnyWhere, useMediaQuery } from "usehooks-ts";

const Tag = ({
  subject,
  className,
}: {
  subject: string;
  className?: ClassNameValue;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 500px)");
  useClickAnyWhere(() => {
    isOpen && setIsOpen(false);
  });
  const found = findSubject(subject);
  if (found) {
    const { category, full_name, description } = found;
    return (
      <Tooltip open={isSmallScreen ? isOpen : undefined} delayDuration={50}>
        <TooltipTrigger asChild>
          <span
            onTouchStart={() => setIsOpen(true)}
            className={cn(
              "select-none truncate max-sm:max-w-[140px]",
              className,
            )}
          >
            {subject}
          </span>
        </TooltipTrigger>
        <TooltipContent className="border-zinc-400 bg-zinc-900 text-zinc-50">
          <div className="flex max-h-[200px] max-w-96 flex-col gap-2 overflow-y-auto text-base max-sm:max-w-[calc(100dvw-50px)]">
            <a
              className={"italic text-zinc-50 underline"}
              href={`https://arxiv.org/list/${subject}/recent`}
              target="_blank"
              rel="noreferrer"
            >
              <BiLinkExternal className="inline" /> {category}: {full_name}
            </a>
            <span>{description}</span>
          </div>
        </TooltipContent>
      </Tooltip>
    );
  } else {
    return (
      <a
        className={cn(className)}
        href={`https://arxiv.org/list/${subject}/recent`}
        target="_blank"
        rel="noreferrer"
      >
        {subject}
      </a>
    );
  }
};

const Categories = ({
  categories,
  primaryCategory,
}: {
  categories: ArxivEntry["category"];
  primaryCategory: ArxivEntry["arxiv:primary_category"];
}) => (
  <section className="max-xs:text-sm group flex flex-row flex-wrap gap-1.5 sm:flex-row">
    {categories
      .slice(0, 2)
      .filter((category) => category.$.term !== primaryCategory[0].$.term)
      .reverse()
      .map((category) => (
        <Tag
          subject={category.$.term}
          key={category.$.term}
          className={cn(
            "pointer-events-none rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 font-mono text-sm text-zinc-800 transition-all hover:bg-zinc-100 active:scale-95 max-sm:hidden sm:scale-95 sm:opacity-0 sm:group-hover:pointer-events-auto sm:group-hover:scale-100 sm:group-hover:opacity-100",
            "dark:border-zinc-800 dark:bg-zinc-700/50 dark:text-zinc-50 dark:hover:bg-zinc-700",
          )}
        />
      ))}

    <Tag
      subject={primaryCategory[0].$.term}
      className={cn(
        "rounded-full border border-zinc-200 bg-zinc-800 px-2.5 py-0.5 font-mono text-sm text-zinc-50 transition-all hover:bg-zinc-700 active:scale-95",
        "dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-600",
      )}
    />
    {/* <Tooltip key={primaryCategory[0].$.term.toUpperCase()}>
      <TooltipTrigger>
        <a
          className="text-sm font-mono  transition-all active:scale-95 text-zinc-50 hover:bg-zinc-700 bg-zinc-800 border border-zinc-200 rounded-full px-2.5 py-0.5"
          key={primaryCategory[0].$.term}
          href={`https://arxiv.org/list/${primaryCategory[0].$.term}/recent`}
          target="_blank"
          rel="noreferrer"
        >
          {primaryCategory[0].$.term.toUpperCase()}
        </a>
      </TooltipTrigger>
      <TooltipContent>
        <div className="flex flex-col gap-2">
          <span>{findSubject(primaryCategory[0].$.term)?.category ?? ""}</span>
          <span>{findSubject(primaryCategory[0].$.term)?.full_name ?? ""}</span>
          <span>
            {findSubject(primaryCategory[0].$.term)?.description ?? ""}
          </span>
        </div>
      </TooltipContent>
    </Tooltip> */}
  </section>
);

export default Categories;
