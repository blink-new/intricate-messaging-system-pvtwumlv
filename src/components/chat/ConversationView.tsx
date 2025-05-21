import { useEffect, useRef } from "react";
import { Conversation, Message, User } from "../../lib/types";
import { MessageItem } from "./MessageItem";
import { MessageInput } from "./MessageInput";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { currentUser } from "../../lib/data";
import { Phone, Video, Info } from "lucide-react";
import { Button } from "../ui/button";

interface ConversationViewProps {
  conversation: Conversation;
  onSendMessage: (conversationId: string, text: string) => void;
}

export function ConversationView({ conversation, onSendMessage }: ConversationViewProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Get the other participant in the conversation (not the current user)
  const otherParticipant = conversation.participants.find(
    user => user.id !== currentUser.id
  ) as User;
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation.messages]);
  
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  // Check if message is consecutive (same sender as previous message within 2 minutes)
  const isConsecutiveMessage = (message: Message, index: number): boolean => {
    if (index === 0) return false;
    
    const previousMessage = conversation.messages[index - 1];
    const timeDiff = message.timestamp.getTime() - previousMessage.timestamp.getTime();
    const isConsecutive = message.senderId === previousMessage.senderId && timeDiff < 120000; // 2 minutes
    
    return isConsecutive;
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Conversation header */}
      <div className="border-b p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={otherParticipant.avatar} alt={otherParticipant.name} />
            <AvatarFallback>{getInitials(otherParticipant.name)}</AvatarFallback>
          </Avatar>
          
          <div>
            <h2 className="font-medium">{otherParticipant.name}</h2>
            <p className="text-xs text-muted-foreground">
              {otherParticipant.status === 'online' 
                ? 'Online' 
                : otherParticipant.status === 'away'
                ? 'Away'
                : 'Offline'}
            </p>
          </div>
        </div>
        
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {conversation.messages.map((message, index) => {
          const sender = conversation.participants.find(
            user => user.id === message.senderId
          ) as User;
          
          const isSent = message.senderId === currentUser.id;
          const isConsecutive = isConsecutiveMessage(message, index);
          
          return (
            <MessageItem
              key={message.id}
              message={message}
              sender={sender}
              isSent={isSent}
              isConsecutive={isConsecutive}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <MessageInput 
        onSendMessage={(text) => onSendMessage(conversation.id, text)} 
      />
    </div>
  );
}