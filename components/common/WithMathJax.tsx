import { cn } from "@/app/lib/utils/common";
import { MathJax } from "better-react-mathjax";
import { PropsWithChildren } from "react";
import { ClassNameValue } from "tailwind-merge";

interface WithMathJaxProps extends PropsWithChildren {
  className?: ClassNameValue;
}

const WithMathJax = ({ children, className }: WithMathJaxProps) => (
  <MathJax>
    <div className={cn(className, "transition-colors")}>{children}</div>
  </MathJax>
);

export default WithMathJax;
