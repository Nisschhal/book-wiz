import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// split: firstName lastName
// get [0] item from each: [f,l]
// join them fl
// capatilize FL
export const getInitials = (name: string) =>
  name
    .split(" ")
    .map((ch) => ch[0])
    .join("")
    .toUpperCase();
