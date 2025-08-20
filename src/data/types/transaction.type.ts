import type { Category } from "./category.type";

export interface Transaction {
  id: number;
  amount: number;
  description?: string;
  date: Date;
  category: Category;
};

export interface CreateTransactionDto {
  amount: number;
  category: string;
  description?: string;
  date: Date;
};
