import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TransactionBoard } from "./pages/TransactionBoard"

const queryClient = new QueryClient();

export const App: React.FC = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <TransactionBoard />
    </QueryClientProvider>
  )
}
