"use client";

import { cn } from "@/app/lib/utils/common";
import moment from "moment";
import { useState, useCallback } from "react";
import { BiCalendar, BiTime } from "react-icons/bi";
import { useMediaQuery } from "usehooks-ts";

interface DateProps {
  publishedOn: string;
  updatedOn: string;
  variant?: "published" | "updated" | "switch";
}

const PublishDate = ({
  publishedOn,
  updatedOn,
  variant = "switch",
}: DateProps) => {
  const [showUpdatedOn, setShowUpdatedOn] = useState(variant == "updated");
  const isExtralargeViewport = useMediaQuery("(min-width: 1024px)");

  const handleUpdatedOnClick = useCallback(() => {
    if (variant == "switch") {
      setShowUpdatedOn((prev) => !prev);
    }
  }, []);

  const asDate = new Date(showUpdatedOn ? updatedOn : publishedOn);
  const asMoment = moment(asDate);

  return (
    <div className="flex flex-row items-center gap-1.5">
      <span className="flex flex-row gap-2 items-center">
        <span className="text-zinc-500">
          {showUpdatedOn || variant == "updated" ? <BiTime /> : <BiCalendar />}
        </span>
        <span
          onClick={handleUpdatedOnClick}
          className={cn(
            "select-none text-zinc-500 dark:text-zinc-400 ",
            variant == "switch" && "cursor-pointer sm:hover:underline"
          )}
        >
          {showUpdatedOn || variant == "updated" ? "Updated" : "Published"}:
        </span>
      </span>
      <span>
        {asMoment.format("MMMM Do, YYYY")}{" "}
        {variant !== "switch" &&
          isExtralargeViewport &&
          `(${asMoment.fromNow()})`}
      </span>
    </div>
  );
};

export default PublishDate;
