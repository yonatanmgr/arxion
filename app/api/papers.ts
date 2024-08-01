import { ArxivEntry } from "../types";
import { client } from "./client";
import { parseString } from "xml2js";

/**
 * Fetches Arxiv entries based on the provided query and limit.
 *
 * @param query - The search query for Arxiv entries.
 * @param limit - The maximum number of results to fetch.
 * @returns A promise that resolves to an array of ArxivEntry objects.
 */
const fetchArxiv = async (query: string, limit: number) => {
  const response = await client.get("query", {
    params: {
      search_query: `all:${query}`,
      max_results: limit,
      sortBy: "relevance",
      sortOrder: "descending",
    },
  });
  const xml = await response.data;

  return new Promise<ArxivEntry[]>((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result.feed.entry);
    });
  });
};

const papersApi = {
  fetchArxiv,
};

export default papersApi;
