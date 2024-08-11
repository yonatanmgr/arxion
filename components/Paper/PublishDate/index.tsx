import moment from "moment";
import { useState, useCallback } from "react";
import { BiCalendar, BiTime } from "react-icons/bi";

interface DateProps {
  publishedOn: string;
  updatedOn: string;
}

const PublishDate = ({ publishedOn, updatedOn }: DateProps) => {
  const [showUpdatedOn, setShowUpdatedOn] = useState(false);

  const handleUpdatedOnClick = useCallback(() => {
    setShowUpdatedOn((prev) => !prev);
  }, []);

  const asDate = new Date(showUpdatedOn ? updatedOn : publishedOn);
  const formattedDate = moment(asDate).format("MMMM Do, YYYY");

  return (
    <div className="flex flex-row items-center gap-1.5">
      <span className="text-zinc-500">
        {showUpdatedOn ? <BiTime /> : <BiCalendar />}
      </span>
      <span
        onClick={handleUpdatedOnClick}
        className="cursor-pointer select-none text-zinc-500 hover:underline"
      >
        {showUpdatedOn ? "Updated" : "Published"} on:
      </span>
      <span>{formattedDate}</span>
    </div>
  );
};

export default PublishDate;
