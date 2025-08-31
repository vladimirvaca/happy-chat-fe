import AuthPage from '@pages/auth/AuthPage.tsx';
import DashboardPage from '@pages/dashboard/DashboardPage.tsx';
import ProtectedRoute from '@routes/ProtectedRoute/ProtectedRoute.tsx';
import { createBrowserRouter, Navigate } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/auth" replace />
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
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
