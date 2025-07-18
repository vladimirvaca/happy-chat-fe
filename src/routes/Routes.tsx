import { createBrowserRouter } from 'react-router';
import DashboardPage from '../pages/dashboard/dashboardPage.tsx';
import AuthPage from '../pages/auth/AuthPage.tsx';

const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: (
      <DashboardPage />
    )
  },
  {
    path: '/',
    element: (
      <AuthPage />
    )
  }
]);

export default router;
