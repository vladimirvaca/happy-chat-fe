import { CSSProperties } from 'react';

export const styles: Record<string, CSSProperties> = {
  root: {
    display: 'grid',
    gridTemplateColumns: '320px 1fr',
    height: '100vh',
    overflow: 'hidden',
    background: 'var(--surface-ground, #f8f9fa)'
  },
  sidebar: {
    borderRight: '1px solid var(--surface-border, #e5e7eb)',
    overflowY: 'auto',
    background: 'var(--surface-card, #fff)'
  },
  main: {
    overflow: 'auto'
  }
};
