import { User, Message, Conversation } from './types';

// Mock data for testing the UI
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Emily Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    status: 'online',
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    status: 'offline',
    lastSeen: new Date(Date.now() - 3600000), // 1 hour ago
  },
  {
    id: '3',
    name: 'Jessica Williams',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    status: 'away',
  },
  {
    id: '4',
    name: 'David Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    status: 'online',
  },
  {
    id: '5',
    name: 'Sarah Kim',
    avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    status: 'online',
  },
];

// Generate mock messages
const createMessage = (id: string, senderId: string, text: string, timeOffset: number, read = true): Message => ({
  id,
  senderId,
  text,
  timestamp: new Date(Date.now() - timeOffset),
  read,
  attachments: [],
});

// Mock conversations
export const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [mockUsers[0], mockUsers[1]],
    messages: [
      createMessage('1-1', '2', 'Hey, how are you doing?', 3600000 * 24),
      createMessage('1-2', '1', 'I\'m good! Just working on a new project.', 3600000 * 23),
      createMessage('1-3', '2', 'That sounds interesting. What kind of project?', 3600000 * 22),
      createMessage('1-4', '1', 'A messaging app with a beautiful interface. Want to see?', 3600000 * 21),
      createMessage('1-5', '2', 'Absolutely! Send me a link when you have something to show.', 3600000 * 20),
      createMessage('1-6', '1', 'Will do! How\'s your week going?', 3600000 * 5, false),
    ],
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 3600000 * 5),
  },
  {
    id: '2',
    participants: [mockUsers[0], mockUsers[2]],
    messages: [
      createMessage('2-1', '3', 'Did you get a chance to review the documents I sent?', 3600000 * 48),
      createMessage('2-2', '1', 'Yes, I did. Everything looks great!', 3600000 * 47),
      createMessage('2-3', '3', 'Perfect! Let\'s schedule a meeting to discuss next steps.', 3600000 * 46),
      createMessage('2-4', '1', 'How about tomorrow at 2pm?', 3600000 * 45),
      createMessage('2-5', '3', 'Works for me. I\'ll send a calendar invite.', 3600000 * 44, false),
    ],
    unreadCount: 1,
    updatedAt: new Date(Date.now() - 3600000 * 44),
  },
  {
    id: '3',
    participants: [mockUsers[0], mockUsers[3]],
    messages: [
      createMessage('3-1', '1', 'Hey David, do you have the presentation slides ready?', 3600000 * 72),
      createMessage('3-2', '4', 'Almost done! Just need to finalize a few details.', 3600000 * 71),
      createMessage('3-3', '1', 'Great! When do you think you\'ll be finished?', 3600000 * 70),
      createMessage('3-4', '4', 'Should be ready by end of day. I\'ll share it with you once it\'s done.', 3600000 * 69),
      createMessage('3-5', '1', 'Perfect, thanks!', 3600000 * 68),
    ],
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 3600000 * 68),
  },
  {
    id: '4',
    participants: [mockUsers[0], mockUsers[4]],
    messages: [
      createMessage('4-1', '5', 'Are we still on for lunch tomorrow?', 3600000 * 25),
      createMessage('4-2', '1', 'Yes! Looking forward to it. Same place as last time?', 3600000 * 24),
      createMessage('4-3', '5', 'Actually, I was thinking we could try that new place downtown.', 3600000 * 23),
      createMessage('4-4', '1', 'Sounds good to me! Let\'s meet there at noon.', 3600000 * 22),
      createMessage('4-5', '5', 'Perfect! See you then.', 3600000 * 21, false),
      createMessage('4-6', '5', 'By the way, I might be running a few minutes late. Traffic is terrible today.', 3600000 * 2, false),
    ],
    unreadCount: 2,
    updatedAt: new Date(Date.now() - 3600000 * 2),
  },
];

// Current user (you)
export const currentUser: User = {
  id: '1',
  name: 'You',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
  status: 'online',
};