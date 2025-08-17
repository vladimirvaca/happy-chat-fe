export interface Channel {
  id: string;
  name: string;
  description?: string;
  membersCount: number;
  isPrivate?: boolean;
  unreadCount?: number;
}
