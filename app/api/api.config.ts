const BASE_ARXIV_URL = "https://export.arxiv.org/api";
const BASE_SEMANTIC_SCHOLAR_URL = "https://api.semanticscholar.org/graph/v1";

export const apiConfig = {
  arxiv: {
    baseUrl: BASE_ARXIV_URL,
    maxRequests: 1,
    requestInterval: 3000,
    endpoints: {
      query: "/query",
    },
  },
  semanticScholar: {
    baseUrl: BASE_SEMANTIC_SCHOLAR_URL,
    maxRequests: 10,
    requestInterval: 1000,
    endpoints: {
      autocomplete: "/paper/autocomplete",
    },
    apiKey: process.env.SEMANTIC_SCHOLAR_API_KEY!,
  },
  semanticScholar_limited: {
    baseUrl: BASE_SEMANTIC_SCHOLAR_URL,
    maxRequests: 1,
    requestInterval: 1000,
    endpoints: {
      batch: "/paper/batch",
      search: "/paper/search",
      bulk: "/paper/search/bulk",
      match: "/paper/search/match",
      recommendations: "/recommendations",
    },
    apiKey: process.env.SEMANTIC_SCHOLAR_API_KEY!,
  },
};
