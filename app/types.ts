export type TArxivEntry = {
  id: string[];
  updated: string[];
  published: string[];
  title: string[];
  summary: string[];
  author: {
    name: string[];
  }[];
  "arxiv:comment"?: {
    _: string;
    $: {
      "xmlns:arxiv": string;
    };
  }[];
  link: {
    $: {
      href: string;
      rel: string;
      type: string;
      title?: string;
    };
  }[];
  "arxiv:primary_category": {
    $: {
      "xmlns:arxiv": string;
      term: string;
      scheme: string;
    };
  }[];
  category: {
    $: {
      term: string;
      scheme: string;
    };
  }[];
};

export type TSubject = {
  abbreviation: string;
  full_name: string;
  description: string;
};

export type TCategory = {
  category: string;
  subjects: TSubject[];
};

export type TSubjectWithCategory = TSubject & { category: string };

export type NewArxivEntry = {
  id: string;
  title: string;
  summary: string;
  published: string;
  updated: string;
  authors: { name: string }[];
  links: string[];
};
