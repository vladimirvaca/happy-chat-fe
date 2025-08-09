import InputFieldContainer from '@components/InputFieldContainer/InputFieldContainer.tsx';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { type FormikValues, useFormik } from 'formik';
import { classNames } from 'primereact/utils';
import type { ChangeEvent } from 'react';
import type { LoginData, LoginFormData, LoginFormErrors } from '../../pages/auth/types.ts';

import './LoginFormStyles.css';

interface LoginFormProps {
  handleSubmit: (loginFormData: LoginData) => void;
}

const LoginForm = ({ handleSubmit }: LoginFormProps) => {

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },

    validateOnChange: true,
    validateOnBlur: true,

    validate: (loginFormData: LoginFormData) => {
      const loginFormErrors: LoginFormErrors = {};

      if (!loginFormData.email) {
        loginFormErrors.email = 'Please enter your email.';
      }

      if (loginFormData.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(loginFormData.email)
      ) {
        loginFormErrors.email = 'Invalid email address.';
      }

      if (!loginFormData.password) {
        loginFormErrors.password = 'Password is required.';
      }

      return loginFormErrors;
    },

    onSubmit: (loginForm: LoginFormData, { resetForm }) => {
      handleSubmit(loginForm);
      resetForm();
    }
  });

  const handleFieldChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    await formik.setFieldValue(name, value);
    await formik.setFieldTouched(name, true, false);
    await formik.validateField(name);
  };


  const isFormFieldValid = (field: string, formik: FormikValues) =>
    !!(formik.touched[field] && formik.errors[field]);

  const getFormErrorMessage = (field: string, formik: FormikValues) => {
    return (
      isFormFieldValid(field, formik) && (
        <small className="p-error" data-testid={`${field}-message`}>
          {formik.errors[field]}
        </small>
      )
    );
  };


  return (
    <form onSubmit={formik.handleSubmit} data-testid="login-form">
      <InputFieldContainer>
        <label htmlFor="email"><strong>Email</strong></label>
        <InputText
          type="text"
          id="email"
          name="email"
          data-testid="email-input"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={handleFieldChange}
          onBlur={formik.handleBlur}
          className={classNames({
            'p-invalid': isFormFieldValid('email', formik)
          })}
        />
        {getFormErrorMessage('email', formik)}
      </InputFieldContainer>
      <InputFieldContainer>
        <label htmlFor="password">
          <strong>Password</strong>
        </label>
        <InputText
          type="password"
          id="password"
          name="password"
          data-testid="password-input"
          placeholder="Enter your password"
          value={formik.values.password}
          onChange={handleFieldChange}
          onBlur={formik.handleBlur}
          className={classNames({
            'p-invalid': isFormFieldValid('password', formik)
          })}
        />
        {getFormErrorMessage('password', formik)}
      </InputFieldContainer>

      <Button
        type="submit"
        className="login-button"
        label="Login"
        data-testid="login-button"
      />
    </form>);
};

export default LoginForm;
