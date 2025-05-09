import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names using clsx and resolves Tailwind class conflicts.
 * @param inputs - Accepts strings, conditionals, arrays, etc.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(...inputs));
}
