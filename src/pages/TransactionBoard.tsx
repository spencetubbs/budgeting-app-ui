import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Dialog, DialogContent, Divider, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTransactions } from '../data/hooks/transaction.hooks';
import { tansactionTableColumns } from '../constants/transaction.constants';
import { CategoryType } from '../data/types/category.type';
import { TransactionForm } from '../components/TransactionForm'; 
import './TransactionBoard.scss';


// TODO:
// - delete transaction

export const TransactionBoard: React.FC = () => {
  const { data, isLoading, error } = useTransactions();
  const [netAmount, setNetAmount] = useState(0)
  const [openForm, setOpenForm] = useState(false);

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
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={tansactionTableColumns}
          initialState={{
            sorting: {
              sortModel: [{ field: 'date', sort: 'desc' }],
            },
          }}
          sx={{ border: 0 }}
        />
      </Paper>

      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogContent className='dialog-form-content'>
          <TransactionForm onSuccess={() => setOpenForm(false)} />
        </DialogContent>
      </Dialog>
    </Box>
  )
}
