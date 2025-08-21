import { api } from "./app.api"
import type { CreateTransactionDto, Transaction } from "../types/transaction.type";


export const createTransaction = async (body: CreateTransactionDto): Promise<Transaction> => {
  const { data } = await api.post('/transaction/create', body)
  return data as Transaction;
}

export const getAllTransactions = async (): Promise<Transaction[]> => {
  const { data } = await api.get('/transaction')
  return data as Transaction[];
}

export const deleteTransaction = async (id: number): Promise<void> => {
  await api.delete(`/transaction/${id}`)
}
