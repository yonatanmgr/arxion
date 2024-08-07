import { create } from "zustand";

interface SQueryState {
  debouncedSearchQuery: string | null;
  setDebouncedSearchQuery: (query: string | null) => void;
}

export const useCurrentQueryState = create<SQueryState>((set) => ({
  debouncedSearchQuery: "",
  setDebouncedSearchQuery: (query: string | null) =>
    set({ debouncedSearchQuery: query }),
}));
