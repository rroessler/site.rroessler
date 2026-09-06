/// Vendor Modules
import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';

/**
 * Handles merging dynamic class-names.
 * @param inputs                Inputs to bind.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
