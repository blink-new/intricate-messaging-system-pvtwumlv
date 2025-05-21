import { useEffect, useRef, useState } from 'react';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { Message, User } from '../lib/types';
import { addMessage, currentUser, getMessagesByThreadId, messages } from '../lib/data';

interface ChatThreadProps {
  threadId: string;
  activeUser: User;
}

export function ChatThread({ threadId, activeUser }: ChatThreadProps) {
  const [threadMessages, setThreadMessages] = useState<Message[]>([]);
  const [replyToMessage, setReplyToMessage] = useState<Message | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Fetch thread messages
  useEffect(() => {
    const msgs = getMessagesByThreadId(threadId);
    setThreadMessages(msgs);
    setReplyToMessage(null);
  }, [threadId]);
  
  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [threadMessages]);
  
  const handleSendMessage = (content: string) => {
    const newMessage = addMessage({
      senderId: currentUser.id,
      receiverId: activeUser.id,
      content,
      ...(replyToMessage ? { replyTo: replyToMessage.id } : {})
    });
    
    setThreadMessages([...threadMessages, newMessage]);
    setReplyToMessage(null);
    
    // Simulate response after 1-3 seconds
    const delay = Math.random() * 2000 + 1000;
    
    setTimeout(() => {
      // Update previous message status to delivered
      const updatedMessages = messages.map(m => {
        if (m.id === newMessage.id) {
          return { ...m, status: 'delivered' as const };
        }
        return m;
      });
      
      // Create response message
      const responseMessage = addMessage({
        senderId: activeUser.id,
        receiverId: currentUser.id,
        content: getRandomResponse(content)
      });
      
      setThreadMessages([...updatedMessages, responseMessage]);
      
      // Update previous message status to read after 1 second
      setTimeout(() => {
        const finalMessages = messages.map(m => {
          if (m.id === newMessage.id) {
            return { ...m, status: 'read' as const };
          }
          return m;
        });
        
        setThreadMessages(finalMessages.filter(m => 
          (m.senderId === currentUser.id && m.receiverId === activeUser.id) || 
          (m.senderId === activeUser.id && m.receiverId === currentUser.id)
        ).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()));
      }, 1000);
    }, delay);
  };
  
  const findReplyMessage = (messageId?: string) => {
    if (!messageId) return null;
    return messages.find(m => m.id === messageId) || null;
  };
  
  // Group messages by date
  const messageGroups: { date: string; messages: Message[] }[] = [];
  let currentDate = '';
  
  threadMessages.forEach(message => {
    const messageDate = message.timestamp.toLocaleDateString();
    
    if (messageDate !== currentDate) {
      currentDate = messageDate;
      messageGroups.push({
        date: messageDate,
        messages: [message]
      });
    } else {
      messageGroups[messageGroups.length - 1].messages.push(message);
    }
  });
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 overflow-y-auto">
        {messageGroups.map((group) => (
          <div key={group.date} className="mb-4">
            <div className="flex justify-center my-2">
              <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                {formatMessageDate(new Date(group.date))}
              </span>
            </div>
            
            {group.messages.map((message, index) => {
              const isCurrentUser = message.senderId === currentUser.id;
              const showAvatar = index === 0 || 
                group.messages[index - 1].senderId !== message.senderId;
              const replyMessage = findReplyMessage(message.replyTo);
              
              return (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isCurrentUser={isCurrentUser}
                  showAvatar={showAvatar}
                  replyMessage={replyMessage}
                />
              );
            })}
          </div>
        ))}
        
        <div ref={messagesEndRef} />
      </div>
      
      <MessageInput
        onSendMessage={handleSendMessage}
        replyToMessage={replyToMessage}
        onCancelReply={() => setReplyToMessage(null)}
      />
    </div>
  );
}

// Helper functions
function formatMessageDate(date: Date): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }
  
  return date.toLocaleDateString(undefined, { 
    month: 'short', 
    day: 'numeric',
    year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
  });
}

function getRandomResponse(message: string): string {
  const responses = [
    "That's interesting! Tell me more.",
    "I see what you mean. I've been thinking about that too.",
    "Good point! Have you considered alternative perspectives?",
    "I appreciate you sharing that with me.",
    "That makes a lot of sense. I agree.",
    "I hadn't thought about it that way before. Thanks for sharing.",
    "That's a great idea! I'd love to discuss it further.",
    "I understand. Let's explore this topic more soon.",
    "Thanks for the update. I'll get back to you on this.",
    "Interesting perspective! I have some thoughts to share later."
  ];
  
  const questionResponses = [
    "Yes, definitely!",
    "No, I haven't had the chance yet.",
    "I'm not sure. Let me think about it.",
    "That's a good question. I need some time to consider it.",
    "Absolutely! I've been waiting to discuss this.",
    "I'll have to get back to you on that one.",
    "I was just thinking about that myself.",
    "Let's discuss this when we meet next time.",
    "I have mixed feelings about that, to be honest.",
    "I'd rather talk about this in person if you don't mind."
  ];
  
  if (message.endsWith('?')) {
    return questionResponses[Math.floor(Math.random() * questionResponses.length)];
  }
  
  return responses[Math.floor(Math.random() * responses.length)];
}