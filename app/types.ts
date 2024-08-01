export type ArxivEntry = {
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
