import papersApi from "@/app/api/papers";
import PaperContent from "./content";
import Error from "./error";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = params.id.replace("_", "/");

  const paper = await papersApi
    .fetchByIds([id as string])
    .then((res) => res.papers[0]);

  const location =
    typeof window !== "undefined"
      ? window.location.host
      : "https://arxion.vercel.app";

  return {
    title: `arXion - ${paper.title[0]}`,
    description: paper.summary[0].slice(0, 450),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${location}/paper/${params.id}`,
      siteName: "arXion",
      title: "arXion",
      description: "A simple arXiv explorer",
      images: [
        {
          url: `${location}/api/og?id=${params.id}`,
          width: 1200,
          height: 630,
          alt: paper.title[0],
        },
      ],
    },
    metadataBase: new URL(location),
  };
}

const PaperPage = async ({ params }: { params: { id: string } }) => {
  const paper = await papersApi
    .fetchByIds([params.id.replace("_", "/") as string])
    .then((res) => {
      console.log(res);
      if ("papers" in res && res.papers.length > 0) {
        return res.papers[0];
      }
    })
    .catch((e) => {
      console.error(e);
    });

  if (paper && "summary" in paper) {
    return <PaperContent paper={paper} />;
  } else {
    const err: Error & { digest: string } = {
      digest: "Paper not found",
      message: `Paper with id "${params.id.replace("_", "/")}" was not found`,
      name: "404",
      stack: "",
    };
    return <Error error={err} />;
  }
};

export default PaperPage;
