import { cn } from "@/app/utils/common";
import WithMathJax from "../../common/WithMathJax";
import { useState } from "react";
import { useLongPress } from "use-long-press";

interface TitleProps {
  title: string;
  showAbstract: boolean;
  setShowAbstract: (show: boolean) => void;
}

const Title = ({ title, showAbstract, setShowAbstract }: TitleProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleLongPress = () => {
    setShowAbstract(!showAbstract);
  };

  const bind = useLongPress(handleLongPress, {
    onStart: () => setIsPressed(true),
    onFinish: () => setIsPressed(false),
    onCancel: () => setIsPressed(false),
    filterEvents: () => true,
    threshold: 500,
    cancelOnMovement: 25,
    cancelOutsideElement: true,
  });

  return (
    <button
      className={cn(
        "relative select-text border-b border-b-transparent transition-all hover:border-b-zinc-200 max-sm:select-none dark:hover:border-b-zinc-700"
      )}
      {...bind()}
    >
      <div
        className={cn(
          "absolute bottom-0 h-[1px] w-0 rounded-lg bg-zinc-400/50 opacity-50 transition-all duration-500 dark:bg-zinc-400/50",
          isPressed || showAbstract ? "w-full opacity-100" : "w-0"
        )}
      ></div>
      <div
        className={cn(
          "absolute bottom-0 z-10 h-[1px] w-0 rounded-lg bg-zinc-500/50 opacity-50 transition-all duration-500 dark:bg-zinc-400/50",
          isPressed ? "w-full opacity-100" : "w-0"
        )}
      ></div>
      <WithMathJax
        className={cn(
          "w-full text-balance py-2 text-center text-xl font-bold sm:py-4 sm:text-2xl",
          isPressed && !showAbstract && "animate-pulse"
        )}
      >
        {`${title.replace("\n", " ")}`}
      </WithMathJax>
    </button>
  );
};

export default Title;
