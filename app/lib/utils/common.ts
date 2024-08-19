import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges the given class names into a single string.
 * - This function uses `clsx` and `twMerge` to merge the class names.
 * - The class names are merged in the order they are provided.
 * - The merged class names are then returned as a single string.
 *
 * @param {...ClassValue[]} inputs - The class names to merge.
 * @returns {string} - The merged class names as a single string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
