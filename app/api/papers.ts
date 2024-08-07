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

const fields = ["ti", "au", "abs", "co", "jr", "cat", "rn", "id"];

/**
 * Fetches Arxiv entries based on the provided query and limit.
 *
 * @param query - The search query for Arxiv entries.
 * @param limit - The maximum number of results to fetch.
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
      start: page * limit,
    },
  });
  const xml = await response.data;
  // const xml = await search({
  //   searchQueryParams: [
  //     {
  //       include: [
  //         {
  //           name: query,
  //           prefix: fields.some((f) => query.startsWith(f)) ? "" : "all",
  //         },
  //       ],
  //     },
  //   ],
  //   start: 0,
  //   maxResults: limit,
  //   sortBy: "relevance",
  //   sortOrder: "descending",
  // });

  return new Promise<TArxivEntry[]>((resolve, reject) => {
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
