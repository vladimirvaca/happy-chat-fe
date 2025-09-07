import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Message } from '../../types/types.ts';
import MessageList from '../MessageList.tsx';

const messages: Message[] = [
  {
    id: 'msg1',
    userId: 'user1',
    userName: 'John Doe',
    lastMessage: 'Hello, how are you?',
    timestamp: new Date(new Date().getTime() - 30 * 60 * 1000), // 30 minutes ago
    unreadCount: 0,
    avatar: '👨'
  },
  {
    id: 'msg2',
    userId: 'user2',
    userName: 'Jane Smith',
    lastMessage: 'Can we schedule a meeting tomorrow?',
    timestamp: new Date(new Date().getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
    unreadCount: 3,
    avatar: '👩'
  },
  {
    id: 'msg3',
    userId: 'user3',
    userName: 'Bob Johnson',
    lastMessage: 'I sent you the report',
    timestamp: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    unreadCount: 0
    // Avatar intentionally omitted
  }
];

const setup = (selectedMessageId?: string, onSelectMessage = vi.fn()) => {
  const utils = render(
    <MessageList messages={messages} selectedMessageId={selectedMessageId} onSelectMessage={onSelectMessage} />
  );
  const list = screen.getByTestId('list');
  const items = screen.getAllByTestId('messageItem');
  return { ...utils, list, items, onSelectMessage };
};

describe('MessageList', () => {
  it('should render a list of messages with correct count and accessible name', () => {
    const { list, items } = setup();

    expect(list).toBeInTheDocument();
    expect(items).toHaveLength(messages.length);

    messages.forEach((msg) => {
      const item = items.find((el) => within(el).getByTestId('userName-label').textContent === msg.userName);
      expect(item).toBeTruthy();
    });
  });

  it('should render usernames for each message', () => {
    setup();

    const userNames = screen.getAllByTestId('userName-label');
    expect(userNames).toHaveLength(messages.length);

    messages.forEach((msg) => {
      expect(userNames.some((el) => el.textContent === msg.userName)).toBe(true);
    });
  });

  it('should render last message content for each message', () => {
    setup();

    const lastMessages = screen.getAllByTestId('lastMessage-label');
    expect(lastMessages).toHaveLength(messages.length);

    messages.forEach((msg) => {
      expect(lastMessages.some((el) => el.textContent === msg.lastMessage)).toBe(true);
    });
  });

  it('should render avatar and it should be aria-hidden', () => {
    setup();

    const avatars = screen.getAllByTestId('avatar-label');
    expect(avatars).toHaveLength(messages.length);

    avatars.forEach((avatar) => {
      expect(avatar).toHaveAttribute('aria-hidden');
    });
  });

  it('should use default avatar when none is provided', () => {
    setup();

    // Find the message item for Bob Johnson directly
    const bobItem = screen.getByText('Bob Johnson').closest('[data-test="messageItem"]') as HTMLElement;
    expect(bobItem).toBeInTheDocument();

    // Find the avatar within Bob's message item
    const avatar = within(bobItem).getByTestId('avatar-label');
    expect(avatar).toHaveTextContent('👤');
  });


  it('should render unread badge only when unreadCount > 0', () => {
    const { items } = setup();

    // For "John Doe" (unreadCount = 0) no badge
    const johnItem = items.find((el) => within(el).getByTestId('userName-label').textContent === 'John Doe')!;
    expect(within(johnItem).queryByTestId('unreadCount-badge')).toBeNull();

    // For "Jane Smith" (unreadCount = 3) badge with correct text
    const janeItem = items.find(
      (el) => within(el).getByTestId('userName-label').textContent === 'Jane Smith'
    )!;
    const badge = within(janeItem).getByTestId('unreadCount-badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('3');
  });

  it('should format time correctly based on message age', () => {
    setup();

    const timestamps = screen.getAllByTestId('timestamp-section');
    expect(timestamps).toHaveLength(messages.length);

    // Check specific formatting for different times
    const items = screen.getAllByTestId('messageItem');

    // 30 minutes ago
    const johnItem = items.find((el) => within(el).getByTestId('userName-label').textContent === 'John Doe')!;
    const johnTimestamp = within(johnItem).getByTestId('timestamp-section');
    expect(johnTimestamp).toHaveTextContent(/30 min ago/);

    // 2 hours ago
    const janeItem = items.find((el) => within(el).getByTestId('userName-label').textContent === 'Jane Smith')!;
    const janeTimestamp = within(janeItem).getByTestId('timestamp-section');
    expect(janeTimestamp).toHaveTextContent(/2 hour ago/);

    // 2 days ago - should be a date string
    const bobItem = items.find((el) => within(el).getByTestId('userName-label').textContent === 'Bob Johnson')!;
    const bobTimestamp = within(bobItem).getByTestId('timestamp-section');
    expect(bobTimestamp).toHaveTextContent(messages[2].timestamp.toLocaleDateString());
  });

  it('should mark the selected message with aria-current="true"', () => {
    const selectedId = 'msg2';
    const { items } = setup(selectedId);

    const selectedItem = items.find((el) => el.getAttribute('aria-current') === 'true');
    expect(selectedItem).toBeTruthy();
    expect(within(selectedItem!).getByTestId('userName-label')).toHaveTextContent('Jane Smith');

    // Others should not have aria-current
    const nonSelected = items.filter((el) => el !== selectedItem);
    nonSelected.forEach((el) => {
      expect(el).not.toHaveAttribute('aria-current');
    });
  });

  it('should call onSelectMessage with the message id when an item is clicked', async () => {
    const user = userEvent.setup();
    const onSelectMessage = vi.fn();
    const { items } = setup(undefined, onSelectMessage);

    // Click the "John Doe" message
    const johnItem = items.find(
      (el) => within(el).getByTestId('userName-label').textContent === 'John Doe'
    )!;
    await user.click(johnItem);

    expect(onSelectMessage).toHaveBeenCalledTimes(1);
    expect(onSelectMessage).toHaveBeenCalledWith('msg1');
  });

  it('should support keyboard activation (Enter) on the message items', async () => {
    const user = userEvent.setup();
    const onSelectMessage = vi.fn();
    const { items } = setup(undefined, onSelectMessage);

    // Focus and press Enter on the "Jane Smith" message
    const janeItem = items.find(
      (el) => within(el).getByTestId('userName-label').textContent === 'Jane Smith'
    )!;
    janeItem.focus();
    await user.keyboard('{Enter}');

    expect(onSelectMessage).toHaveBeenCalledTimes(1);
    expect(onSelectMessage).toHaveBeenCalledWith('msg2');
  });
});
