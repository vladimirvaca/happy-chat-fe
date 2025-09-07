import UserInfoCard from '@components/UserInfoCard/UserInfoCard.tsx';
import MessageList from '@pages/dashboard/MessageList/MessageList.tsx';
import { Button } from 'primereact/button';
import { FC, useState } from 'react';
import ChannelList from '../ChannelList/ChannelList.tsx';
import { Channel, Message } from '../types/types.ts';
import { styles } from './SidebarStyles.ts';

type SidebarProps = {
  channels: Channel[];
  directMessages: Message[];
  onCreateChannel?: () => void;
  onSelectChannel?: (id: string) => void;
  selectedChannelId?: string;
  selectedMessageId?: string;
  setSelectedMessageId?: (id: string) => void;
};

type TabKey = 'channels' | 'messages';

const Sidebar: FC<SidebarProps> = (props: SidebarProps) => {
  const {
    channels,
    directMessages,
    onCreateChannel,
    onSelectChannel,
    selectedChannelId,
    selectedMessageId,
    setSelectedMessageId
  } = props;

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
          <i className="pi pi-hashtag" />
          Channels
        </button>
        <button
          style={{ ...styles.tabBtn, ...(activeTab === 'messages' ? styles.tabActive : {}) }}
          onClick={() => setActiveTab('messages')}
          aria-pressed={activeTab === 'messages'}
          data-test="messages-button"
        >
          <i className="pi pi-comments" />
          Messages
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
          {channels.length > 0 ? (<ChannelList
            channels={channels}
            selectedChannelId={selectedChannelId}
            onSelectChannel={(id) => onSelectChannel?.(id)}
            data-test="channelList"
          />) : (
            <div style={{ padding: 12, color: '#6b7280' }} data-test="noMessages-label">
              No included in channels yet.
            </div>
          )}

        </>
      )}

      {activeTab === 'messages' && (
        <>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionTitle} data-test="directMessages-label">Direct Messages</div>
            <Button
              icon="pi pi-plus"
              size="small"
              aria-label="Create new message"
              data-test="createMessage-button"
            />
          </div>
          {directMessages.length > 0 ? (
            <MessageList
              messages={directMessages}
              selectedMessageId={selectedMessageId}
              onSelectMessage={(id) => setSelectedMessageId?.(id)}
              data-test="messageList"
            />
          ) : (
            <div style={{ padding: 12, color: '#6b7280' }} data-test="noMessages-label">No direct messages yet.</div>
          )}
        </>
      )}

    </div>
  );
};

export default Sidebar;
