import { api } from "./app.api"
import type { Transaction } from "./types/transaction.type";

export const getAllTransactions = async (): Promise<Transaction[]> => {
  const { data } = await api.get('/transaction')
  return data as Transaction[];
}
