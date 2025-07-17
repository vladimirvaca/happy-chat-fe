import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { PrimeReactProvider } from 'primereact/api';

import 'primereact/resources/themes/lara-light-green/theme.css';
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </StrictMode>
);
