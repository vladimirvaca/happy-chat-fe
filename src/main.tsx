import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PrimeReactProvider } from 'primereact/api';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import router from './routes/Routes.tsx'; //icons


import 'primereact/resources/themes/lara-light-green/theme.css';
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css';
import './index.css';


const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <PrimeReactProvider>
      <RouterProvider router={router} />
    </PrimeReactProvider>
    </QueryClientProvider>
  </StrictMode>
);
