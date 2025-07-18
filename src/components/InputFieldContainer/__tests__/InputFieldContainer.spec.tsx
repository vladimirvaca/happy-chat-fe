import { render, screen } from '@testing-library/react';
import InputFieldContainer from '@components/InputFieldContainer/InputFieldContainer.tsx';

describe('InputFieldContainer', () => {
  it('renders children correctly', () => {
    render(
      <InputFieldContainer>
        <div data-testid="test-child">Test Content</div>
      </InputFieldContainer>
    );

    const childElement = screen.getByTestId('test-child');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Test Content');
  });

  it('applies the correct class name', () => {
    const { container } = render(
      <InputFieldContainer>
        <div>Test Content</div>
      </InputFieldContainer>
    );

    const fieldContainer = container.querySelector('.field-container');
    expect(fieldContainer).toBeInTheDocument();
  });
});
