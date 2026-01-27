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


/**
 * Performs a basic email format validation.
 *
 * Checks whether the provided string matches a simple email pattern
 * (`local-part@domain.tld`). This validation ensures correct syntax only
 * and does NOT verify domain existence, mailbox availability, or deliverability.
 *
 * Intended for frontend form validation and UI feedback.
 *
 * @param value - The email address string to validate.
 * @returns `true` if the email format is valid, otherwise `false`.
 */
export function validateEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
