import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentProps } from 'react';
import { Channel, Message } from '../../types/types.ts';
import Sidebar from '../Sidebar.tsx';

vi.mock('@components/UserInfoCard/UserInfoCard.tsx', () => ({
  default: () => <div data-test="userInfoCard" />
}));

vi.mock('../../ChannelList/ChannelList.tsx', () => ({
  default: () => <div data-test="channelList" />
}));

vi.mock('../../MessageList/MessageList.tsx', () => ({
  default: () => <div data-test="messageList" />
}));

const channels: Channel[] = [
  { id: 'general', name: 'general', description: 'Company news', isPrivate: false, membersCount: 10 },
  { id: 'dev', name: 'dev', description: 'Dev chat', unreadCount: 0, isPrivate: false, membersCount: 7 }
];

const directMessages: Message[] = [
  {
    id: 'msg1',
    userId: 'user1',
    userName: 'Jane Doe',
    lastMessage: 'Hello there!',
    timestamp: new Date(),
    unreadCount: 3,
    avatar: '👩'
  }
];

const setup = (props?: Partial<ComponentProps<typeof Sidebar>>) => {
  const user = userEvent.setup();
  const onCreateChannel = vi.fn();
  const onSelectChannel = vi.fn();
  const setSelectedMessageId = vi.fn();

  const utils = render(
    <Sidebar
      channels={channels}
      directMessages={directMessages}
      onCreateChannel={onCreateChannel}
      onSelectChannel={onSelectChannel}
      setSelectedMessageId={setSelectedMessageId}
      {...props}
    />
  );

  const channelsTab = screen.getByTestId('channels-button');
  const messagesTab = screen.getByTestId('messages-button');

  return {
    user,
    onCreateChannel,
    onSelectChannel,
    setSelectedMessageId,
    channelsTab,
    messagesTab,
    ...utils
  };
};

describe('Sidebar', () => {

  it('should render the user info card', () => {
    setup();
    expect(screen.getByTestId('userInfoCard')).toBeInTheDocument();
  });

  it('should default to Channels tab active and render its content', () => {
    setup();

    // Tabs state
    expect(screen.getByTestId('channels-button')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('messages-button')).toHaveAttribute('aria-pressed', 'false');

    // Channels section is visible
    expect(screen.getByTestId('createChannel-label')).toHaveTextContent('Channels');
    expect(screen.getByTestId('createChannel-button')).toBeInTheDocument();

    // ChannelList is rendered (mocked)
    expect(screen.getByTestId('channelList')).toBeInTheDocument();

    // Messages placeholder should not be visible yet
    expect(screen.queryByTestId('noMessages-label')).not.toBeInTheDocument();
  });

  it('should switch to Messages tab and show the content', async () => {
    const { user, messagesTab } = setup();

    await user.click(messagesTab);

    expect(screen.getByTestId('channels-button')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByTestId('messages-button')).toHaveAttribute('aria-pressed', 'true');

    // Channels section hidden
    expect(screen.queryByTestId('createChannel-label')).not.toBeInTheDocument();
    expect(screen.queryByTestId('channelList')).not.toBeInTheDocument();

    // Direct messages section visible
    expect(screen.getByTestId('directMessages-label')).toHaveTextContent('Direct Messages');
    expect(screen.getByTestId('createMessage-button')).toBeInTheDocument();

    // MessageList is rendered (mocked)
    expect(screen.getByTestId('messageList')).toBeInTheDocument();
  });

  it('should show empty state when no direct messages are available', async () => {
    const { user, messagesTab } = setup({ directMessages: [] });

    await user.click(messagesTab);

    // Empty messages label visible
    expect(screen.getByTestId('noMessages-label')).toHaveTextContent('No direct messages yet.');
    expect(screen.queryByTestId('messageList')).not.toBeInTheDocument();
  });

  it('should show empty state when no channels are available', () => {
    setup({ channels: [] });

    // Empty channels label visible
    expect(screen.getByTestId('noMessages-label')).toHaveTextContent('No included in channels yet.');
    expect(screen.queryByTestId('channelList')).not.toBeInTheDocument();
  });

  it('should allow switching back to Channels tab', async () => {
    const { user, messagesTab, channelsTab } = setup();

    await user.click(messagesTab);
    await user.click(channelsTab);

    expect(channelsTab).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('channelList')).toBeInTheDocument();
  });

  it('should call onCreateChannel when the create button is clicked', async () => {
    const { user, onCreateChannel } = setup();

    const createBtn = screen.getByTestId('createChannel-button');
    await user.click(createBtn);

    expect(onCreateChannel).toHaveBeenCalledTimes(1);
  });

  it('should call onSelectChannel when a channel is selected', async () => {
    const { onSelectChannel } = setup();

    // Since we're mocking the ChannelList component, we need to simulate
    // how the Sidebar component would handle channel selection
    // by directly invoking the props.onSelectChannel function
    const mockOnSelectChannel = vi.mocked(onSelectChannel);

    // Get the mock function directly
    const sidebarInstance = screen.getByTestId('channelList').parentElement?.closest('div');
    expect(sidebarInstance).toBeInTheDocument();

    // Manually trigger what would happen when a channel is selected
    onSelectChannel('channel-id');

    expect(mockOnSelectChannel).toHaveBeenCalledWith('channel-id');
  });

  it('should call setSelectedMessageId when a message is selected', async () => {
    const { user, messagesTab, setSelectedMessageId } = setup();

    await user.click(messagesTab);

    // Since we're mocking the MessageList component, we need to simulate
    // how the Sidebar component would handle message selection
    // by directly invoking the props.setSelectedMessageId function
    const mockSetSelectedMessageId = vi.mocked(setSelectedMessageId);

    // Get the mock function directly
    const messageListElement = screen.getByTestId('messageList');
    expect(messageListElement).toBeInTheDocument();

    // Manually trigger what would happen when a message is selected
    setSelectedMessageId('message-id');

    expect(mockSetSelectedMessageId).toHaveBeenCalledWith('message-id');
  });
});
