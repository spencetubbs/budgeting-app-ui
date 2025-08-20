import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDeleteTransaction, useTransactions } from '../data/hooks/transaction.hooks';
import { tansactionTableColumns } from '../constants/transaction.constants';
import { CategoryType } from '../data/types/category.type';
import { TransactionForm } from '../components/TransactionForm';
import type { Transaction } from "../data/types/transaction.type";
import './TransactionBoard.scss';


export const TransactionBoard: React.FC = () => {
  const { data, isLoading, error } = useTransactions();
  const deleteTransactionMutation = useDeleteTransaction();

  const [netAmount, setNetAmount] = useState(0)
  const [openForm, setOpenForm] = useState(false);
  const [deleteTransaction, setDeleteTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    if (!data?.length) return;

    // Calculate the net value of all transactions
    const net = data?.reduce((sum, s) => {
      const val = Number(s.amount)
      return s.category.type === CategoryType.INCOME ? sum + val : sum - val;
    }, 0);

    setNetAmount(net);
  }, [data])

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  // Basic loading and error messages
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!data) return <div>No data loaded</div>;

  return (
    <Box id='transaction-board' sx={{ flexGrow: 1, padding: 2 }}>
      <Box className="header">
        <Box className="left">
          <Typography className="title" variant="h4">
            Transactions
          </Typography>
          <Card className="net-value">
            Net Amount: {formatCurrency(netAmount)}
          </Card>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenForm(true)}
        >
          New Transaction
        </Button>
      </Box>
      <Divider className='divider' />

      { /* Transaction Table */}
      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={data.map(tx => ({ ...tx, onDelete: setDeleteTransaction }))}
          columns={tansactionTableColumns}
          initialState={{
            sorting: {
              sortModel: [{ field: 'date', sort: 'desc' }],
            },
          }}
          sx={{ border: 0 }}
        />
      </Paper>

      { /* Create Transaction Form */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogContent className='dialog-form-content'>
          <TransactionForm onSuccess={() => setOpenForm(false)} />
        </DialogContent>
      </Dialog>

      { /* Delete Transaction Confirmation */}
      <Dialog
        open={!!deleteTransaction}
        onClose={() => setDeleteTransaction(null)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this transaction?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTransaction(null)}>Cancel</Button>
          <Button
            color="error"
            onClick={async () => {
              if (!deleteTransaction) return;
              await deleteTransactionMutation.mutateAsync(deleteTransaction.id);
              setDeleteTransaction(null);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
