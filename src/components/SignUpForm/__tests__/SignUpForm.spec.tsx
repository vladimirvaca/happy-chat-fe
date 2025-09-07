import SignUpForm from '@components/SignUpForm/SignUpForm.tsx';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, vi } from 'vitest';

describe('SignUpForm', () => {
  const mockHandleSubmit = vi.fn();

  const setup = () => {
    render(<SignUpForm handleSubmit={mockHandleSubmit} />);
  };

  beforeEach(() => {
    mockHandleSubmit.mockClear();
  });

  it('should render all form elements correctly', () => {
    setup();

    expect(screen.getByTestId('name-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('confirmPassword-input')).toBeInTheDocument();
    expect(screen.getByTestId('signup-button')).toBeInTheDocument();
  });

  it('should show validation errors for empty fields on blur', async () => {
    setup();

    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('confirmPassword-input');

    fireEvent.blur(nameInput);
    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);
    fireEvent.blur(confirmPasswordInput);

    await waitFor(() => {
      expect(screen.getByTestId('name-message')).toHaveTextContent('Please enter your name.');
      expect(screen.getByTestId('email-message')).toHaveTextContent('Please enter your email.');
      expect(screen.getByTestId('password-message')).toHaveTextContent('Password is required.');
      expect(screen.getByTestId('confirmPassword-message')).toHaveTextContent('Please confirm your password.');
    });
  });

  it('should validate email format correctly', async () => {
    setup();

    const emailInput = screen.getByTestId('email-input');

    await userEvent.type(emailInput, 'invalid-email');
    await waitFor(() => {
      expect(screen.getByTestId('email-message')).toHaveTextContent('Invalid email address.');
    });

    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'test@example.com');
    await waitFor(() => {
      expect(screen.queryByTestId('email-message')).not.toBeInTheDocument();
    });
  });

  it('should show error when passwords do not match and clear when they match', async () => {
    setup();

    const passwordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('confirmPassword-input');

    await userEvent.type(passwordInput, 'Password123!');
    await userEvent.type(confirmPasswordInput, 'Different123!');
    await waitFor(() => {
      expect(screen.getByTestId('confirmPassword-message')).toHaveTextContent('Passwords do not match.');
    });

    await userEvent.clear(confirmPasswordInput);
    await userEvent.type(confirmPasswordInput, 'Password123!');
    await waitFor(() => {
      expect(screen.queryByTestId('confirmPassword-message')).not.toBeInTheDocument();
    });
  });

  it('should update form values on input change', async () => {
    setup();

    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('confirmPassword-input');

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(passwordInput, 'Password123!');
    await userEvent.type(confirmPasswordInput, 'Password123!');

    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(passwordInput).toHaveValue('Password123!');
    expect(confirmPasswordInput).toHaveValue('Password123!');
  });

  it('should validate fields on every character input (email)', async () => {
    setup();

    const emailInput = screen.getByTestId('email-input');

    await userEvent.type(emailInput, 'test');
    await waitFor(() => {
      expect(screen.getByTestId('email-message')).toHaveTextContent('Invalid email address.');
    });

    await userEvent.type(emailInput, '@example.com');
    await waitFor(() => {
      expect(screen.queryByTestId('email-message')).not.toBeInTheDocument();
    });
  });

  it('should handle form submission correctly with valid data', async () => {
    setup();

    const nameInput = screen.getByTestId('name-input');
    const lastNameInput = screen.getByTestId('lastName-input');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('confirmPassword-input');
    const submitButton = screen.getByTestId('signup-button');

    await userEvent.type(nameInput, 'John');
    await userEvent.type(lastNameInput, 'Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(passwordInput, 'Password123!');
    await userEvent.type(confirmPasswordInput, 'Password123!');

    await userEvent.click(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalledWith({
      name: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!'
    });

    await waitFor(() => {
      expect(nameInput).toHaveValue('John');
      expect(lastNameInput).toHaveValue('Doe');
      expect(emailInput).toHaveValue( 'john@example.com');
      expect(passwordInput).toHaveValue( 'Password123!');
      expect(confirmPasswordInput).toHaveValue( 'Password123!');
    });
  });

  it('should not submit the form when there are validation errors', async () => {
    setup();

    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('confirmPassword-input');
    const submitButton = screen.getByTestId('signup-button');

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.type(passwordInput, 'Password123!');
    await userEvent.type(confirmPasswordInput, 'Different123!');

    await userEvent.click(submitButton);

    expect(mockHandleSubmit).not.toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByTestId('email-message')).toHaveTextContent('Invalid email address.');
      expect(screen.getByTestId('confirmPassword-message')).toHaveTextContent('Passwords do not match.');
    });
  });
});
