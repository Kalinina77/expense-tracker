import { CATEGORIES } from "../constants/categories.ts";

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c.name])
);

export const getCategoryName = (id: string): string => 
  CATEGORY_MAP[id] || "Неизвестно";