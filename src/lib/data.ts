import { User, Message, ChatThread } from './types';

export const users: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
    status: 'online',
  },
  {
    id: '2',
    name: 'Morgan Taylor',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop',
    status: 'online',
  },
  {
    id: '3',
    name: 'Jordan Smith',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
    status: 'away',
    lastSeen: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
  },
  {
    id: '4',
    name: 'Casey Williams',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    status: 'offline',
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
  },
  {
    id: '5',
    name: 'Riley Garcia',
    avatar: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?q=80&w=300&auto=format&fit=crop',
    status: 'online',
  },
];

// Current user
export const currentUser: User = {
  id: '0',
  name: 'You',
  avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop',
  status: 'online',
};

export const messages: Message[] = [
  {
    id: 'm1',
    senderId: '1',
    receiverId: '0',
    content: 'Hey there! How are you doing today?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    status: 'read',
  },
  {
    id: 'm2',
    senderId: '0',
    receiverId: '1',
    content: 'I\'m good, thanks for asking! Just working on a new project. How about you?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.9), // 1.9 hours ago
    status: 'read',
  },
  {
    id: 'm3',
    senderId: '1',
    receiverId: '0',
    content: 'That sounds interesting! What kind of project are you working on?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.8), // 1.8 hours ago
    status: 'read',
  },
  {
    id: 'm4',
    senderId: '0',
    receiverId: '1',
    content: 'It\'s a messaging application with real-time updates and some cool features!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.7), // 1.7 hours ago
    status: 'read',
  },
  {
    id: 'm5',
    senderId: '1',
    receiverId: '0',
    content: 'That sounds awesome! I\'d love to check it out when it\'s ready.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.6), // 1.6 hours ago
    status: 'read',
  },
  {
    id: 'm6',
    senderId: '0',
    receiverId: '1',
    content: 'Definitely! I\'ll send you a link once it\'s live.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5), // 1.5 hours ago
    status: 'read',
  },
  {
    id: 'm7',
    senderId: '0',
    receiverId: '2',
    content: 'Hi Morgan, do you have time to catch up later today?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1), // 1 hour ago
    status: 'delivered',
  },
  {
    id: 'm8',
    senderId: '2',
    receiverId: '0',
    content: 'Sure! How about 4pm?',
    timestamp: new Date(Date.now() - 1000 * 60 * 50), // 50 minutes ago
    status: 'read',
  },
  {
    id: 'm9',
    senderId: '0',
    receiverId: '2',
    content: 'Perfect, see you then!',
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    status: 'delivered',
  },
  {
    id: 'm10',
    senderId: '3',
    receiverId: '0',
    content: 'Hey, just wanted to share this article with you: https://example.com/interesting-tech',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    status: 'delivered',
    attachments: [
      {
        id: 'a1',
        type: 'link',
        url: 'https://example.com/interesting-tech',
        name: 'Interesting Tech Article',
      },
    ],
  },
  {
    id: 'm11',
    senderId: '0',
    receiverId: '3',
    content: 'Thanks for sharing! I\'ll check it out.',
    timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
    status: 'sent',
    replyTo: 'm10',
  },
];

export const chatThreads: ChatThread[] = [
  {
    id: 't1',
    participants: ['0', '1'],
    messages: ['m1', 'm2', 'm3', 'm4', 'm5', 'm6'],
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 1.5), // 1.5 hours ago
    unreadCount: 0,
  },
  {
    id: 't2',
    participants: ['0', '2'],
    messages: ['m7', 'm8', 'm9'],
    lastActivity: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    unreadCount: 0,
  },
  {
    id: 't3',
    participants: ['0', '3'],
    messages: ['m10', 'm11'],
    lastActivity: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
    unreadCount: 0,
  },
  {
    id: 't4',
    participants: ['0', '4'],
    messages: [],
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    unreadCount: 0,
  },
  {
    id: 't5',
    participants: ['0', '5'],
    messages: [],
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
    unreadCount: 0,
  },
];

// Helper functions
export function getUserById(id: string): User | undefined {
  if (id === '0') return currentUser;
  return users.find(user => user.id === id);
}

export function getMessagesByThreadId(threadId: string): Message[] {
  const thread = chatThreads.find(t => t.id === threadId);
  if (!thread) return [];
  
  return thread.messages
    .map(messageId => messages.find(m => m.id === messageId))
    .filter((message): message is Message => message !== undefined)
    .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
}

export function getThreadByParticipants(participantIds: string[]): ChatThread | undefined {
  return chatThreads.find(thread => {
    const participantsSet = new Set(thread.participants);
    return participantIds.every(id => participantsSet.has(id));
  });
}

export function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  // If less than 24 hours ago, show time
  if (diff < 24 * 60 * 60 * 1000) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  // If less than a week ago, show day of week
  if (diff < 7 * 24 * 60 * 60 * 1000) {
    return date.toLocaleDateString([], { weekday: 'short' });
  }
  
  // Otherwise show date
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

// Function to add a new message to the system
export function addMessage(message: Omit<Message, 'id' | 'timestamp' | 'status'>): Message {
  const newMessage: Message = {
    ...message,
    id: `m${messages.length + 1}`,
    timestamp: new Date(),
    status: 'sent',
  };
  
  messages.push(newMessage);
  
  // Find or create thread
  let thread = getThreadByParticipants([message.senderId, message.receiverId]);
  
  if (!thread) {
    thread = {
      id: `t${chatThreads.length + 1}`,
      participants: [message.senderId, message.receiverId],
      messages: [],
      lastActivity: new Date(),
      unreadCount: 0,
    };
    chatThreads.push(thread);
  }
  
  thread.messages.push(newMessage.id);
  thread.lastActivity = new Date();
  
  return newMessage;
}