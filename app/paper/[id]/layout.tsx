"use client";
import { ReactNode, Suspense } from "react";
import { useTransitionRouter } from "next-view-transitions";
import { MathJaxContext } from "better-react-mathjax";
import { MATHJAX_CONFIG } from "@/app/constants";
import Loading from "./loading";

const PapersLayout = ({ children }: { children: ReactNode }) => {
  const router = useTransitionRouter();

  return (
    <MathJaxContext config={MATHJAX_CONFIG}>
      <div className="flex min-h-screen flex-col gap-4">
        <header className="flex flex-row items-center justify-between font-mono">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
            className="text-zinc-500 hover:text-arxiv-red hover:underline dark:hover:text-arxiv-red-light"
          >
            ← Back to search...
          </a>
          <span className="select-none text-zinc-500">
            WIP - Paper view page
          </span>
        </header>
        <main className="flex-grow">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </main>
      </div>
    </MathJaxContext>
  );
};

export default PapersLayout;
