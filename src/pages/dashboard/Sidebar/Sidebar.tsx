import UserInfoCard from '@components/UserInfoCard/UserInfoCard.tsx';
import { Button } from 'primereact/button';
import { FC, useState } from 'react';
import ChannelList from '../ChannelList/ChannelList.tsx';
import { Channel } from '../types/types.ts';
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
        data-test="userInfoCard"
        onOpenProfile={() => {
        }}
      />

      <div style={styles.tabs}>
        <button
          style={{ ...styles.tabBtn, ...(activeTab === 'channels' ? styles.tabActive : {}) }}
          onClick={() => setActiveTab('channels')}
          aria-pressed={activeTab === 'channels'}
          data-test="channels-button"
        >
          <i className="pi pi-hashtag" /> Channels
        </button>
        <button
          style={{ ...styles.tabBtn, ...(activeTab === 'messages' ? styles.tabActive : {}) }}
          onClick={() => setActiveTab('messages')}
          aria-pressed={activeTab === 'messages'}
          data-test="messages-button"
        >
          <i className="pi pi-comments" /> Messages
        </button>
      </div>

      {activeTab === 'channels' && (
        <>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionTitle} data-test="createChannel-label">Channels</div>
            <Button
              icon="pi pi-plus"
              size="small"
              aria-label="Create channel"
              onClick={onCreateChannel}
              data-test="createChannel-button"
            />
          </div>
          <ChannelList
            channels={channels}
            selectedChannelId={selectedChannelId}
            onSelectChannel={(id) => onSelectChannel?.(id)}
            data-test="channelList"
          />
        </>
      )}

      {activeTab === 'messages' && (
        <div style={{ padding: 12, color: '#6b7280' }} data-test="noMessages-label">No direct messages yet.</div>
      )}
    </div>
  );
};

export default Sidebar;
