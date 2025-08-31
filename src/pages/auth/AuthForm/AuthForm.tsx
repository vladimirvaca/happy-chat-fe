import LoginForm from '@components/LoginForm/LoginForm.tsx';
import SignUpForm from '@components/SignUpForm/SignUpForm.tsx';
import AuthServices from '@services/AuthServices.ts';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Card } from 'primereact/card';
import { TabPanel, TabView } from 'primereact/tabview';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { Col, Row } from 'react-grid-system';
import { useNavigate } from 'react-router';
import { LoginFormData, LoginResponse } from '../types/types.ts';
import { styles } from './AuthFormStyles.ts';


const AuthForm = () => {
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (loginFormData: LoginFormData) => AuthServices.login(loginFormData),
    onSuccess: (data: LoginResponse) => {
      localStorage.setItem('token', data.accessToken);
      navigate('/dashboard');
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.current?.show({
          severity: 'warn',
          summary: error?.response?.data.error,
          detail: error?.response?.data.message,
          life: 5000
        });
      } else {
        toast.current?.show({ severity: 'warn', summary: 'Error', detail: error.message, life: 5000 });
      }
    }
  });

  const handleSubmitLoginForm = (loginFormData: LoginFormData) => {
    loginMutation.mutate(loginFormData);
  };

  const title = (<center>Welcome to Happy Chat</center>);

  const subtitle = (<center>Connect with friends and create channels</center>);

  return (
    <>
      <Toast ref={toast} data-test="toast" />
      <Row align="center" justify="center" style={{ height: '100vh' }}>
        <Col xs={12} sm={6} md={8} lg={6} xl={4}>
          <Card title={title} subTitle={subtitle}>
            <TabView>
              <TabPanel header="Login" headerStyle={styles.tabPanelHeader}>
                < LoginForm handleSubmit={handleSubmitLoginForm} isLoading={loginMutation.isPending} />
              </TabPanel>
              <TabPanel header="Sign Up" headerStyle={styles.tabPanelHeader}>
                <SignUpForm handleSubmit={() => {
                }} />
              </TabPanel>
            </TabView>
          </Card>
        </Col>
      </Row>
    </>

  );
};

export default AuthForm;
