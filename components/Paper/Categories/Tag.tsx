import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TArxivEntry } from "@/app/types";
import { cn } from "@/app/lib/utils/common";
import { getSubjectWithCategory } from "@/app/lib/utils/categories";
import { useState, useMemo } from "react";
import { ClassNameValue } from "tailwind-merge";
import { useMediaQuery, useClickAnyWhere } from "usehooks-ts";
import { useLongPress } from "use-long-press";
import { SquareArrowOutUpRight } from "lucide-react";

type TArxivSubject =
  | TArxivEntry["category"][number]["$"]["term"]
  | TArxivEntry["arxiv:primary_category"][number]["$"]["term"];

interface TagProps {
  subject: TArxivSubject;
  className?: ClassNameValue;
}

const Tag = ({ subject, className }: TagProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const isSmallViewport = useMediaQuery("(max-width: 639px)");

  const handleLongPress = () => {
    setIsTooltipOpen(true);
  };

  const bind = useLongPress(handleLongPress, {
    onStart: () => setIsPressed(true),
    onFinish: () => setIsPressed(false),
    onCancel: () => setIsPressed(false),
    filterEvents: () => true,
    threshold: 500,
    cancelOnMovement: 25,
    cancelOutsideElement: true,
  });

  useClickAnyWhere(() => {
    if (isTooltipOpen && isSmallViewport) {
      setIsTooltipOpen(false);
    }
  });

  const subjectWithCategory = useMemo(
    () => getSubjectWithCategory(subject),
    [subject]
  );

  if (subjectWithCategory) {
    const { category, full_name, description } = subjectWithCategory;
    return (
      <Tooltip
        open={isSmallViewport ? isTooltipOpen : undefined}
        delayDuration={50}
      >
        <TooltipTrigger asChild>
          <span
            onClick={() => setIsTooltipOpen(!isSmallViewport)}
            className={cn(
              "select-none truncate max-sm:max-w-[140px]",
              className,
              isPressed && !isTooltipOpen && "animate-pulse"
            )}
            {...bind()}
          >
            {subject}
          </span>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="border-zinc-400 bg-zinc-900 text-zinc-50"
        >
          <div className="flex max-h-[200px] max-w-96 flex-col gap-2 overflow-y-auto text-base max-sm:max-w-[calc(100dvw-50px)]">
            <a
              className="italic text-zinc-50 underline"
              href={`https://arxiv.org/list/${subject}/recent`}
              target="_blank"
              rel="noreferrer"
            >
              <SquareArrowOutUpRight size={16} className="inline" /> {category}:{" "}
              {full_name}
            </a>
            <span>{description}</span>
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

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
};

export default Tag;
