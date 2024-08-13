"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TArxivEntry } from "@/app/types";
import WithMathJax from "@/components/common/WithMathJax";
// import Categories from "@/components/Paper/Categories";
import PublishDate from "@/components/Paper/PublishDate";
import Categories from "@/components/Paper/Categories";

const PaperContent = ({ paper }: { paper: TArxivEntry }) => {
  return (
    <AnimatePresence>
      <motion.main
        key={`paper-${paper["id"][0]}`}
        initial={{ opacity: 0, y: 10, filter: "blur(4px)", scale: 0.99 }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        exit={{ opacity: 0, y: 10, filter: "blur(4px)", scale: 0.99 }}
        transition={{ duration: 0.3 }}
        className="flex h-[calc(100dvh-9rem)] flex-col gap-4 overflow-y-auto font-serif max-sm:h-[calc(100dvh-6.5rem)]"
      >
        <header className="flex flex-col gap-4">
          <WithMathJax>
            <h1 className="text-balance text-2xl font-bold">
              {paper["title"][0]}
            </h1>
          </WithMathJax>
          <span className="flex flex-col items-start justify-between gap-2 text-base sm:flex-row sm:items-center">
            <section className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <PublishDate
                publishedOn={paper["published"][0]}
                updatedOn={paper["updated"][0]}
                variant="published"
              />
              {paper["published"][0] !== paper["updated"][0] && (
                <>
                  <span className="select-none">|</span>
                  <PublishDate
                    publishedOn={paper["published"][0]}
                    updatedOn={paper["updated"][0]}
                    variant="updated"
                  />
                </>
              )}
            </section>
            {/* <Categories
              primaryCategory={paper["arxiv:primary_category"]}
              categories={paper["category"] || []}
              direction="rtl"
            /> */}
          </span>
        </header>
        <WithMathJax>
          <p className="text-pretty text-[18px]">{paper["summary"][0]}</p>
        </WithMathJax>
      </motion.main>
    </AnimatePresence>
  );
};

export default PaperContent;
