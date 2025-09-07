import { Badge } from 'primereact/badge';
import { FC } from 'react';
import { Message } from '../types/types.ts';
import { styles } from './MessageListStyles.ts';

interface MessageListProps {
  messages: Message[];
  selectedMessageId?: string;
  onSelectMessage: (id: string) => void;
}

const MessageList: FC<MessageListProps> = ({ messages, selectedMessageId, onSelectMessage }: MessageListProps) => {

  const formatTime = (date: Date): string => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    } else if (diffInMinutes < 24 * 60) {
      return `${Math.floor(diffInMinutes / 60)} hour ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div role="list" aria-label="Direct Messages" style={{ padding: 12 }} data-test="list">
      {messages.map((message) => {
        const selected = message.id === selectedMessageId;

        return (
          <button
            key={message.id}
            role="listItem"
            onClick={() => onSelectMessage(message.id)}
            style={{
              ...styles.item,
              ...(selected ? styles.itemSelected : {})
            }}
            data-test="messageItem"
            aria-current={selected ? 'true' : undefined}
          >
            <div style={styles.itemHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={styles.avatar} aria-hidden data-test="avatar-label">{message.avatar || '👤'}</span>
                <span style={styles.name} data-test="userName-label">{message.userName}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {message.unreadCount > 0 && (
                  <Badge value={message.unreadCount} severity="danger" data-test="unreadCount-badge" />
                )}
                <div title="Time" style={styles.timestamp} data-test="timestamp-section">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
            <div style={styles.message} data-test="lastMessage-label">{message.lastMessage}</div>
          </button>
        );
      })}
    </div>
  );
};

export default MessageList;
