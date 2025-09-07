export interface Channel {
  id: string;
  name: string;
  description?: string;
  membersCount: number;
  isPrivate?: boolean;
  unreadCount: number;
}

export interface Message {
  id: string;
  userId: string;
  userName: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  avatar?: string;
}
