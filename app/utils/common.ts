import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Subject } from "../types";
import { CATEGORIES } from "../categories";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const findSubject = (
  short: string
): (Subject & { category: string }) | undefined => {
  const foundSubject = CATEGORIES.map((c) => c.subjects)
    .flat()
    .find((s) => s.abbreviation.toLowerCase() == short.toLowerCase());

  if (foundSubject) {
    const foundCategory = CATEGORIES.find((c) =>
      c.subjects.includes(foundSubject)
    );
    const subjectWithCategory = {
      ...foundSubject,
      category: foundCategory!.category,
    };
    return subjectWithCategory;
  }
};
