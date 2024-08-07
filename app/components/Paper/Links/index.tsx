import { TArxivEntry } from "@/app/types";
import { BiLinkExternal, BiLink } from "react-icons/bi";
import { BsFilePdf } from "react-icons/bs";

interface LinksProps {
  links: TArxivEntry["link"];
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

const Links = ({ links }: LinksProps) => {
  const linksWithTitle = links.filter((link) => link.$.title);
  if (linksWithTitle.length === 0) return <span></span>;

  return (
    <section aria-label="Links" className="flex flex-row items-center gap-2">
      {linksWithTitle.map((link) => (
        <a
          aria-label={link.$.title}
          target="_blank"
          key={link.$.href}
          href={link.$.href}
          rel="noopener noreferrer"
          className="flex select-none flex-row items-center gap-1 text-zinc-500 transition-all hover:text-arxiv-red hover:underline max-sm:underline dark:hover:text-arxiv-red-light"
        >
          {getIconByType(link.$.type)}
          {link.$.title}
        </a>
      ))}
    </section>
  );
};

export default Links;
