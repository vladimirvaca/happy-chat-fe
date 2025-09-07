import { CSSProperties } from 'react';

export const styles: Record<string, CSSProperties> = {
  item: {
    width: '100%',
    textAlign: 'left',
    border: '1px solid var(--surface-border, #e5e7eb)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    background: '#fff',
    cursor: 'pointer',
    display: 'block'
  },
  itemSelected: {
    outline: '2px solid var(--primary-color, #22c55e)',
    outlineOffset: 0
  },
  itemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  avatar: {
    fontSize: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    fontWeight: 600
  },
  timestamp: {
    color: '#6b7280',
    fontSize: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 4
  },
  message: {
    color: '#6b7280',
    fontSize: 14,
    marginTop: 6,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  }
};
