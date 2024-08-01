import MarkdownBlock from "../Markdown";

const Title = ({ title }: { title: string }) => (
  <MarkdownBlock
    className="text-2xl font-bold w-full text-center text-balance py-4"
    text={`# ${title.replace("\n", " ")}`}
  />
);

export default Title;
