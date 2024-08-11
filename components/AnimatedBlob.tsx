import { cn } from "@/app/utils/common";
import { ClassNameValue } from "tailwind-merge";

const AnimatedBlob = ({ className }: { className?: ClassNameValue }) => (
  <section
    className={cn(
      "absolute pointer-events-none left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 opacity-40 dark:opacity-100",
      className
    )}
  >
    <div className="duration-4000 absolute left-[15%] top-[12%] h-80 w-64 animate-spin rounded-[51%_95%_72%_59%/75%_98%_54%_75%] bg-blue-400 mix-blend-plus-lighter blur-3xl dark:mix-blend-color-dodge"></div>
    <div className="duration-3000 animate-spin-reverse absolute left-[15%] top-[12%] h-64 w-72 rounded-[51%_45%_72%_19%/25%_38%_44%_75%] bg-orange-400 mix-blend-plus-lighter blur-3xl dark:mix-blend-color-dodge"></div>
    <div className="duration-2000 absolute left-[15%] top-[12%] h-80 w-64 animate-pulse rounded-[51%_25%_72%_39%/15%_98%_54%_75%] bg-fuchsia-300 mix-blend-plus-lighter blur-3xl dark:mix-blend-color-dodge dark:blur-2xl"></div>
  </section>
);

export default AnimatedBlob;
