import type { GridColDef } from "@mui/x-data-grid";
import dayjs from 'dayjs';

export const tansactionTableColumns: GridColDef[] = [
  {
    field: 'amount',
    headerName: 'Product Name',
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
