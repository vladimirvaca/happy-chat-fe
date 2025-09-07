import WelcomePanel from '@components/WelcomePanel/WelcomePanel.tsx';
import { useMemo, useState } from 'react';
import ChatLayout from './ChatLayout/ChatLayout.tsx';
import Sidebar from './Sidebar/Sidebar.tsx';
import { Channel, Message } from './types/types.ts';

const DashboardPage = () => {

  const channels = useMemo<Channel[]>(
    () => [
      {
        id: 'general',
        name: 'general',
        description: 'General discussion',
        membersCount: 12
      },
      {
        id: 'random',
        name: 'random',
        description: 'Random conversations',
        membersCount: 8
      },
      {
        id: 'dev-team',
        name: 'dev-team',
        description: 'Development team',
        isPrivate: true,
        membersCount: 5
      }
    ],
    []
  );

  const directMessages: Message[] = [
    {
      id: '1',
      userId: 'alice',
      userName: 'Alice Johnson',
      lastMessage: 'Hey, how are you doing?',
      timestamp: new Date(new Date().getTime() - 2 * 60 * 1000), // 2 minutes ago
      unreadCount: 2,
      avatar: '👩‍🦰'
    },
    {
      id: '2',
      userId: 'bob',
      userName: 'Bob Smith',
      lastMessage: 'Can we schedule a meeting?',
      timestamp: new Date(new Date().getTime() - 60 * 60 * 1000), // 1 hour ago
      unreadCount: 0,
      avatar: '👨🏽'
    }
  ];


  const [selectedChannelId, setSelectedChannelId] = useState<string>();
  const [selectedMessageId, setSelectedMessageId] = useState<string>();


  return (
    <ChatLayout
      sidebar={
        <Sidebar
          channels={channels}
          directMessages={directMessages}
          selectedChannelId={selectedChannelId}
          onSelectChannel={setSelectedChannelId}
          onCreateChannel={() => {
            // TODO: open "create channel" dialog
          }}
          selectedMessageId={selectedMessageId}
          setSelectedMessageId={setSelectedMessageId}
        />
      }
      main={<WelcomePanel />}
    />
  );

};

export default DashboardPage;
