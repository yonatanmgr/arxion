type ExternalIds = {
  [key: string]: string;
};

type TLDR = {
  model: string;
  text: string;
};

export type Paper = {
  id: string;
  title: string;
  abstract: string;
  tldr: string;
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

type SemanticScholarPaper = {
  arxivId: string;
  title: string;
  abstract: string;
  tldr: TLDR;
  url: string;
  venue: string;
  year: number;
  doi: string;
  citations: number;
  references: number;
  externalIds: ExternalIds;
  fieldsOfStudy: string[];
  authors: Author[];
};

type Author = {
  authorId: string;
  externalIds: {
    [key: string]: string;
  };
  url: string;
  name: string;
  affiliations: string[];
  homepage: string;
  paperCount: number;
  citationCount: number;
  hIndex: number;
};

export const transformSemanticScholarPaper = (
  paper: SemanticScholarPaper,
): Paper | undefined => {
  if (paper) {
    return {
      id: paper.arxivId,
      title: paper.title,
      abstract: paper.abstract,
      tldr: (paper.tldr ?? { text: null }).text ?? undefined,
      authors: paper.authors,
      url: paper.url,
      arxivId: paper.arxivId,
      venue: paper.venue,
      year: paper.year,
      fieldsOfStudy: paper.fieldsOfStudy,
      doi: paper.doi,
      citations: paper.citations,
      references: paper.references,
      externalIds: paper.externalIds,
    };
  } else {
    return undefined;
  }
};
