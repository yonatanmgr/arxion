import { create } from "zustand";

interface SQueryState {
  searchQuery: string;
  debouncedSearchQuery: string;
  setSearchQuery: (query: string) => void;
  setDebouncedSearchQuery: (query: string) => void;
}

export const useQueryState = create<SQueryState>((set) => ({
  searchQuery: "",
  debouncedSearchQuery: "",
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setDebouncedSearchQuery: (query: string) =>
    set({ debouncedSearchQuery: query }),
}));
