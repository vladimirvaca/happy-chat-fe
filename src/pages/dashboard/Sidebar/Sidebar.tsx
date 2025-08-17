import { FC, useState } from 'react';
import { Button } from 'primereact/button';
import UserInfoCard from '@components/UserInfoCard/UserInfoCard.tsx';
import { Channel } from '../types/types.ts';
import ChannelList from '../ChannelList/ChannelList.tsx';

import { styles } from './SidebarStyles.ts';

type SidebarProps = {
  channels: Channel[];
  onCreateChannel?: () => void;
  onSelectChannel?: (id: string) => void;
  selectedChannelId?: string;
};

type TabKey = 'channels' | 'messages';

const Sidebar: FC<SidebarProps> = ({ channels, onCreateChannel, onSelectChannel, selectedChannelId }) => {

  const [activeTab, setActiveTab] = useState<TabKey>('channels');

  return (
    <div>
      <UserInfoCard
        name="ramvlay"
        email="ramvlay@gmail.com"
        data-testid="userInfoCard"
        onOpenProfile={() => {
        }}
      />

      <div style={styles.tabs}>
        <button
          style={{ ...styles.tabBtn, ...(activeTab === 'channels' ? styles.tabActive : {}) }}
          onClick={() => setActiveTab('channels')}
          aria-pressed={activeTab === 'channels'}
          data-testid="channels-button"
        >
          <i className="pi pi-hashtag" /> Channels
        </button>
        <button
          style={{ ...styles.tabBtn, ...(activeTab === 'messages' ? styles.tabActive : {}) }}
          onClick={() => setActiveTab('messages')}
          aria-pressed={activeTab === 'messages'}
          data-testid="messages-button"
        >
          <i className="pi pi-comments" /> Messages
        </button>
      </div>

      {activeTab === 'channels' && (
        <>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionTitle} data-testid="createChannel-label">Channels</div>
            <Button
              icon="pi pi-plus"
              size="small"
              aria-label="Create channel"
              onClick={onCreateChannel}
              data-testid="createChannel-button"
            />
          </div>
          <ChannelList
            channels={channels}
            selectedChannelId={selectedChannelId}
            onSelectChannel={(id) => onSelectChannel?.(id)}
            data-testid="channelList"
          />
        </>
      )}

      {activeTab === 'messages' && (
        <div style={{ padding: 12, color: '#6b7280' }} data-testid="noMessages-label">No direct messages yet.</div>
      )}
    </div>
  );
};

export default Sidebar;
