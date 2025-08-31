import UserInfoCard from '@components/UserInfoCard/UserInfoCard.tsx';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

describe('UserInfoCard', () => {
  const name = 'John Doe';
  const email = 'john.doe@example.com';

  const setup = () => {
    render(
      <UserInfoCard
        name="John Doe"
        email="john.doe@example.com"
      />
    );

  };

  it('should render name and email correctly', () => {
    setup();

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(email)).toBeInTheDocument();
  });

  it('should render avatar and be aria-hidden', () => {
    const { container } = render(<UserInfoCard name={name} email={email} />);
    const avatar = container.querySelector('[aria-hidden]');
    expect(avatar).toBeInTheDocument();
  });

  it('should render the "Open profile" button', () => {
    setup();
    const button = screen.getByTestId('openProfile-button');
    expect(button).toBeInTheDocument();
  });

  it('should call onOpenProfile when the button is clicked', async () => {
    const onOpenProfile = vi.fn();
    render(
      <UserInfoCard
        name="John Doe"
        email="john.doe@example.com"
        onOpenProfile={onOpenProfile}
      />
    );

    const button = screen.getByTestId('openProfile-button');
    await userEvent.click(button);

    expect(onOpenProfile).toHaveBeenCalledTimes(1);
  });

  it('should support keyboard activation (Enter) on the button', async () => {
    const onOpenProfile = vi.fn();
    render(
      <UserInfoCard
        name="John Doe"
        email="john.doe@example.com"
        onOpenProfile={onOpenProfile}
      />
    );

    const button = screen.getByTestId('openProfile-button');
    button.focus();
    await userEvent.keyboard('{Enter}');

    expect(onOpenProfile).toHaveBeenCalledTimes(1);
  });

  it('should not throw when onOpenProfile is not provided', async () => {
    setup();

    const button = screen.getByTestId('openProfile-button');
    await expect(userEvent.click(button)).resolves.not.toThrow();
  });
});
