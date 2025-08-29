import { render, screen } from '@testing-library/react';
import InputFieldContainer from '@components/InputFieldContainer/InputFieldContainer.tsx';

describe('InputFieldContainer', () => {
  it('should renders children correctly', () => {
    render(
      <InputFieldContainer>
        <div data-test="test-child">Test Content</div>
      </InputFieldContainer>
    );

    const childElement = screen.getByTestId('test-child');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Test Content');
  });
});
