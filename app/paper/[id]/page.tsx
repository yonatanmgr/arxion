import papersApi from "@/app/api/papers";
import PaperContent from "./content";
// import { usePapersStore } from "@/app/state/papers-store";

const PaperPage = async ({ params }: { params: { id: string } }) => {
  //   const { papers } = usePapersStore();
  //   const foundPaper = papers?.find(
  //     (paper) => paper.id[0].replace("/", "_") === params.id,
  //   );

  //   if (foundPaper) {
  //     return <PaperContent paper={foundPaper} />;
  //   }

  const paper = await papersApi
    .fetchByIds([params.id.replace("_", "/") as string])
    .then((res) => res.papers[0]);

  return <PaperContent paper={paper} />;
};

export default PaperPage;
