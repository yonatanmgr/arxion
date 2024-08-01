import { create } from "zustand";

type SQueryState = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export const QueryState = create<SQueryState>((set) => ({
  searchQuery: "",
  setSearchQuery: (query: string) => set({ searchQuery: query }),
}));
