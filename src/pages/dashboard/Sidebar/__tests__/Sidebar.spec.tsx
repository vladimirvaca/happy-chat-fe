import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentProps } from 'react';
import { Channel } from '../../types/types.ts';
import Sidebar from '../Sidebar.tsx';

vi.mock('@components/UserInfoCard/UserInfoCard.tsx', () => ({
  default: () => <div data-test="userInfoCard" />
}));

vi.mock('../../ChannelList/ChannelList.tsx', () => ({
  default: () => <div data-test="channelList" />
}));

const channels: Channel[] = [
  { id: 'general', name: 'general', description: 'Company news', isPrivate: false, membersCount: 10 },
  { id: 'dev', name: 'dev', description: 'Dev chat', unreadCount: 0, isPrivate: false, membersCount: 7 }
];

const setup = (props?: Partial<ComponentProps<typeof Sidebar>>) => {
  const user = userEvent.setup();
  const onCreateChannel = vi.fn();

  const utils = render(
    <Sidebar
      channels={channels}
      onCreateChannel={onCreateChannel}
      {...props}
    />
  );

  const channelsTab = screen.getByTestId('channels-button');
  const messagesTab = screen.getByTestId('messages-button');

  return {
    user,
    onCreateChannel,
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

  it('should switch to Messages tab and show the empty state', async () => {
    const { user, messagesTab } = setup();

    await user.click(messagesTab);

    expect(screen.getByTestId('channels-button')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByTestId('messages-button')).toHaveAttribute('aria-pressed', 'true');

    // Channels section hidden
    expect(screen.queryByTestId('createChannel-label')).not.toBeInTheDocument();
    expect(screen.queryByTestId('channelList')).not.toBeInTheDocument();

    // Empty messages label visible
    expect(screen.getByTestId('noMessages-label')).toHaveTextContent('No direct messages yet.');
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
});
