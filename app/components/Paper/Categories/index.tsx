import { TArxivEntry } from "@/app/types";
import { cn } from "@/app/utils/common";
import { useMemo } from "react";
import Tag from "./Tag";

interface CategoriesProps {
  categories: TArxivEntry["category"];
  primaryCategory: TArxivEntry["arxiv:primary_category"];
}

const Categories = ({ categories, primaryCategory }: CategoriesProps) => {
  const primaryTerm = primaryCategory[0].$.term;

  const filteredCategories = useMemo(
    () =>
      categories
        .slice(0, 2)
        .filter((category) => category.$.term !== primaryTerm)
        .reverse(),
    [categories, primaryTerm],
  );

  return (
    <section className="max-xs:text-sm group flex flex-row flex-wrap gap-1.5 sm:flex-row">
      {filteredCategories.map((category) => (
        <Tag
          subject={category.$.term}
          key={category.$.term}
          className={cn(
            "pointer-events-none select-none rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 font-mono text-sm text-zinc-800 transition-all hover:bg-zinc-100 active:scale-95 max-sm:hidden sm:scale-95 sm:opacity-0 sm:group-hover:pointer-events-auto sm:group-hover:scale-100 sm:group-hover:opacity-100",
            "dark:border-zinc-800 dark:bg-zinc-700/50 dark:text-zinc-50 dark:hover:bg-zinc-700",
          )}
        />
      ))}

      <Tag
        subject={primaryTerm}
        className={cn(
          "select-none rounded-full border border-zinc-200 bg-zinc-800 px-2.5 py-0.5 font-mono text-sm text-zinc-50 transition-all hover:bg-zinc-700 active:scale-95",
          "dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-600",
        )}
      />
    </section>
  );
};

export default Categories;
