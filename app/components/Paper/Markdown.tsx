import { useDarkMode } from "@/app/hooks/useDarkMode";
import { useQueryState } from "@/app/store/common";
import { cn } from "@/app/utils/common";
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
    (state) => state.debouncedSearchQuery,
  );

  const { isDarkMode } = useDarkMode();
  return (
    <MathJax>
      <div className={cn(className, "transition-colors")}>
        <Keywords
          color={isDarkMode ? "#b34b4b" : "#b31b1b"}
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
