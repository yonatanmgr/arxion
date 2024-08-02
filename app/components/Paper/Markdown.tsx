import { MathJax } from "better-react-mathjax";

const MarkdownBlock = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <MathJax>
      <div className={className}>{text}</div>
    </MathJax>
  );
};

export default MarkdownBlock;
