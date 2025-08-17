import { useMemo, useState, SetStateAction } from 'react';
import { Channel } from './types/types.ts';
import WelcomePanel from '@components/WelcomePanel/WelcomePanel.tsx';
import Sidebar from './Sidebar/Sidebar.tsx';
import ChatLayout from './ChatLayout/ChatLayout.tsx';

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

  const [selectedChannelId, setSelectedChannelId] = useState<string | undefined>(undefined);

  return (
    <ChatLayout
      sidebar={
        <Sidebar
          channels={channels}
          selectedChannelId={selectedChannelId}
          onSelectChannel={(id: SetStateAction<string | undefined>) => setSelectedChannelId(id)}
          onCreateChannel={() => {
            // TODO: open "create channel" dialog
          }}
        />
      }
      main={<WelcomePanel />}
    />
  );

};

export default DashboardPage;
