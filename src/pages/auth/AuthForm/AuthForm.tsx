import LoginForm from '@components/LoginForm/LoginForm.tsx';
import SignUpForm from '@components/SignUpForm/SignUpForm.tsx';
import useLoginMutation from '@pages/auth/AuthForm/useLoginMutation.ts';
import useSignUpMutation from '@pages/auth/AuthForm/useSignUpMutation.ts';
import { Card } from 'primereact/card';
import { TabPanel, TabView } from 'primereact/tabview';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';
import { Col, Row } from 'react-grid-system';
import { LoginFormData, SignUpFormData } from '../types/types.ts';
import { styles } from './AuthFormStyles.ts';


const AuthForm = () => {
  const toast = useRef<Toast>(null);
  const [activeIndexTab, setActiveIndexTab] = useState<number>(0);

  const loginMutation = useLoginMutation(toast);
  const signUpMutation = useSignUpMutation({ toast, setActiveIndexTab });

  const handleSubmitLoginForm = (loginFormData: LoginFormData) => {
    loginMutation.mutate(loginFormData);
  };

  const handleSubmitSignUpForm = (signUpFormData: SignUpFormData) => {
    signUpMutation.mutate(signUpFormData);
  };

  const title = (<center>Welcome to Happy Chat</center>);

  const subtitle = (<center>Connect with friends and create channels</center>);

  return (
    <>
      <Toast ref={toast} data-test="toast" />
      <Row align="center" justify="center" style={{ height: '100vh' }}>
        <Col xs={12} sm={6} md={8} lg={6} xl={4}>
          <Card title={title} subTitle={subtitle}>
            <TabView activeIndex={activeIndexTab} onTabChange={(e) => setActiveIndexTab(e.index)} data-test="tabview">
              <TabPanel header="Login" headerStyle={styles.tabPanelHeader}>
                < LoginForm handleSubmit={handleSubmitLoginForm} isLoading={loginMutation.isPending} />
              </TabPanel>
              <TabPanel header="Sign Up" headerStyle={styles.tabPanelHeader}>
                <SignUpForm handleSubmit={handleSubmitSignUpForm} />
              </TabPanel>
            </TabView>
          </Card>
        </Col>
      </Row>
    </>

  );
};

export default AuthForm;
