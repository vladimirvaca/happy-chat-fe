import WelcomePanel from '@components/WelcomePanel/WelcomePanel.tsx';
import { render, screen } from '@testing-library/react';

describe('WelcomePanel', () => {
  const titleText = /welcome to happychat/i;
  const subtitleText = /select a channel or start a direct message to begin chatting/i;

  it('should render the welcome title and subtitle', () => {
    render(<WelcomePanel />);

    expect(screen.getByRole('heading', { level: 2, name: titleText })).toBeInTheDocument();
    expect(screen.getByText(subtitleText)).toBeInTheDocument();
  });

  it('should render the icon and it should be aria-hidden', () => {
    const { container } = render(<WelcomePanel />);

    const icon = container.querySelector('[aria-hidden]');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveTextContent('💬');
  });

  it('should have only one heading', () => {
    render(<WelcomePanel />);
    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(titleText);
  });
});
