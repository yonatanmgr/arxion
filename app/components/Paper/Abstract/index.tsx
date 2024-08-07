import { cubicBezier, motion } from "framer-motion";
import WithMathJax from "../../common/WithMathJax";

interface AbstractProps {
  abstract: string;
  showAbstract: boolean;
}

const Abstract = ({ abstract, showAbstract }: AbstractProps) => {
  return (
    <>
      <motion.div
        initial={{ height: 0, scaleY: 0 }}
        animate={{
          height: showAbstract ? "auto" : 0,
          scaleY: showAbstract ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: cubicBezier(0.4, 0, 0.2, 1) }}
        className="origin-top overflow-clip"
      >
        <div className="w-full select-none text-center font-bold text-zinc-900 transition-colors dark:text-zinc-50">
          Abstract.
        </div>
        <WithMathJax className="place-self-center hyphens-auto text-balance break-words text-zinc-900 sm:text-justify dark:text-zinc-50">
          {abstract}
        </WithMathJax>
      </motion.div>

      <motion.div
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: showAbstract ? 0 : 1, opacity: showAbstract ? 0 : 1 }}
        transition={{ duration: 0.25, ease: cubicBezier(0.4, 0, 0.2, 1) }}
        className="w-full select-none text-pretty text-center font-mono text-sm italic text-zinc-400"
      >
        <span className="max-sm:hidden">long-press</span>
        <span className="sm:hidden">Touch and hold</span> the title to view
        abstract
      </motion.div>
    </>
  );
};

export default Abstract;
