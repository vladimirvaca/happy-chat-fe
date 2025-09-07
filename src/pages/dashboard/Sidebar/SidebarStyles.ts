import { CSSProperties } from 'react';

export const styles: Record<string, CSSProperties> = {
  tabs: {
    display: 'flex',
    gap: 8,
    padding: 8,
    borderBottom: '1px solid var(--surface-border, #e5e7eb)',
    justifyContent: 'center'
  },
  tabBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 12px',
    borderRadius: 8,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontWeight: 600
  },
  tabActive: {
    background: 'var(--surface-100, #f3f4f6)'
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12
  },
  sectionTitle: {
    fontWeight: 700
  }
};
