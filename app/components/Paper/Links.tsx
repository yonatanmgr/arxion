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
    <section className="flex flex-row items-center gap-2">
      {/* <span className="w-[1px] bg-zinc-400 select-none h-6 rounded-full"></span> */}
      {links
        .filter((link) => link.$.title)
        .map((link) => (
          <a
            key={link.$.href}
            href={link.$.href}
            className="dark:hover:text-arxiv-red-light flex flex-row items-center gap-1 text-zinc-500 transition-all hover:text-arxiv-red hover:underline max-sm:underline"
          >
            {link.$.type === "application/pdf" ? <BsFilePdf /> : <BiLink />}
            {link.$.title}
          </a>
        ))}
    </section>
  );
};

export default Links;
