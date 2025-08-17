import type { FC, ReactNode } from 'react';

import { styles } from './InputFieldContainerStyles.ts';

interface InputFieldContainerProps {
  children: ReactNode;
}

const InputFieldContainer: FC<InputFieldContainerProps> = ({ children }) => {
  return (
    <div style={styles.fieldContainer}>
      {children}
    </div>
  );
};

export default InputFieldContainer;
