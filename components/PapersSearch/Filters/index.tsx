"use client";

import React, { useEffect, useMemo, useState } from "react";
import { GroupedCombobox } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import { LucideFilter, LucideSearch } from "lucide-react";
import { cn } from "@/app/utils/common";
import { parseAsInteger, useQueryState } from "nuqs";
import { usePapers } from "@/app/hooks/usePapers";
import { buildGroupedSubjects } from "@/app/utils/categories";
import { CATEGORIES } from "@/app/categories";

const Filters = () => {
  const [subject, setSubject] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const groupedSubjects = useMemo(() => buildGroupedSubjects(CATEGORIES), []);

  const [page, setPage] = useQueryState("page", parseAsInteger);
  const [searchQuery, setSearchQuery] = useQueryState("query");
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const safePage = page !== null ? page : 1;

  const { isFetching } = usePapers(searchQuery, safePage);

  useEffect(() => {
    if (subject) {
      if (!searchQuery) {
        setSearchQuery(`cat:${subject}`);
      } else {
        if (searchQuery?.startsWith(`cat:`)) {
          const [, ...rest] = searchQuery.split("AND");
          if (rest.length === 0) {
            setSearchQuery(`cat:${subject}`);
          } else setSearchQuery(`cat:${subject} AND${rest.join("AND")}`);
        } else {
          setSearchQuery(`cat:${subject} AND ${searchQuery}`);
        }
      }
    }
  }, [subject, setSearchQuery]);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleSearch = (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLInputElement>
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
      <form className="flex flex-row grow">
        <input
          name="search"
          className={cn(
            "mr-2 w-full rounded-lg border border-zinc-300 p-2 px-4 font-mono text-lg outline-none transition-colors placeholder:italic focus-within:border-zinc-400",
            "transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus-within:border-zinc-500"
          )}
          type="search"
          placeholder={"Search papers..."}
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
            "disabled:pointer-events-none disabled:opacity-60"
          )}
        >
          <LucideSearch className="inline-block transition-colors text-zinc-800 dark:text-zinc-50" />
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
              "bg-zinc-900 text-zinc-50 hover:bg-zinc-800 hover:text-zinc-100 active:bg-zinc-700 dark:bg-zinc-800"
          )}
        >
          <LucideFilter
            className={cn(
              "inline-block text-zinc-800 transition-colors dark:text-zinc-50",
              showFilters && "text-zinc-50"
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
