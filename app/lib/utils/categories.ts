import { CATEGORIES } from "@/app/lib/constants/categories";
import { TSubjectWithCategory, TCategory } from "@/app/types";

/**
 * Finds a subject in the CATEGORIES array based on the provided abbreviation.
 * If the subject is found, it returns the subject with its corresponding category.
 * If the subject is not found, it returns undefined.
 *
 * @param {string} abbreviation - The abbreviation of the subject to search for.
 * @returns {TSubjectWithCategory | undefined} - The subject with its category if found, otherwise undefined.
 */
export const getSubjectWithCategory = (
  abbreviation: string,
): TSubjectWithCategory | undefined => {
  const foundSubject = CATEGORIES.map((c) => c.subjects)
    .flat()
    .find((s) => s.abbreviation.toLowerCase() == abbreviation.toLowerCase());

  if (foundSubject) {
    const foundCategory = CATEGORIES.find((c) =>
      c.subjects.includes(foundSubject),
    );
    const subjectWithCategory = {
      ...foundSubject,
      category: foundCategory!.category,
    };
    return subjectWithCategory;
  }
};

/**
 * Flattens an array of categories into an array of subjects with their corresponding category.
 *
 * @param {TCategory[]} categories - The array of categories to flatten.
 * @returns {TSubjectWithCategory[]} - The flattened array of subjects with their categories.
 */
export const flattenCategories = (
  categories: TCategory[],
): TSubjectWithCategory[] => {
  return categories.flatMap((category) =>
    category.subjects.map((subject) => ({
      ...subject,
      category: category.category,
    })),
  );
};

/**
 * Groups subjects by their categories and returns an array of grouped subjects.
 *
 * @param {TCategory[]} categories - The array of categories to group subjects from.
 * @returns {Array<{ label: string; options: { value: string; label: string }[] }>} - The array of grouped subjects.
 */
export const buildGroupedSubjects = (
  categories: TCategory[],
): Array<{ label: string; options: { value: string; label: string }[] }> => {
  return categories.map((category) => ({
    label: category.category,
    options: category.subjects.map((subject) => ({
      value: subject.abbreviation,
      label: `${subject.abbreviation} (${subject.full_name})`,
    })),
  }));
};
