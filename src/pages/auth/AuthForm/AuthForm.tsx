import { Card } from 'primereact/card';
import { Col, Row } from 'react-grid-system';
import { TabPanel, TabView } from 'primereact/tabview';
import LoginForm from '@components/LoginForm/LoginForm.tsx';

import './AuthFormStyles.css';

const AuthForm = () => {

  const title = (<center>Welcome to Happy Chat</center>);
  const subtitle = (<center>Connect with friends and create channels</center>);

  return (
    <Row align="center" justify="center" style={{ height: '100vh' }}>
      <Col xs={12} sm={6} md={4}>
        <Card title={title} subTitle={subtitle}>
          <TabView>
            <TabPanel header="Login" headerClassName="tab-panel">
              <LoginForm />
            </TabPanel>
            <TabPanel header="Sign Up">
              <p>Register</p>
            </TabPanel>
          </TabView>
        </Card>
      </Col>
    </Row>
  );
};

export default AuthForm;
