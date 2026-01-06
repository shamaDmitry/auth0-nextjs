import { Role } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRole = (role: Role) => {
  switch (role.slug) {
    case "admin":
      return "Administrator";
    case "moderator":
      return "Moderator";
    case "user":
      return "User";
    default:
      return "Guest";
  }
};
