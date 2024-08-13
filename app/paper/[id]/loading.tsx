import AnimatedBlob from "@/components/AnimatedBlob";
import { CgSpinner } from "react-icons/cg";

export default function Loading() {
  return (
    <section className="relative h-4/5">
      <AnimatedBlob
        isVisible={true}
        className="fixed -top-0 left-1/2 -z-50 -translate-x-1/2 -translate-y-1/2 scale-x-150 scale-y-[0.04] animate-pulse sm:scale-x-[4] sm:scale-y-[0.06]"
      />
      <span className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-row items-center justify-center gap-2.5 overflow-visible font-mono text-lg">
        <CgSpinner className="min-h-4 min-w-4 animate-spin" />
        <span className="animate-light-pulse duration-2000">
          Loading paper...
        </span>
      </span>
    </section>
  );
}
