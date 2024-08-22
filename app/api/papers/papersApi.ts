import { arxivClient, semanticScholarClient_limited } from "@/app/api/client";
import { FIELDS } from "@/app/lib/constants/api";
import { TArxivEntry } from "@/app/types";
import { parseString } from "xml2js";
import { apiConfig } from "../api.config";
import { Paper, transformSemanticScholarPaper } from "./services";

export type TResults = {
  papers: TArxivEntry[];
  totalResults: number;
};

/**
 * Fetches Arxiv entries based on the provided query and limit.
 *
 * @param query - The search query for Arxiv entries.
 * @param limit - The maximum number of results to fetch.
 * @param page - The page number to fetch.
 * @returns A promise that resolves to an array of ArxivEntry objects.
 */
const fetchArxiv = async (query: string, limit: number, page: number) => {
  const response = await arxivClient.get(apiConfig.arxiv.endpoints.query, {
    params: {
      search_query: FIELDS.some((f) => query.startsWith(f))
        ? query
        : `all:${query}`,
      max_results: limit,
      sortBy: "relevance",
      sortOrder: "descending",
      start: (page > 0 ? page : 0) * limit,
    },
  });

  const xml = await response.data;

  return new Promise<TResults>((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err) {
        reject(err);
      }
      const totalResults = result.feed["opensearch:totalResults"][0]["_"];
      resolve({
        papers: result.feed.entry,
        totalResults: parseInt(totalResults),
      });
    });
  });
};

/**
 * Fetches Arxiv entries based on the provided IDs.
 *
 * @param ids - The list of IDs to fetch.
 * @returns A promise that resolves to an array of ArxivEntry objects.
 */
const fetchByIds = async (ids: string[]) => {
  const response = await arxivClient.get(apiConfig.arxiv.endpoints.query, {
    params: {
      id_list: ids.join(","),
    },
  });

  const xml = await response.data;
  return new Promise<TResults>((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      }

      const totalResults = result.feed["opensearch:totalResults"][0]["_"];
      resolve({
        papers: result.feed.entry,
        totalResults: parseInt(totalResults),
      });
    });
  });
};

const enrichByArxivId = async (ids: string[]): Promise<Paper[]> => {
  const requestFields = [
    "title",
    "abstract",
    "tldr",
    "fieldsOfStudy",
    "externalIds",
    "authors.name",
    "authors.externalIds",
    "authors.homepage",
  ];

  const response = await semanticScholarClient_limited.post(
    apiConfig.semanticScholar_limited.endpoints.batch,
    {
      ids: ids.map((id) => `ARXIV:${id}`),
    },
    {
      params: {
        fields: requestFields.join(","),
      },
    },
  );

  if (response.status !== 200) {
    const error = await response.data;
    console.error(error);
    return [];
  }

  const data = await response.data;
  const papers = data
    .map(transformSemanticScholarPaper)
    .filter(Boolean) as Paper[];
  return papers;
};

const papersApi = {
  fetchArxiv,
  fetchByIds,
  enrichByArxivId,
};

export default papersApi;
