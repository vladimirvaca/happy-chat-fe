import InputFieldContainer from '@components/InputFieldContainer/InputFieldContainer.tsx';
import { SignUpFormData, SignUpFormErrors } from '@pages/auth/types/types.ts';
import { FormikValues, useFormik } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { ChangeEvent } from 'react';
import { styles } from './SignUpFormStyles.ts';


export interface SignUpFormProps {
  handleSubmit: (signUpFormData: SignUpFormData) => void;
}

const SignUpForm = ({ handleSubmit }: SignUpFormProps) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },

    validateOnChange: true,
    validateOnBlur: true,

    validate: (signUpFormData: SignUpFormData) => {
      const errors: SignUpFormErrors = {};

      if (!signUpFormData.name) {
        errors.name = 'Please enter your name.';
      }

      if (!signUpFormData.lastName) {
        errors.lastName = 'Please enter your last name.';
      }

      if (!signUpFormData.email) {
        errors.email = 'Please enter your email.';
      }

      if (
        signUpFormData.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(signUpFormData.email)
      ) {
        errors.email = 'Invalid email address.';
      }

      if (!signUpFormData.password) {
        errors.password = 'Password is required.';
      }

      if (signUpFormData.password && signUpFormData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long.';
      }

      if (!signUpFormData.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password.';
      } else if (signUpFormData.password && signUpFormData.confirmPassword !== signUpFormData.password) {
        errors.confirmPassword = 'Passwords do not match.';
      }

      return errors;
    },
    onSubmit: (signUpFormData: SignUpFormData) => {
      handleSubmit(signUpFormData);
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

  const getFormErrorMessage = (field: string, formik: FormikValues) =>
    isFormFieldValid(field, formik) && (
      <small className="p-error" data-test={`${field}-message`}>
        {formik.errors[field]}
      </small>
    );


  return (
    <form data-test="sign-up-form" onSubmit={formik.handleSubmit}>
      <InputFieldContainer>
        <label htmlFor="name"><strong>Name</strong></label>
        <InputText
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          data-test="name-input"
          value={formik.values.name}
          onChange={handleFieldChange}
          onBlur={formik.handleBlur}
          className={classNames({ 'p-invalid': isFormFieldValid('name', formik) })}
        />
        {getFormErrorMessage('name', formik)}
      </InputFieldContainer>
      <InputFieldContainer>
        <label htmlFor="lastName"><strong>Last name</strong></label>
        <InputText
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Enter your lastName"
          data-test="lastname-input"
          value={formik.values.lastName}
          onChange={handleFieldChange}
          onBlur={formik.handleBlur}
        />
        {getFormErrorMessage('lastName', formik)}
      </InputFieldContainer>
      <InputFieldContainer>
        <label htmlFor="email"><strong>Email</strong></label>
        <InputText
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          data-test="email-input"
          value={formik.values.email}
          onChange={handleFieldChange}
          onBlur={formik.handleBlur}
          className={classNames({ 'p-invalid': isFormFieldValid('email', formik) })}
        />
        {getFormErrorMessage('email', formik)}
      </InputFieldContainer>
      <InputFieldContainer>
        <label htmlFor="password"><strong>Password</strong></label>
        <InputText
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          data-test="password-input"
          value={formik.values.password}
          onChange={handleFieldChange}
          onBlur={formik.handleBlur}
          className={classNames({ 'p-invalid': isFormFieldValid('password', formik) })}
        />
        {getFormErrorMessage('password', formik)}
      </InputFieldContainer>
      <InputFieldContainer>
        <label htmlFor="password"><strong>Confirm Password</strong></label>
        <InputText
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm your password"
          data-test="confirmPassword-input"
          value={formik.values.confirmPassword}
          onChange={handleFieldChange}
          onBlur={formik.handleBlur}
          className={classNames({ 'p-invalid': isFormFieldValid('confirmPassword', formik) })}
        />
        {getFormErrorMessage('confirmPassword', formik)}

      </InputFieldContainer>

      <Button type="submit" label="Sign Up" data-test="signup-button" style={styles.signUpButton} />
    </form>
  );
};

export default SignUpForm;
