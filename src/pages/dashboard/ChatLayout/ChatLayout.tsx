import { FC, ReactNode } from 'react';

import { styles } from './ChatLayoutStyles.ts';

interface ChatLayoutProps {
  sidebar: ReactNode;
  main: ReactNode;
}

const ChatLayout: FC<ChatLayoutProps> = ({ sidebar, main }: ChatLayoutProps) => {
  return (
    <div style={styles.root}>
      <aside style={styles.sidebar} data-testid="sidebar">{sidebar}</aside>
      <main style={styles.main} data-testid="main">{main}</main>
    </div>
  );
};

export default ChatLayout;
