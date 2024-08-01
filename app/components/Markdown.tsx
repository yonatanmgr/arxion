import "katex/dist/katex.min.css";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

const MarkdownBlock = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <Markdown
      className={className}
      remarkPlugins={[remarkMath]}
      rehypePlugins={[() => rehypeKatex({ output: "html" })]}
    >
      {text}
    </Markdown>
  );
};

export default MarkdownBlock;
