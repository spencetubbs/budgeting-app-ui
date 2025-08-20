import type { Category } from "./category.type";

export interface Transaction {
  id: number;
  amount: number;
  description?: string;
  date: Date;
  category: Category;
};
