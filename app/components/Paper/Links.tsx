import { ArxivEntry } from "@/app/types";
import { BiLinkExternal, BiLink } from "react-icons/bi";
import { BsFilePdf } from "react-icons/bs";

const Links = ({
  links,
  id,
}: {
  links: ArxivEntry["link"];
  id: ArxivEntry["id"];
}) => {
  return (
    <section className="flex flex-row gap-2 items-center">
      <a
        className="flex transition-all flex-row items-center gap-1.5 max-sm:underline text-zinc-500 hover:text-red-600 hover:underline"
        href={id[0]}
        target="_blank"
        rel="noreferrer"
      >
        <BiLinkExternal />
        Read on arXiv
      </a>
      <span className="w-[1px] bg-zinc-400 select-none h-6 rounded-full"></span>
      {links
        .filter((link) => link.$.title)
        .map((link) => (
          <a
            key={link.$.href}
            href={link.$.href}
            className="transition-all flex flex-row gap-1 items-center max-sm:underline text-zinc-500 hover:text-red-600 hover:underline"
          >
            {link.$.type === "application/pdf" ? <BsFilePdf /> : <BiLink />}
            {link.$.title}
          </a>
        ))}
    </section>
  );
};

export default Links;
