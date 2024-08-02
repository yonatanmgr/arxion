import MarkdownBlock from "./Markdown";

const Title = ({ title }: { title: string }) => {
  return (
    <MarkdownBlock
      className="sm:text-2xl text-xl font-bold w-full text-center text-balance py-2 sm:py-4"
      text={`${title.replace("\n", " ")}`}
    />
  );
};

export default Title;
