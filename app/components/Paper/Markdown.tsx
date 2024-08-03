import { useQueryState } from "@/app/store/common";
import { MathJax } from "better-react-mathjax";
import Keywords from "react-keywords";

const MarkdownBlock = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const debouncedSearchQuery = useQueryState(
    (state) => state.debouncedSearchQuery
  );

  return (
    <MathJax>
      <div className={className}>
        <Keywords
          color="#b31b1b"
          backgroundColor=""
          caseIgnored
          value={debouncedSearchQuery}
        >
          {text}
        </Keywords>
      </div>
    </MathJax>
  );
};

export default MarkdownBlock;
