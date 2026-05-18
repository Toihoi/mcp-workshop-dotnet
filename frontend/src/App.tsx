import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import Toast from './components/common/Toast';
import TaskDetailModal from './components/task/TaskDetailModal';
import NewTaskModal from './components/task/NewTaskModal';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <TaskDetailModal />
      <NewTaskModal />
      <Toast />
    </QueryClientProvider>
  );
}

export default App;
