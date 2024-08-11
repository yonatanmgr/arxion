"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TArxivEntry } from "@/app/types";
import WithMathJax from "@/components/common/WithMathJax";

const PaperContent = ({ paper }: { paper: TArxivEntry }) => {
  return (
    <AnimatePresence>
      <motion.main
        initial={{ opacity: 0, y: 10, filter: "blur(4px)", scale: 0.99 }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        exit={{ opacity: 0, y: 10, filter: "blur(4px)", scale: 0.99 }}
        transition={{ duration: 0.3 }}
        className="flex h-[calc(100dvh-9rem)] flex-col gap-4 overflow-y-auto font-serif max-sm:h-[calc(100dvh-6.5rem)]"
      >
        <WithMathJax>
          <h1 className="text-balance text-2xl font-bold">
            {paper["title"][0]}
          </h1>
        </WithMathJax>
        <WithMathJax>
          <p className="text-pretty text-lg">{paper["summary"][0]}</p>
        </WithMathJax>
        {/* <Categories
            primaryCategory={paper["arxiv:primary_category"]}
            categories={paper["category"] || []}
            direction="ltr"
          /> */}
      </motion.main>
    </AnimatePresence>
  );
};

export default PaperContent;
