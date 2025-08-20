export enum CategoryType {
  EXPENSE = 'expense',
  INCOME = 'income',
}

export interface Category {
  id: number;
  name: string;
  type: CategoryType;
  description?: string;
};
