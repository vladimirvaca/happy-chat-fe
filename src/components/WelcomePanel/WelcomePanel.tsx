import { styles } from './WelcomePanelStyles.ts';

const WelcomePanel = () => {
  return (
    <div style={styles.container}>
      <div style={styles.icon} aria-hidden>💬</div>
      <h2 style={styles.title}>Welcome to HappyChat</h2>
      <p style={styles.subtitle}>
        Select a channel or start a direct message to begin chatting
      </p>
    </div>
  );
};

export default WelcomePanel;
