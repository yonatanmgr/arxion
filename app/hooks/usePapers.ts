import useSWR from "swr";
import papersApi from "@/app/api/papers/papersApi";
import { RESULT_LIMIT } from "../lib/constants/common";
import axios from "axios";

const fetchQueryResult = async (query: string | null, page: number) => {
  if (
    query &&
    ["AND", "OR", "NOT"].every((operator) => !query.endsWith(operator)) &&
    page
  ) {
    return papersApi.fetchArxiv(query, RESULT_LIMIT, page - 1);
  }
};

const arXivFetcher = (...args: Parameters<typeof fetchQueryResult>) =>
  fetchQueryResult(...args).then((res) => {
    return {
      papers: res?.papers,
      totalResults: res?.totalResults,
    };
  });

const semanticScholarFetcher = async (id: string) => {
  const response = await axios.get(`/api/papers?ids=${id}`);
  return response.data;
};

export const usePapers = (searchQuery: string | null, page: number) => {
  const { data, error, isLoading } = useSWR(
    ["arxiv", searchQuery, page],
    () => arXivFetcher(searchQuery, page),
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

export const useEnrichedPaper = (id: string, shouldFetch: boolean) => {
  const { data, error, isLoading } = useSWR(
    shouldFetch ? ["semanticScholar", id] : null,
    () => semanticScholarFetcher(id),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    data,
    error,
    isLoading,
  };
};
