import { CSSProperties } from 'react';

export const styles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderBottom: '1px solid var(--surface-border, #e5e7eb)'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    background: 'linear-gradient(135deg, #8ecae6, #ffafcc)'
  },
  info: {
    display: 'flex',
    flexDirection: 'column'
  },
  name: {
    fontWeight: 600
  },
  email: {
    color: 'var(--text-color-secondary)',
    fontSize: 12
  }
};

