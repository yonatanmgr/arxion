import AnimatedBlob from "@/components/AnimatedBlob";

export default function Loading() {
  return (
    <section className="relative h-4/5">
      <AnimatedBlob />
      <span className="absolute left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 animate-pulse select-none text-center font-mono text-lg text-zinc-600 mix-blend-difference dark:text-white dark:mix-blend-normal">
        Loading paper...
      </span>
    </section>
  );
}
