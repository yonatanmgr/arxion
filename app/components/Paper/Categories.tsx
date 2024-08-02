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
              "select-none max-sm:max-w-[140px] truncate",
              className
            )}
          >
            {subject}
          </span>
        </TooltipTrigger>
        <TooltipContent className="bg-zinc-50 border-zinc-400">
          <div className="flex flex-col gap-2 max-w-96 max-sm:max-w-[calc(100dvw-50px)] text-base max-h-[200px] overflow-y-auto">
            <a
              className={"underline italic text-zinc-50"}
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
  <section className="flex max-xs:text-sm flex-row sm:flex-row gap-1.5 flex-wrap group">
    {categories
      .slice(0, 2)
      .filter((category) => category.$.term !== primaryCategory[0].$.term)
      .reverse()
      .map((category) => (
        <Tag
          subject={category.$.term}
          key={category.$.term}
          className={
            "text-sm sm:opacity-0 max-sm:hidden pointer-events-none sm:group-hover:pointer-events-auto active:scale-95 sm:group-hover:opacity-100 sm:scale-95 sm:group-hover:scale-100 transition-all font-mono text-zinc-800 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-full px-2.5 py-0.5"
          }
        />
      ))}

    <Tag
      subject={primaryCategory[0].$.term}
      className={
        "text-sm font-mono transition-all active:scale-95 text-zinc-50 hover:bg-zinc-700 bg-zinc-800 border border-zinc-200 rounded-full px-2.5 py-0.5"
      }
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
