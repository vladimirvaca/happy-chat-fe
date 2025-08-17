import { render, screen } from '@testing-library/react';
import ChatLayout from '../ChatLayout.tsx';

const sidebarContent = <>Sidebar Content</>;
const mainContent = <>Main Content</>;

describe('ChatLayout', () => {

  it('should render sidebar and main containers', () => {
    render(<ChatLayout sidebar={sidebarContent} main={mainContent} />);

    const sidebar = screen.getByTestId('sidebar');
    const main = screen.getByTestId('main');

    expect(sidebar).toBeInTheDocument();
    expect(main).toBeInTheDocument();

    expect(sidebar).toHaveTextContent('Sidebar Content');
    expect(main).toHaveTextContent('Main Content');
  });
});
