import { Card } from 'primereact/card';
import { Col, Row } from 'react-grid-system';
import { TabPanel, TabView } from 'primereact/tabview';
import LoginForm from '@components/LoginForm/LoginForm.tsx';
import SignUpForm from '@components/SignUpForm/SignUpForm.tsx';

import { styles } from './AuthFormStyles.ts';

const AuthForm = () => {

  const title = (
    <center>Welcome to Happy Chat</center>);
  const subtitle = (<center>Connect with friends and create channels</center>);

  return (
    <Row align="center" justify="center" style={{ height: '100vh' }}>
      <Col xs={12} sm={6} md={8} lg={6} xl={4}>
        <Card title={title} subTitle={subtitle}>
          <TabView>
            <TabPanel header="Login" headerStyle={styles.tabPanelHeader}>
              < LoginForm handleSubmit={() => {
              }} />
            </TabPanel>
            <TabPanel header="Sign Up" headerStyle={styles.tabPanelHeader}>
              <SignUpForm />
            </TabPanel>
          </TabView>
        </Card>
      </Col>
    </Row>
  );
};

export default AuthForm;
