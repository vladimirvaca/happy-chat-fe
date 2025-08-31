import ProtectedRoute from '@routes/ProtectedRoute/ProtectedRoute';
import * as ProtectedUtils from '@routes/ProtectedRoute/ProtectedUtils';
import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { vi } from 'vitest';

const mockNavigate = vi.fn(({ to, replace }) =>
  <div data-test="navigate-mock" data-to={to} data-replace={replace ? 'true' : 'false'} />
);

vi.mock('@routes/ProtectedRoute/ProtectedUtils.ts', () => ({
  isTokenValid: vi.fn()
}));

vi.mock('react-router', () => ({
  Navigate: (props: { to: string; replace?: boolean }) => mockNavigate(props)
}));

const MockRouter = ({ children }: { children: ReactNode }) => <div data-test="router-mock">{children}</div>;

describe('ProtectedRoute', () => {
  const TestChild = () => <div data-test="test-child">Protected Content</div>;

  const setup = (isAuthenticated = false) => {
    vi.mocked(ProtectedUtils.isTokenValid).mockReturnValue(isAuthenticated);

    return render(
      <MockRouter>
        <ProtectedRoute>
          <TestChild />
        </ProtectedRoute>
      </MockRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render children when user is authenticated', () => {
    setup(true);

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Protected Content')).toBeInTheDocument();

    expect(ProtectedUtils.isTokenValid).toHaveBeenCalledTimes(1);
  });

  it('should redirect to auth page when user is not authenticated', () => {
    setup(false);

    expect(screen.queryByTestId('test-child')).not.toBeInTheDocument();

    expect(ProtectedUtils.isTokenValid).toHaveBeenCalledTimes(1);

    const navigateMock = screen.getByTestId('navigate-mock');
    expect(navigateMock).toBeInTheDocument();
    expect(navigateMock).toHaveAttribute('data-to', '/auth');
    expect(navigateMock).toHaveAttribute('data-replace', 'true');
  });

  it('should not redirect when token is valid', () => {
    setup(true);

    expect(ProtectedUtils.isTokenValid).toHaveBeenCalledTimes(1);

    // Make sure we can see the protected content
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Protected Content')).toBeInTheDocument();

    // Ensure no navigation occurred
    expect(screen.queryByTestId('navigate-mock')).not.toBeInTheDocument();
  });

  it('should integrate correctly with the isTokenValid utility', () => {
    vi.mocked(ProtectedUtils.isTokenValid).mockReturnValue(false);
    const { rerender } = render(
      <MockRouter>
        <ProtectedRoute>
          <TestChild />
        </ProtectedRoute>
      </MockRouter>
    );

    // Verify child is not rendered
    expect(screen.queryByTestId('test-child')).not.toBeInTheDocument();
    expect(screen.getByTestId('navigate-mock')).toBeInTheDocument();

    // Now test with valid token
    vi.mocked(ProtectedUtils.isTokenValid).mockReturnValue(true);
    rerender(
      <MockRouter>
        <ProtectedRoute>
          <TestChild />
        </ProtectedRoute>
      </MockRouter>
    );

    // Verify child is now rendered
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.queryByTestId('navigate-mock')).not.toBeInTheDocument();
  });
});
