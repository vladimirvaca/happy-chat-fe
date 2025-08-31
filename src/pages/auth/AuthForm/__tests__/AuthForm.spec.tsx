import { LoginFormProps } from '@components/LoginForm/LoginForm.tsx';
import { SignUpFormProps } from '@components/SignUpForm/SignUpForm.tsx';
import AuthForm from '@pages/auth/AuthForm/AuthForm.tsx';
import { LoginFormData, LoginResponse } from '@pages/auth/types/types.ts';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate
}));

type MutationParams = {
  mutationFn: (data: LoginFormData) => Promise<LoginResponse>;
  onSuccess: (data: LoginResponse) => void;
  onError: (error: unknown) => void;
};

vi.mock('@tanstack/react-query', () => ({
  useMutation: ({ mutationFn, onSuccess, onError }: MutationParams) => ({
    mutate: (data: LoginFormData) => mockMutate(data, mutationFn, onSuccess, onError),
    isPending: false
  })
}));

// Mock component dependencies
vi.mock('@components/LoginForm/LoginForm.tsx', () => ({
  default: ({ handleSubmit, isLoading }: LoginFormProps) => (
    <div data-test="login-form-component">
      <button data-test="mock-login-submit"
              onClick={() => handleSubmit({ email: 'test@example.com', password: 'password123' })}>
        Submit Login
      </button>
      <span data-test="loading-state">{isLoading ? 'Loading' : 'Not Loading'}</span>
    </div>
  )
}));

vi.mock('@components/SignUpForm/SignUpForm.tsx', () => ({
  default: ({ handleSubmit }: SignUpFormProps) => (
    <div data-test="signup-form-component">
      <button data-test="mock-signup-submit" onClick={() => handleSubmit}>
        Submit Signup
      </button>
    </div>
  )
}));

const mockNavigate = vi.fn();
const mockMutate = vi.fn();

describe('AuthForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the card with title and subtitle', () => {
    render(<AuthForm />);

    expect(screen.getByText(/welcome to happy chat/i)).toBeInTheDocument();
    expect(screen.getByText(/connect with friends and create channels/i)).toBeInTheDocument();
  });

  it('should render TabView with Login and Sign Up tabs', () => {
    render(<AuthForm />);

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('should render LoginForm component by default', () => {
    render(<AuthForm />);

    expect(screen.getByTestId('login-form-component')).toBeInTheDocument();
    expect(screen.getByTestId('loading-state')).toHaveTextContent('Not Loading');
  });

  it('should switch to SignUpForm when SignUp tab is clicked', async () => {
    render(<AuthForm />);

    const signUpTab = screen.getByText('Sign Up');
    await userEvent.click(signUpTab);

    expect(screen.getByTestId('signup-form-component')).toBeInTheDocument();
  });

  it('should render Toast component', () => {
    render(<AuthForm />);

    expect(screen.getByTestId('toast')).toBeInTheDocument();
  });
});
