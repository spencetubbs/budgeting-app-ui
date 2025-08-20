import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TransactionBoard } from "./pages/TransactionBoard"

const queryClient = new QueryClient();

export const App: React.FC = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TransactionBoard />
      </LocalizationProvider>
    </QueryClientProvider>
  )
}
