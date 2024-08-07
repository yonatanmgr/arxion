const Card = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex flex-col gap-2 rounded-md border border-zinc-300 bg-white px-4 py-4 text-left font-cmu opacity-100 transition-all last:mb-4 hover:opacity-100 sm:px-8 sm:py-6 sm:text-lg sm:opacity-70 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:opacity-100">
      {children}
    </div>
  );
};

export default Card;
