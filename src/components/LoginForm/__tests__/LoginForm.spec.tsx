import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '@components/LoginForm/LoginForm.tsx';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

describe('LoginForm', () => {
  const mockHandleSubmit = vi.fn();

  beforeEach(() => {
    mockHandleSubmit.mockClear();
  });

  it('should render all form elements correctly', () => {
    render(<LoginForm handleSubmit={mockHandleSubmit} />);

    // Check for form elements
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
  });

  it('should shows validation errors for empty fields on blur', async () => {
    render(<LoginForm handleSubmit={mockHandleSubmit} />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    // Trigger blur events
    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);

    // Wait for error messages
    await waitFor(() => {
      expect(screen.getByTestId('email-message')).toHaveTextContent('Please enter your email.');
      expect(screen.getByTestId('password-message')).toHaveTextContent('Password is required.');
    });
  });

  it('should validates email format correctly', async () => {
    render(<LoginForm handleSubmit={mockHandleSubmit} />);

    const emailInput = screen.getByTestId('email-input');

    // Test invalid email
    await userEvent.type(emailInput, 'invalid-email');
    await waitFor(() => {
      expect(screen.getByTestId('email-message')).toHaveTextContent('Invalid email address.');
    });

    // Clear and test valid email
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'test@example.com');
    await waitFor(() => {
      expect(screen.queryByTestId('email-message')).not.toBeInTheDocument();
    });
  });

  it('should updates form values on input change', async () => {
    render(<LoginForm handleSubmit={mockHandleSubmit} />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('should validates fields on every character input', async () => {
    render(<LoginForm handleSubmit={mockHandleSubmit} />);

    const emailInput = screen.getByTestId('email-input');

    // Type invalid email character by character
    await userEvent.type(emailInput, 'test');
    await waitFor(() => {
      expect(screen.getByTestId('email-message')).toHaveTextContent('Invalid email address.');
    });

    // Complete with valid email
    await userEvent.type(emailInput, '@example.com');
    await waitFor(() => {
      expect(screen.queryByTestId('email-message')).not.toBeInTheDocument();
    });
  });

  it('should handles form submission correctly with valid data', async () => {
    render(<LoginForm handleSubmit={mockHandleSubmit} />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('login-button');

    // Fill invalid data
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    // Submit form
    await userEvent.click(submitButton);

    // Verify form submission
    expect(mockHandleSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });

    // Check if fields are cleared after submission
    await waitFor(() => {
      expect(emailInput).toHaveValue('');
      expect(passwordInput).toHaveValue('');
    });
  });

  it('does not submit form with invalid data', async () => {
    render(<LoginForm handleSubmit={mockHandleSubmit} />);

    const emailInput = screen.getByTestId('email-input');
    const submitButton = screen.getByTestId('login-button');

    // Fill invalid data
    await userEvent.type(emailInput, 'invalid-email');

    // Try to submit form
    await userEvent.click(submitButton);

    // Verify form was not submitted
    expect(mockHandleSubmit).not.toHaveBeenCalled();
  });
});
