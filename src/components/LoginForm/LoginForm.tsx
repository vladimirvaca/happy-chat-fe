import InputFieldContainer from '@components/InputFieldContainer/InputFieldContainer.tsx';
import { InputText } from 'primereact/inputtext';

const LoginForm = () => {
  return (
    <>
      <InputFieldContainer>
        <label htmlFor="email"><strong>Email</strong></label>
        <InputText type="text" id="email" placeholder="Enter your email" />
      </InputFieldContainer>
      <InputFieldContainer>
        <label htmlFor="password"><strong>Password</strong></label>
        <InputText type="text" id="password" placeholder="Enter your password" />
      </InputFieldContainer>
    </>);
};

export default LoginForm;
