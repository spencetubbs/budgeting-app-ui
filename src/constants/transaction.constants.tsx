import type { GridColDef } from "@mui/x-data-grid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { CategoryType } from "../data/types/category.type";
import DeleteIcon from '@mui/icons-material/Delete';
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
    valueFormatter: (value) => dayjs(value).format('MM/DD/YYYY'),
    flex: 0.5,
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    flex: 0.3,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<DeleteIcon color="error" />}
        label="Delete"
        onClick={() => params.row.onDelete(params.row)}
        showInMenu={false}
      />,
    ],
  },
];
