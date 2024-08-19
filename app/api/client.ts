import axios from "axios";
import rateLimit from "axios-rate-limit";
import { apiConfig } from "./api.config";

const arxivConfig = apiConfig.arxiv;
const semanticScholarConfig = apiConfig.semanticScholar;
const semanticScholarLimitedConfig = apiConfig.semanticScholar_limited;

const defaultHeaders = {
  "Content-Type": "application/json",
};

/**
 * The Axios client instance for the Arxiv API.
 * It is rate-limited to 1 request every 3 seconds.
 */
export const arxivClient = rateLimit(
  axios.create({
    baseURL: arxivConfig.baseUrl,
    headers: defaultHeaders,
  }),
  {
    maxRequests: arxivConfig.maxRequests,
    perMilliseconds: arxivConfig.requestInterval,
  },
);

/**
 * The Axios client instance for the Semantic Scholar API.
 * It is rate-limited to 10 requests every second.
 *
 * This is used for all endpoints except `/paper/batch`, `/paper/search` and `/recommendations`.
 */
export const semanticScholarClient = rateLimit(
  axios.create({
    baseURL: semanticScholarConfig.baseUrl,
    headers: {
      ...defaultHeaders,
      "x-api-key": semanticScholarConfig.apiKey,
    },
  }),
  {
    maxRequests: semanticScholarConfig.maxRequests,
    perMilliseconds: semanticScholarConfig.requestInterval,
  },
);

/**
 * The Axios client instance for the Semantic Scholar API.
 * It is rate-limited to 1 request every second.
 *
 * This is used for the `/paper/batch`, `/paper/search` and `/recommendations` endpoints.
 */
export const semanticScholarClient_limited = rateLimit(
  axios.create({
    baseURL: semanticScholarLimitedConfig.baseUrl,
    headers: {
      ...defaultHeaders,
      "x-api-key": semanticScholarLimitedConfig.apiKey,
    },
  }),
  {
    maxRequests: semanticScholarLimitedConfig.maxRequests,
    perMilliseconds: semanticScholarLimitedConfig.requestInterval,
  },
);
