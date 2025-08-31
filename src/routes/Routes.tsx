import { createBrowserRouter } from 'react-router';
import AuthPage from '../pages/auth/AuthPage.tsx';
import DashboardPage from '../pages/dashboard/DashboardPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <DashboardPage />
    )
  },
  {
    path: '/dashboard',
    element: (
      <DashboardPage />
    )
  },
  {
    path: '/auth',
    element: (
      <AuthPage />
    )
  }
]);

export default router;
