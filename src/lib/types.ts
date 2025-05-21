export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  replyTo?: string; // ID of message being replied to
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  type: 'image' | 'file' | 'link';
  url: string;
  name: string;
  size?: number; // in bytes
}

export interface ChatThread {
  id: string;
  participants: string[]; // User IDs
  messages: string[]; // Message IDs
  lastActivity: Date;
  unreadCount: number; // Number of unread messages
}