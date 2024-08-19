import { TArxivEntry } from "@/app/types";
import { cn } from "@/app/lib/utils/common";
import { ClassNameValue } from "tailwind-merge";
import { SquareArrowOutUpRight, LucideLink, FileText } from "lucide-react";

interface LinksProps {
  links: TArxivEntry["link"];
  arXivUrl: TArxivEntry["id"][0];
  className?: ClassNameValue;
  linkClassName?: ClassNameValue;
}

const getIconByType = (type: string) => {
  switch (type) {
    case "application/pdf":
      return <FileText size={16} />;
    case "other":
      return <SquareArrowOutUpRight size={16} />;
    default:
      return <LucideLink size={16} />;
  }
};

const Links = ({
  links,
  arXivUrl,
  className = "",
  linkClassName = "",
}: LinksProps) => {
  const linksWithTitle = links.filter((link) => link.$.title);
  if (linksWithTitle.length === 0) return <span></span>;

  return (
    <section
      aria-label="Links"
      className={cn("flex flex-row items-center gap-2", className)}
    >
      {[
        {
          $: {
            href: arXivUrl,
            type: "other",
            title: "arXiv",
          },
        },
        ...linksWithTitle,
      ].map((link) => (
        <a
          aria-label={link.$.title}
          target="_blank"
          key={link.$.href}
          href={link.$.href}
          rel="noopener noreferrer"
          className={cn(
            "flex select-none dark:text-zinc-400 flex-row items-center gap-1.5 items-center text-zinc-500 transition-all sm:hover:text-arxiv-red sm:hover:underline max-sm:underline dark:sm:hover:text-arxiv-red-light",
            linkClassName
          )}
        >
          {getIconByType(link.$.type)}
          {link.$.title}
        </a>
      ))}
    </section>
  );
};

export default Links;
