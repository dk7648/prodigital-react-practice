import './index.css';
import { RouterProvider } from 'react-router/dom';
import { router } from './router';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './features/auth/components/auth-provider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/query-client';
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router}></RouterProvider>
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
