import { create } from "zustand";
import { TArxivEntry } from "@/app/types";

interface PapersStore {
  papers: TArxivEntry[] | null;
  setPapers: (papers: TArxivEntry[]) => void;
}

export const usePapersStore = create<PapersStore>((set) => ({
  papers: null,
  setPapers: (papers) => set({ papers }),
}));
