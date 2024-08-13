import { cn } from "@/app/utils/common";
import { ClassNameValue } from "tailwind-merge";
import Card from "../../common/Card";

export const Placeholder = ({ className }: { className: ClassNameValue }) => (
  <div
    className={cn(
      "h-10 w-full animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-700",
      className,
    )}
  ></div>
);

const PaperPlaceholder = () => {
  return (
    <Card>
      <header className="flex w-full flex-row items-center justify-between gap-2 pb-4">
        <Placeholder className="h-6 w-2/5 sm:w-1/5" />
        <Placeholder className="h-6 w-20 rounded-full" />
      </header>
      <Placeholder className="mb-4 h-20 w-full place-self-center sm:h-10 sm:w-2/3" />
      <Placeholder className="mb-4 w-1/2 place-self-center" />
      <Placeholder className="h-6 w-full place-self-center sm:w-1/3" />
      <footer className="flex w-full flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
        <Placeholder className="h-6 w-1/4 sm:w-1/5" />
        <Placeholder className="h-6 w-full sm:w-1/5" />
      </footer>
    </Card>
  );
};

export default PaperPlaceholder;
