import useSWR from "swr";
import papersApi from "@/app/api/papers";
import { RESULT_LIMIT } from "../constants";

const fetchQueryResult = async (query: string | null, page: number) => {
  if (
    query &&
    ["AND", "OR", "NOT"].every((operator) => !query.endsWith(operator)) &&
    page
  ) {
    return papersApi.fetchArxiv(query, RESULT_LIMIT, page - 1);
  }
};

const fetcher = (...args: Parameters<typeof fetchQueryResult>) =>
  fetchQueryResult(...args).then((res) => {
    return {
      papers: res?.papers,
      totalResults: res?.totalResults,
    };
  });

export const usePapers = (searchQuery: string | null, page: number) => {
  const { data, error, isLoading } = useSWR(
    ["arxiv", searchQuery, page],
    () => fetcher(searchQuery, page),
    {
      fallbackData: { papers: [], totalResults: 0 },
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    papers: data.papers,
    totalResults: data.totalResults,
    isFetching: isLoading,
    error,
  };
};
