import { TArxivEntry } from "../types";
import { client } from "./client";
import { parseString } from "xml2js";

// import search from "arXiv-api-ts";

// ti	Title
// au	Author
// abs	Abstract
// co	Comment
// jr	Journal Reference
// cat	Subject Category
// rn	Report Number
// id	Id (use id_list instead)
type TResults = {
  papers: TArxivEntry[];
  totalResults: number;
};

const fields = ["ti", "au", "abs", "co", "jr", "cat", "rn", "id"];

/**
 * Fetches Arxiv entries based on the provided query and limit.
 *
 * @param query - The search query for Arxiv entries.
 * @param limit - The maximum number of results to fetch.
 * @param page - The page number to fetch.
 * @returns A promise that resolves to an array of ArxivEntry objects.
 */
const fetchArxiv = async (query: string, limit: number, page: number) => {
  const response = await client.get("query", {
    params: {
      search_query: fields.some((f) => query.startsWith(f))
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

const fetchByIds = async (ids: string[]) => {
  const response = await client.get("query", {
    params: {
      id_list: ids.join(","),
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

const papersApi = {
  fetchArxiv,
  fetchByIds,
};

export default papersApi;
