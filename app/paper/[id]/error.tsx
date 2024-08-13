"use client";

import AnimatedBlob from "@/components/AnimatedBlob";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="flex h-4/5 select-none flex-col items-center justify-center gap-2 font-serif">
      <h1 className="text-6xl font-bold text-zinc-500 dark:text-zinc-400">
        {error.digest ? "Error" : "404"}
      </h1>
      <h2 className="text-xl font-bold italic text-zinc-500 dark:text-zinc-400">
        {error.digest ? "An error occurred" : "Page Not Found"}
      </h2>
      <p className="text-balance text-center text-zinc-500 dark:text-zinc-400">
        {error.digest
          ? "An error occurred while fetching the paper."
          : "The page you are looking for does not exist."}
      </p>
      <button
        onClick={reset}
        className="font-mono text-arxiv-red hover:underline dark:text-arxiv-red-light"
      >
        Try again
      </button>
      <AnimatedBlob isVisible={true} className={"scale-75"} />
    </div>
  );
};

export default Error;
