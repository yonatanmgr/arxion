"use client";

import { cn } from "@/app/utils/common";
import { AnimatePresence, motion } from "framer-motion";
import { ClassNameValue } from "tailwind-merge";

const blobCommonClassNames: ClassNameValue =
  "mix-blend-plus-lighter blur-3xl dark:mix-blend-screen left-[15%] top-[12%] absolute ";

const AnimatedBlob = ({
  className,
  isVisible,
  opacity,
}: {
  className?: ClassNameValue;
  isVisible?: boolean;
  opacity?: number;
}) => (
  <AnimatePresence>
    {isVisible && (
      <motion.section
        key={"animated-blob-section"}
        initial={{ filter: "blur(100px)", opacity: 0 }}
        animate={{ filter: "blur(0px)", opacity: opacity || 1 }}
        exit={{ filter: "blur(100px)", opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "pointer-events-none h-96 w-96 dark:blur-2xl dark:mix-blend-color-dodge",
          className
        )}
      >
        <div
          className={cn(
            "dark:duration-5000 dark:opacity-100 duration-4000 h-80 w-64 animate-spin rounded-[51%_95%_72%_59%/75%_98%_54%_75%] bg-cyan-400 dark:bg-cyan-300 ",
            blobCommonClassNames
          )}
        ></div>
        <div
          className={cn(
            "duration-4000 dark:opacity-100 animate-spin-reverse h-64 w-72 rounded-[51%_45%_72%_19%/25%_38%_44%_75%] bg-orange-400 dark:bg-orange-300 mix-blend-plus-lighter blur-3xl dark:mix-blend-color-dodge",
            blobCommonClassNames
          )}
        ></div>
        <div
          className={cn(
            "dark:duration-7000 dark:opacity-100 dark:animate-light-pulse duration-2000 h-80 w-64 animate-pulse rounded-[51%_25%_72%_39%/15%_98%_54%_75%] bg-fuchsia-300 dark:bg-fuchsia-200  dark:blur-2xl",
            blobCommonClassNames
          )}
        ></div>
      </motion.section>
    )}
  </AnimatePresence>
);

export default AnimatedBlob;
