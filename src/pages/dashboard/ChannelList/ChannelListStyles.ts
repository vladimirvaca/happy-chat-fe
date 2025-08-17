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
  hash: { fontWeight: 700, color: '#6b7280' },
  name: { fontWeight: 600 },
  privateTag: {
    background: '#eef2ff',
    color: '#4f46e5',
    borderRadius: 9999,
    padding: '2px 8px',
    fontSize: 12,
    fontWeight: 600
  },
  members: { color: '#6b7280', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 },
  desc: { color: '#6b7280', fontSize: 12, marginTop: 6 }
};
