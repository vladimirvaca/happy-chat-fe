import type { FC, ReactNode } from 'react';

import './InputFieldContainerStyles.css';

interface InputFieldContainerProps {
  children: ReactNode;
}

const InputFieldContainer: FC<InputFieldContainerProps> = ({ children }) => {
  return (
    <div className="field-container">
      {children}
    </div>
  );
};

export default InputFieldContainer;
