import InputFieldContainer from '@components/InputFieldContainer/InputFieldContainer.tsx';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import './SignUpFormStyles.css';

const SignUpForm = () => {
  return (
    <form data-testid="sign-up-form">
      <InputFieldContainer>
        <label htmlFor="name"><strong>Name</strong></label>
        <InputText type="text" id="name" name="name" placeholder="Enter your name" />
      </InputFieldContainer>
      <InputFieldContainer>
        <label htmlFor="email"><strong>Lastname</strong></label>
        <InputText type="text" id="lastname" name="lastname" placeholder="Enter your lastname" />
      </InputFieldContainer>
      <InputFieldContainer>
        <label htmlFor="email"><strong>Email</strong></label>
        <InputText type="email" id="email" name="email" placeholder="Enter your email" />
      </InputFieldContainer>
      <InputFieldContainer>
        <label htmlFor="password"><strong>Password</strong></label>
        <InputText type="password" id="password" name="password" placeholder="Enter your password" />
      </InputFieldContainer>

      <Button type="submit" label="Sign Up" data-testid="sign-up-button" className="sign-up-button" />
    </form>
  );
};

export default SignUpForm;
