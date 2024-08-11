import { CgSpinner } from "react-icons/cg";

export default function Loading() {
  return (
    <h2 className="flex h-3/4 w-full select-none flex-row items-center justify-center gap-2 font-mono text-zinc-500">
      <CgSpinner className="inline-block animate-spin" />
      <span>Loading paper...</span>
    </h2>
  );
}
