import { CSSProperties } from 'react';

export const styles: Record<string, CSSProperties> = {
  container: {
    height: '100%',
    display: 'grid',
    placeItems: 'center',
    alignContent: 'center',
    gap: 8,
    color: '#374151'
  },
  icon: {
    fontSize: 56,
    opacity: 0.5
  },
  title: {
    margin: 0
  },
  subtitle: {
    margin: 0,
    color: '#6b7280'
  }
};
