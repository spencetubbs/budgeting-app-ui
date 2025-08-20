import type { GridColDef } from "@mui/x-data-grid";
import { CategoryType } from "../data/types/category.type";
import dayjs from 'dayjs';

export const tansactionTableColumns: GridColDef[] = [
  {
    field: 'amount',
    headerName: 'Amount',
    valueGetter: (value, row) => {
      if (row.category.type === CategoryType.INCOME) {
        return value
      }
      else {
        return `-${value}`
      }
    },
    flex: 0.5,
  },
  {
    field: 'category',
    headerName: 'Category',
    valueGetter: (_, row) => row.category.name,
    flex: 0.5,
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 1,
  },
  {
    field: 'date',
    headerName: 'Date',
    valueGetter: (value) => dayjs(value).format('MM/DD/YYYY'),
    flex: 0.5,
  },
];
