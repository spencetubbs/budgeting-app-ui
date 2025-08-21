import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { CreateTransactionDto } from '../data/types/transaction.type';
import dayjs, { Dayjs } from 'dayjs';
import { useCreateTransaction } from '../data/hooks/transaction.hooks';
import { useCategories } from '../data/hooks/category.hooks';


interface TransactionFormProps {
  onSuccess: () => void;
}

// TODO: add validation
export const TransactionForm: React.FC<TransactionFormProps> = ({ onSuccess }) => {
  const { data: categories, isLoading, error } = useCategories();
  const createTransactionMutation = useCreateTransaction();

  const { control, handleSubmit, reset } = useForm<CreateTransactionDto>({
    defaultValues: {
      amount: 0,
      category: '',
      description: '',
      date: new Date(),
    },
  });

  const onSubmit = async (data: CreateTransactionDto) => {
    console.log('Submitted:', data);
    await createTransactionMutation.mutateAsync(data);

    reset();
    onSuccess();
  };

  // Basic loading and error messages
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!categories) return <div>No categories loaded</div>;

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, width: '100%' }}
    >
      <Typography variant='h6'>New Transaction</Typography>

      {/* Amount */}
      <Controller
        name='amount'
        control={control}
        rules={{ required: true, min: 0 }}
        render={({ field }) => (
          <TextField
            {...field}
            label='Amount'
            type='number'
            required
            fullWidth
          />
        )}
      />

      {/* Category */}
      <Controller
        name='category'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField {...field} select label='Category' required fullWidth>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.name}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      {/* Description */}
      <Controller
        name='description'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label='Description'
            fullWidth
            multiline
            minRows={2}
          />
        )}
      />

      {/* Date */}
      <Controller
        name='date'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <DatePicker
            label='Date'
            value={dayjs(field.value)}
            onChange={(val: Dayjs | null) =>
              field.onChange(val ? val.toDate() : null)
            }
          />
        )}
      />

      <Button variant='contained' type='submit'>
        Create Transaction
      </Button>
    </Box>
  );
}
