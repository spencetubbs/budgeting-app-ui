import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTransaction, getAllTransactions } from "../transaction.api";
import type { CreateTransactionDto, Transaction } from "../types/transaction.type";

export const useTransactions = () => {
  const query = useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: getAllTransactions,
  });

  return query;
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreateTransactionDto) => createTransaction(data),
    onSuccess: () => {
      // Refetch transactions when a new one is created
      queryClient.invalidateQueries({ queryKey: ['transactions'] });

      // TODO: use this to add the new transaction to the queryData instead of calling the GET again.
      // I want to add some extra error handling first though.
      // queryClient.setQueryData<Transaction[]>(['transactions'], (old) => {
      //   return old ? [newTransaction, ...old] : [newTransaction];
      // });
    },
  });

  return mutation;
};
