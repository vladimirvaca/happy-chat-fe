import { FC } from 'react';
import { Button } from 'primereact/button';

import { styles } from './UserInfoCardStyles.ts';

interface UserCardProps {
  name: string;
  email: string;
  onOpenProfile?: () => void;
}

const UserInfoCard: FC<UserCardProps> = ({ name, email, onOpenProfile }) => {
  return (
    <div style={styles.container}>
      <div style={styles.avatar} aria-hidden />
      <div style={styles.info}>
        <div style={styles.name}>
          {name}
        </div>
        <div style={styles.email}>
          {email}
        </div>
      </div>
      <Button
        icon="pi pi-external-link"
        text
        aria-label="Open profile"
        onClick={onOpenProfile}
        style={{ marginLeft: 'auto' }}
        data-testid = 'openProfile-button'
      />
    </div>
  );
};

export default UserInfoCard;

