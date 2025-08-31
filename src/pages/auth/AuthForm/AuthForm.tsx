import { Card } from 'primereact/card';
import { Col, Row } from 'react-grid-system';
import { TabPanel, TabView } from 'primereact/tabview';
import LoginForm from '@components/LoginForm/LoginForm.tsx';
import SignUpForm from '@components/SignUpForm/SignUpForm.tsx';
import { LoginFormData } from '../types/types.ts';
import { useMutation } from '@tanstack/react-query';
import AuthServices from '../../../services/AuthServices.ts';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

import { styles } from './AuthFormStyles.ts';


const AuthForm = () => {
  const toast = useRef<Toast>(null);

  const loginMutation = useMutation({
    mutationFn: (loginFormData: LoginFormData) => AuthServices.login(loginFormData),
    onSuccess: () => {
      toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Login successful', life: 5000 });
    },
    onError: (error) => {
      toast!.current?.show({ severity: 'warn', summary: 'Login Failed.', detail: error.message, life: 5000 });
    }
  });

  const handleSubmitLoginForm = (loginFormData: LoginFormData) => {
    loginMutation.mutate(loginFormData);
  };

  const title = (
    <center>Welcome to Happy Chat</center>);
  const subtitle = (<center>Connect with friends and create channels</center>);

  return (
    <>
      <Toast ref={toast} />
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
