type ExternalIds = Record<string, string>;

type Author = {
  authorId: string;
  externalIds: ExternalIds;
  url: string;
  name: string;
  affiliations: string[];
  homepage: string;
  paperCount: number;
  citationCount: number;
  hIndex: number;
};

// Define Paper type
export type Paper = {
  id: string;
  title: string;
  abstract: string;
  tldr?: string;
  authors: Author[];
  url: string;
  arxivId: string;
  venue: string;
  year: number;
  doi: string;
  citations: number;
  references: number;
  fieldsOfStudy: string[];
  externalIds: ExternalIds;
};

// Define SemanticScholarPaper type
type TLDR = {
  model: string;
  text: string | null;
};

type SemanticScholarPaper = Omit<Paper, "id" | "tldr"> & {
  tldr: TLDR | null;
};

// Transform function
export const transformSemanticScholarPaper = (
  paper: SemanticScholarPaper | null,
): Paper | undefined => {
  if (!paper) return undefined;

  const { arxivId, tldr, ...rest } = paper;

  return {
    id: arxivId,
    tldr: tldr?.text ?? undefined,
    arxivId,
    ...rest,
  };
};
