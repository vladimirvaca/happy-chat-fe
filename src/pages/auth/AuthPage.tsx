import { isTokenValid } from '@routes/ProtectedRoute/ProtectedUtils.ts';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useEffect, useState } from 'react';
import { Container } from 'react-grid-system';
import { Navigate } from 'react-router';
import AuthForm from './AuthForm/AuthForm.tsx';
import { styles } from './AuthPageStyles.ts';

const AuthPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authenticated = isTokenValid();
    setIsAuthenticated(authenticated);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div style={styles.spinnerContainer}>
        <ProgressSpinner />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Container fluid>
      <AuthForm />
    </Container>
  );
};

export default AuthPage;
