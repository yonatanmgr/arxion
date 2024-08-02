import { BiCopy } from "react-icons/bi";
import MarkdownBlock from "./Markdown";
import { useCopyToClipboard } from "usehooks-ts";

const Title = ({ title }: { title: string }) => {
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  return (
    <MarkdownBlock
      className="sm:text-2xl text-xl font-bold w-full text-center text-balance py-2 sm:py-4 select-none"
      text={`${title.replace("\n", " ")}`}
    />
  );
};

export default Title;
