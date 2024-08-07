import { cn } from "@/app/utils/common";
import { MathJax } from "better-react-mathjax";
import { ClassNameValue } from "tailwind-merge";

interface WithMathJaxProps {
  text: string;
  className?: ClassNameValue;
}

const WithMathJax = ({ text, className }: WithMathJaxProps) => {
  return (
    <MathJax>
      <div className={cn(className, "transition-colors")}>{text}</div>
    </MathJax>
  );
};

export default WithMathJax;
