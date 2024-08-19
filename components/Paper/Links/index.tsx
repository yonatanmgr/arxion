import { TArxivEntry } from "@/app/types";
import { cn } from "@/app/lib/utils/common";
import { BiLinkExternal, BiLink } from "react-icons/bi";
import { BsFilePdf } from "react-icons/bs";
import { ClassNameValue } from "tailwind-merge";

interface LinksProps {
  links: TArxivEntry["link"];
  arXivUrl: TArxivEntry["id"][0];
  className?: ClassNameValue;
  linkClassName?: ClassNameValue;
}

const getIconByType = (type: string) => {
  switch (type) {
    case "application/pdf":
      return <BsFilePdf />;
    case "other":
      return <BiLinkExternal />;
    default:
      return <BiLink />;
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
            "flex select-none dark:text-zinc-400 flex-row items-center gap-1 text-zinc-500 transition-all sm:hover:text-arxiv-red sm:hover:underline max-sm:underline dark:sm:hover:text-arxiv-red-light",
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
