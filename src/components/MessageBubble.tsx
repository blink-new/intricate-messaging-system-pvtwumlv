import { Check, CheckCheck, Clock } from 'lucide-react';
import { Message } from '../lib/types';
import { formatTime, getUserById } from '../lib/data';
import { cn } from '../lib/utils';

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
  showAvatar?: boolean;
  replyMessage?: Message | null;
}

export function MessageBubble({ 
  message, 
  isCurrentUser, 
  showAvatar = true,
  replyMessage
}: MessageBubbleProps) {
  const sender = getUserById(message.senderId);
  const repliedToSender = replyMessage ? getUserById(replyMessage.senderId) : null;
  
  if (!sender) return null;
  
  return (
    <div className={cn(
      "flex mb-2 max-w-[85%] group",
      isCurrentUser ? "ml-auto" : "mr-auto"
    )}>
      {!isCurrentUser && showAvatar && (
        <div className="flex-shrink-0 mr-2">
          <img 
            src={sender.avatar} 
            alt={sender.name} 
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      )}
      
      <div className={cn(
        "flex flex-col",
        isCurrentUser ? "items-end" : "items-start"
      )}>
        {!isCurrentUser && showAvatar && (
          <span className="text-xs text-muted-foreground mb-1">{sender.name}</span>
        )}
        
        <div className="flex flex-col">
          {replyMessage && (
            <div className={cn(
              "px-3 py-2 rounded-lg text-xs mb-1 max-w-80 truncate border-l-2",
              isCurrentUser 
                ? "bg-secondary/50 border-primary rounded-tr-none" 
                : "bg-muted/30 border-primary/70 rounded-tl-none"
            )}>
              <span className="font-semibold text-primary/80">
                {repliedToSender?.name || 'Unknown'}
              </span>
              <p className="truncate opacity-75">{replyMessage.content}</p>
            </div>
          )}
          
          <div className={cn(
            "px-4 py-2 rounded-2xl",
            isCurrentUser 
              ? "bg-primary text-primary-foreground rounded-br-none" 
              : "bg-secondary text-secondary-foreground rounded-bl-none"
          )}>
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
            
            <div className="flex items-center justify-end mt-1 gap-1">
              <span className="text-xs opacity-70">
                {formatTime(message.timestamp)}
              </span>
              
              {isCurrentUser && (
                <span className="text-xs">
                  {message.status === 'sent' && <Clock className="h-3 w-3 inline opacity-70" />}
                  {message.status === 'delivered' && <Check className="h-3 w-3 inline opacity-70" />}
                  {message.status === 'read' && <CheckCheck className="h-3 w-3 inline opacity-70" />}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {isCurrentUser && showAvatar && (
        <div className="flex-shrink-0 ml-2">
          <img 
            src={sender.avatar} 
            alt={sender.name} 
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      )}
    </div>
  );
}