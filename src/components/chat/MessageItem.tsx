import { Message, User } from "../../lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "../../lib/utils";
import { Check, CheckCheck } from "lucide-react";

interface MessageItemProps {
  message: Message;
  sender: User;
  isSent: boolean;
  isConsecutive?: boolean;
}

export function MessageItem({ 
  message, 
  sender, 
  isSent, 
  isConsecutive = false 
}: MessageItemProps) {
  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  // Different styles for sent vs received messages
  const messageContainerClasses = cn(
    "group flex items-end gap-2 max-w-[80%]",
    isSent ? "self-end" : "self-start"
  );
  
  const messageBubbleClasses = cn(
    "rounded-2xl p-3 text-sm",
    isSent 
      ? "bg-blue-600 text-white rounded-br-none" 
      : "bg-secondary text-foreground rounded-bl-none"
  );

  return (
    <div className={messageContainerClasses}>
      {!isSent && !isConsecutive && (
        <Avatar className="w-8 h-8">
          <AvatarImage src={sender.avatar} alt={sender.name} />
          <AvatarFallback>{getInitials(sender.name)}</AvatarFallback>
        </Avatar>
      )}
      
      {!isSent && isConsecutive && <div className="w-8" />}
      
      <div className="flex flex-col">
        {!isSent && !isConsecutive && (
          <span className="text-xs text-muted-foreground ml-1 mb-1">{sender.name}</span>
        )}
        
        <div className="flex items-end gap-1">
          <div className={messageBubbleClasses}>
            {message.text}
          </div>
          
          <div className="flex flex-col items-center justify-center text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span>{formatTime(message.timestamp)}</span>
            {isSent && (
              <div className="text-blue-600">
                {message.read ? (
                  <CheckCheck className="h-3.5 w-3.5" />
                ) : (
                  <Check className="h-3.5 w-3.5" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}