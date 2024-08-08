import { AnimatePresence, cubicBezier, motion } from "framer-motion";
import WithMathJax from "../../common/WithMathJax";

interface AbstractProps {
  abstract: string;
  showAbstract: boolean;
  paperId: string;
}

const Abstract = ({ abstract, showAbstract, paperId }: AbstractProps) => {
  return (
    <AnimatePresence mode="sync">
      {showAbstract && (
        <motion.div
          key={`abstract_${paperId}`}
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          transition={{ duration: 0.2, ease: cubicBezier(0.4, 0, 0.2, 1) }}
          className="origin-top overflow-clip"
        >
          <div className="w-full select-none text-center font-bold text-zinc-900 transition-colors dark:text-zinc-50">
            Abstract.
          </div>
          <WithMathJax className="place-self-center hyphens-auto text-balance break-words text-zinc-900 sm:text-justify dark:text-zinc-50">
            {abstract}
          </WithMathJax>
        </motion.div>
      )}
      <motion.div
        initial={false}
        animate={{
          opacity: showAbstract ? 0 : 1,
          height: showAbstract ? 0 : "auto",
        }}
        transition={{ duration: 0.2, ease: cubicBezier(0.4, 0, 0.2, 1) }}
        className="w-full select-none overflow-hidden text-pretty text-center font-mono text-sm italic text-zinc-400"
      >
        <span className="max-sm:hidden">long-press</span>
        <span className="sm:hidden">Touch and hold</span> the title to view
        abstract
      </motion.div>
    </AnimatePresence>
  );
};

export default Abstract;
