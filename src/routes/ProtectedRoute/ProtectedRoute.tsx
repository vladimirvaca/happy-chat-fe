import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router';
import { isTokenValid } from './ProtectedUtils.ts';

export interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = isTokenValid();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
