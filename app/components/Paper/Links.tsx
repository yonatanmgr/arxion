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
      {/* <span className="w-[1px] bg-zinc-400 select-none h-6 rounded-full"></span> */}
      {links
        .filter((link) => link.$.title)
        .map((link) => (
          <a
            key={link.$.href}
            href={link.$.href}
            className="transition-all flex flex-row gap-1 items-center max-sm:underline text-zinc-500 hover:text-arxiv-red hover:underline"
          >
            {link.$.type === "application/pdf" ? <BsFilePdf /> : <BiLink />}
            {link.$.title}
          </a>
        ))}
    </section>
  );
};

export default Links;
