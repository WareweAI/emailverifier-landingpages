import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines and conditionally applies class names,
 * while intelligently resolving Tailwind CSS class conflicts.
 * 
 * Intended for reusable components that accept a `className` prop.
 * @param inputs - Class values (strings, arrays, objects, conditionals)
 * @returns A single merged className string with conflicts resolved
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
