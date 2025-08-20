import React, { useEffect, useState } from 'react';
import { Box, Card, Divider, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getAllTransactions } from '../data/transaction.api';
import type { Transaction } from '../data/types/transaction.type';
import dayjs from 'dayjs';
import './TransactionBoard.scss';

// TODO:
// 1: fix css
// 2: form to create transaction
// 3: delete transaction

export const TransactionBoard: React.FC = () => {
  // TODO: get category set up correctly
  const columnOrder = [
    'Amount',
    // 'Category',
    'Description',
    'Date',
  ];

  // TODO: move this into a custom hook if I have time.
  const { data, isLoading, error } = useQuery({
    queryKey: ['transactions'],
    queryFn: async (): Promise<Transaction[]> => {
      const response = await getAllTransactions();
      return response;
    },
  });

  const [netValue, setNetValue] = useState(0)

  useEffect(() => {
    if (!data?.length) return;

    // Calculate the net value of all transactions
    const net = data?.reduce((sum, s) => {
      const val = s.amount
      return sum + val;
    }, 0);

    setNetValue(net);
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
      <Box className='header'>
        <Typography className='title' variant="h4">Transactions</Typography>
        <Card className='net-value'>Net Amount: {formatCurrency(netValue)}</Card>
      </Box>
      <Divider className='divider' />
      {/* Header */}
      <Grid container className="transaction-header" spacing={2}>
        {columnOrder.map((col) => (
          <Grid key={col} className={`transaction-cell ${col.toLowerCase()}`}>
            {col}
          </Grid>
        ))}
      </Grid>

      {/* Data */}
      {data.map((tx) => (
        <Grid container className="transaction-row" spacing={2} key={tx.id}>
          <Grid className="transaction-cell amount">
            {formatCurrency(tx.amount)}
          </Grid>
          {/* <Grid className="transaction-cell category">
            {tx.categories.map(c => c.name).join(', ') || '-'}
          </Grid> */}
          <Grid className="transaction-cell description">
            {tx.description || '-'}
          </Grid>
          <Grid className="transaction-cell date">
            {dayjs(tx.date).format('MM/DD/YYYY')}
          </Grid>
        </Grid>
      ))}
    </Box>
  )
}
