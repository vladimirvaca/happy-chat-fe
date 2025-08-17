import { FC } from 'react';
import { Badge } from 'primereact/badge';
import { Channel } from '../types/types.ts';

import { styles } from './ChannelListStyles.ts';

interface ChannelListProps {
  channels: Channel[];
  selectedChannelId?: string;
  onSelectChannel: (id: string) => void;
}

const ChannelList: FC<ChannelListProps> = ({ channels, selectedChannelId, onSelectChannel }: ChannelListProps) => {
  return (
    <div role="list" aria-label="Channels" style={{ padding: 12 }}>
      {channels.map((channel) => {
        const selected = channel.id === selectedChannelId;

        return (
          <button
            key={channel.id}
            role="listItem"
            onClick={() => onSelectChannel(channel.id)}
            style={{
              ...styles.item,
              ...(selected ? styles.itemSelected : {})
            }}
            data-testid="listItem"
            aria-current={selected ? 'true' : undefined}
          >
            <div style={styles.itemHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span aria-hidden style={styles.hash} data-testid="hash-label">#</span>
                <span style={styles.name} data-testid="channelName-label">{channel.name}</span>
                {channel.isPrivate && (
                  <span style={styles.privateTag} aria-label="Private" data-testid="private-label">
                    Private
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {typeof channel.unreadCount === 'number' && channel.unreadCount > 0 && (
                  <Badge value={channel.unreadCount} severity="info" data-testid="unreadCount-badge" />
                )}
                <div title="Members" style={styles.members} data-testid="members-section">
                  <i className="pi pi-users" />
                  {channel.membersCount}
                </div>
              </div>
            </div>
            {channel.description &&
              <div style={styles.desc} data-testid="description-label">{channel.description}</div>}
          </button>
        );
      })}
    </div>
  );
};

export default ChannelList;
