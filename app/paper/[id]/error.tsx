"use client";

import AnimatedBlob from "@/components/AnimatedBlob";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset?: () => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 font-serif select-none h-4/5">
      <h1 className="text-6xl font-bold text-zinc-500 dark:text-zinc-400">
        {error.digest ? error.name : "404"}
      </h1>
      <h2 className="text-xl italic font-bold text-zinc-500 dark:text-zinc-400">
        {error.digest ? error.digest : "Page Not Found"}
      </h2>
      <p className="text-center text-balance text-zinc-500 dark:text-zinc-400">
        {error.digest
          ? error.message
          : "The page you are looking for does not exist."}
      </p>
      {reset && (
        <button
          onClick={reset}
          className="font-mono text-arxiv-red hover:underline dark:text-arxiv-red-light"
        >
          Try again
        </button>
      )}
      <AnimatedBlob isVisible={true} className={"scale-75"} />
    </div>
  );
};

export default Error;
