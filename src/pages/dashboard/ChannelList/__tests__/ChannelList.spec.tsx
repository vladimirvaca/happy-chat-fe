import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Channel } from '../../types/types.ts';
import ChannelList from '../ChannelList.tsx';

const channels: Channel[] = [
  {
    id: 'general',
    name: 'general',
    description: 'Company-wide announcements and work-based matters',
    // unreadCount intentionally omitted (undefined)
    isPrivate: false,
    membersCount: 10
  },
  {
    id: 'dev',
    name: 'dev',
    description: 'Development chat',
    unreadCount: 0, // Badge should NOT render
    isPrivate: false,
    membersCount: 7
  },
  {
    id: 'secrets',
    name: 'secrets',
    description: 'Private coordination',
    unreadCount: 5, // Badge should render
    isPrivate: true,
    membersCount: 3
  }
];

const setup = (selectedChannelId?: string, onSelectChannel = vi.fn()) => {
  const utils = render(
    <ChannelList channels={channels} selectedChannelId={selectedChannelId} onSelectChannel={onSelectChannel} />
  );
  const list = screen.getByRole('list', { name: /channels/i });
  const items = screen.getAllByTestId('listItem');
  return { ...utils, list, items, onSelectChannel };
};

describe('ChannelList', () => {
  it('should render a list of channels with correct count and accessible name', () => {
    const { list, items } = setup();

    expect(list).toBeInTheDocument();
    expect(items).toHaveLength(channels.length);

    channels.forEach((ch) => {
      const item = items.find((el) => within(el).getByTestId('channelName-label').textContent === ch.name);
      expect(item).toBeTruthy();
    });
  });

  it('should render descriptions only when provided', () => {
    setup();

    const descriptions = screen.getAllByTestId('description-label');
    expect(descriptions).toHaveLength(channels.length);
    channels.forEach((ch) => {
      expect(descriptions.some((el) => el.textContent === ch.description)).toBe(true);
    });
  });

  it('should indicate private channels and not show the tag for public ones', () => {
    setup();

    // Private tag should exist once (for "secrets")
    const privateTags = screen.getAllByTestId('private-label');
    expect(privateTags).toHaveLength(1);

    // The private tag appears within the "secrets" item
    const items = screen.getAllByTestId('listItem');
    const secretsItem = items.find(
      (el) => within(el).getByTestId('channelName-label').textContent === 'secrets'
    )!;
    expect(within(secretsItem).getByTestId('private-label')).toBeInTheDocument();
  });

  it('should render unread badge only when unreadCount > 0', () => {
    const { items } = setup();

    // For "dev" (unreadCount = 0) no badge
    const devItem = items.find((el) => within(el).getByTestId('channelName-label').textContent === 'dev')!;
    expect(within(devItem).queryByTestId('unreadCount-badge')).toBeNull();

    // For "secrets" (unreadCount = 5) badge with correct text
    const secretsItem = items.find(
      (el) => within(el).getByTestId('channelName-label').textContent === 'secrets'
    )!;
    const badge = within(secretsItem).getByTestId('unreadCount-badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('5');
  });

  it('should render members count for each channel', () => {
    const { items } = setup();

    items.forEach((item) => {
      const name = within(item).getByTestId('channelName-label').textContent!;
      const members = within(item).getByTestId('members-section');
      const expected = channels.find((c) => c.name === name)!.membersCount;
      expect(members).toHaveTextContent(String(expected));
    });
  });

  it('should mark the selected channel with aria-current="true"', () => {
    const selectedId = 'dev';
    const { items } = setup(selectedId);

    const selectedItem = items.find((el) => el.getAttribute('aria-current') === 'true');
    expect(selectedItem).toBeTruthy();
    expect(within(selectedItem!).getByTestId('channelName-label')).toHaveTextContent('dev');

    // Others should not have aria-current
    const nonSelected = items.filter((el) => el !== selectedItem);
    nonSelected.forEach((el) => {
      expect(el).not.toHaveAttribute('aria-current');
    });
  });

  it('should call onSelectChannel with the channel id when an item is clicked', async () => {
    const user = userEvent.setup();
    const onSelectChannel = vi.fn();
    const { items } = setup(undefined, onSelectChannel);

    // Click the "general" channel button
    const generalItem = items.find(
      (el) => within(el).getByTestId('channelName-label').textContent === 'general'
    )!;
    await user.click(generalItem);

    expect(onSelectChannel).toHaveBeenCalledTimes(1);
    expect(onSelectChannel).toHaveBeenCalledWith('general');
  });

  it('should render a leading hash (#) as a decorative indicator', () => {
    setup();

    const hashes = screen.getAllByTestId('hash-label');
    expect(hashes.length).toBeGreaterThan(0);
    hashes.forEach((hash) => {
      expect(hash).toHaveAttribute('aria-hidden');
      expect(hash).toHaveTextContent('#');
    });
  });
});
