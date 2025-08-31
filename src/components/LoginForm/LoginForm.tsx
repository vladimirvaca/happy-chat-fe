import InputFieldContainer from '@components/InputFieldContainer/InputFieldContainer.tsx';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FormikValues, useFormik } from 'formik';
import { classNames } from 'primereact/utils';
import { ChangeEvent } from 'react';
import { LoginData, LoginFormData, LoginFormErrors } from '../../pages/auth/types/types.ts';

import { styles } from './LoginFormStyles.ts';
import { ProgressSpinner } from 'primereact/progressspinner';

interface LoginFormProps {
  handleSubmit: (loginFormData: LoginData) => void;
  isLoading: boolean;
}

const LoginForm = ({ handleSubmit, isLoading }: LoginFormProps) => {

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
        <small className="p-error" data-test={`${field}-message`}>
          {formik.errors[field]}
        </small>
      )
    );
  };


  return (<>
      {isLoading ?
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '100px', paddingBottom: '50px' }}>
          <ProgressSpinner style={{ width: '50px', height: '50px' }} />
        </div> :
        <form onSubmit={formik.handleSubmit} data-test="login-form">
          <InputFieldContainer>
            <label htmlFor="email"><strong>Email</strong></label>
            <InputText
              type="text"
              id="email"
              name="email"
              data-test="email-input"
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
              data-test="password-input"
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
            style={styles.loginButton}
            label="Login"
            data-test="login-button"
          />
        </form>}
    </>
  );
};

export default LoginForm;
