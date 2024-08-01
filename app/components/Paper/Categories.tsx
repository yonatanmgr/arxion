import { ArxivEntry } from "@/app/types";

const Categories = ({
  categories,
  primaryCategory,
}: {
  categories: ArxivEntry["category"];
  primaryCategory: ArxivEntry["arxiv:primary_category"];
}) => (
  <section className="flex flex-row-reverse sm:flex-row gap-1.5 flex-wrap group">
    {categories
      .slice(0, 2)
      .filter((category) => category.$.term !== primaryCategory[0].$.term)
      .reverse()
      .map((category) => (
        <a
          key={category.$.term.toUpperCase()}
          className="text-sm sm:opacity-0 pointer-events-none sm:group-hover:pointer-events-auto active:scale-95 sm:group-hover:opacity-100 sm:scale-95 sm:group-hover:scale-100 transition-all font-mono text-zinc-800 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-full px-2.5 py-0.5"
          href={`https://arxiv.org/list${category.$.term}/recent`}
          target="_blank"
          rel="noreferrer"
        >
          {category.$.term.toUpperCase()}
        </a>
      ))}
    <a
      className="text-sm font-mono  transition-all active:scale-95 text-zinc-50 hover:bg-zinc-700 bg-zinc-800 border border-zinc-200 rounded-full px-2.5 py-0.5"
      key={primaryCategory[0].$.term}
      href={`https://arxiv.org/list/${primaryCategory[0].$.term}/recent`}
      target="_blank"
      rel="noreferrer"
    >
      {primaryCategory[0].$.term.toUpperCase()}
    </a>
  </section>
);

export default Categories;
