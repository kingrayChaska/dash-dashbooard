import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function formatDate(time: string): string {
  return new Date(time).toLocaleTimeString(); // Customize as needed
}

// Utility for conditional className joining and tailwind merging
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
