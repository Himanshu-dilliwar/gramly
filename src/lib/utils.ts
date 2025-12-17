import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const duplicateValidation = <T>(
  arr: T[],
  el: T
): T[] => {
  if (!arr.includes(el)) {
    return [...arr, el]
  }

  return arr.filter((t) => t !== el)
}

