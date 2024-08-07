import { cn } from "@/app/utils/common";
import WithMathJax from "../../common/WithMathJax";

interface AbstractProps {
  abstract: string;
  showAbstract: boolean;
}

const Abstract = ({ abstract, showAbstract }: AbstractProps) => {
  return (
    <>
      <div
        className={cn(
          "origin-top overflow-clip transition-all",
          showAbstract ? "h-full scale-y-100" : "h-0 scale-y-0",
        )}
      >
        <div className="w-full select-none text-center font-bold text-zinc-900 transition-colors dark:text-zinc-50">
          Abstract.
        </div>
        <WithMathJax
          className="place-self-center hyphens-auto text-balance break-words text-zinc-900 sm:text-justify dark:text-zinc-50"
          text={abstract}
        />
      </div>

      <div
        className={cn(
          "w-full select-none text-pretty text-center font-mono text-sm italic text-zinc-400 transition-all",
          !showAbstract
            ? "scale-100 pb-4 opacity-100"
            : "h-0 scale-0 opacity-0",
        )}
      >
        <span className="max-sm:hidden">long-press</span>
        <span className="sm:hidden">Touch and hold</span> the title to view
        abstract
      </div>
    </>
  );
};

export default Abstract;
