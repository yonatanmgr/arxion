import MarkdownBlock from "./Markdown";

const Title = ({ title }: { title: string }) => {
  return (
    <MarkdownBlock
      className="w-full text-balance py-2 text-center text-xl font-bold sm:py-4 sm:text-2xl"
      text={`${title.replace("\n", " ")}`}
    />
  );
};

export default Title;
