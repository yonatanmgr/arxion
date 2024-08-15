import papersApi from "@/app/api/papers";
import PaperContent from "./PaperContent";
import Error from "./error";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = params.id.replace("_", "/");

  const location =
    typeof window !== "undefined"
      ? window.location.host
      : "https://arxion.vercel.app";

  return {
    title: `arXion - ${id}`,
    description: "A simple arXiv explorer",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${location}/paper/${params.id}`,
      siteName: "arXion",
      title: `arXion - ${id}`,
      description: `View ${id} on arXion`,
      images: [
        {
          url: `${location}/api/og?id=${params.id}`,
          width: 1200,
          height: 630,
          alt: id,
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
