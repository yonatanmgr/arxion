import React, { useEffect } from "react";
import { GroupedCombobox } from "../../ui/combobox";
import { Button } from "../../ui/button";
import { LucideFilter, LucideSearch } from "lucide-react";
import { cn } from "@/app/utils/common";
import { parseAsInteger, useQueryState } from "nuqs";
import { useMediaQuery } from "usehooks-ts";

interface FiltersProps {
  searchQuery: string | null;
  setSearchQuery: (query: string | null) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  subject: string;
  setSubject: (subject: string) => void;
  groupedSubjects: {
    label: string;
    options: {
      value: string;
      label: string;
    }[];
  }[];
  isFetching: boolean;
}

const Filters = ({
  searchQuery,
  setSearchQuery,
  showFilters,
  setShowFilters,
  subject,
  setSubject,
  groupedSubjects,
  isFetching,
}: FiltersProps) => {
  const [, setPage] = useQueryState("page", parseAsInteger);
  const isSmallViewport = useMediaQuery("(max-width: 639px)");
  const [localQuery, setLocalQuery] = React.useState(searchQuery);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleSearch = (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    if (!isFetching) {
      setSearchQuery(localQuery || null);
      setLocalQuery(localQuery || null);
      setPage(1);
    }
    e.stopPropagation();
  };

  return (
    <section className={cn("flex w-full flex-col", showFilters ? "gap-2" : "")}>
      <form className="flex grow flex-row">
        <input
          name="search"
          className={cn(
            "mr-2 w-full rounded-lg border border-zinc-300 p-2 px-4 font-mono text-lg outline-none transition-colors placeholder:italic focus-within:border-zinc-400",
            "transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus-within:border-zinc-500",
          )}
          type="search"
          placeholder={
            isSmallViewport ? "Search papers..." : "Search arXiv papers..."
          }
          autoFocus={!localQuery}
          autoComplete="off"
          value={localQuery ?? ""}
          onChange={(e) => {
            setLocalQuery(e.target.value);
          }}
          onSubmit={handleSearch}
        />
        <Button
          aria-label="Search"
          name="search-button"
          type="submit"
          variant={"outline"}
          onClick={handleSearch}
          disabled={isFetching}
          className={cn(
            "mr-2 h-12 w-12 justify-between rounded-lg border border-zinc-300 px-3.5 font-mono text-base transition-colors hover:bg-zinc-100 active:bg-zinc-200",
            "dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-700",
            "disabled:pointer-events-none disabled:opacity-60",
          )}
        >
          <LucideSearch className="inline-block text-zinc-800 transition-colors dark:text-zinc-50" />
        </Button>
        <div className={cn("max-sm:hidden", showFilters && "mr-2")}>
          {showFilters && (
            <GroupedCombobox
              value={subject}
              onChange={(value) => setSubject(value)}
              schema={groupedSubjects}
            />
          )}
        </div>
        <Button
          aria-label="Toggle filters"
          name="filter-toggle"
          variant={"outline"}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setShowFilters(!showFilters);
            e.stopPropagation();
          }}
          className={cn(
            "h-12 w-12 justify-between rounded-lg border border-zinc-300 px-3.5 font-mono text-base transition-colors hover:bg-zinc-100 active:bg-zinc-200",
            "dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-700",
            showFilters &&
              "bg-zinc-900 text-zinc-50 hover:bg-zinc-800 hover:text-zinc-100 active:bg-zinc-700 dark:bg-zinc-800",
          )}
        >
          <LucideFilter
            className={cn(
              "inline-block text-zinc-800 transition-colors dark:text-zinc-50",
              showFilters && "text-zinc-50",
            )}
          />
        </Button>
      </form>

      <div className="sm:hidden">
        {showFilters && (
          <GroupedCombobox
            value={subject}
            onChange={(value) => setSubject(value)}
            schema={groupedSubjects}
          />
        )}
      </div>
    </section>
  );
};

export default Filters;
