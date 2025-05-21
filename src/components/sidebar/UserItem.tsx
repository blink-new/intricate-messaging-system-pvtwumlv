import { User } from "../../lib/types";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "../../lib/utils";

interface UserItemProps {
  user: User;
  unreadCount?: number;
  isActive?: boolean;
  onClick?: () => void;
  lastMessage?: string;
  timestamp?: Date;
}

export function UserItem({ 
  user, 
  unreadCount = 0, 
  isActive = false, 
  onClick,
  lastMessage,
  timestamp
}: UserItemProps) {
  // Format timestamp to a readable string
  const formatTime = (date?: Date) => {
    if (!date) return '';
    
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div 
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors",
        isActive 
          ? "bg-primary/10 text-primary" 
          : "hover:bg-secondary"
      )}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar>
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <div 
          className={cn(
            "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background",
            user.status === 'online' ? "bg-green-500" : 
            user.status === 'away' ? "bg-yellow-500" : "bg-gray-400"
          )}
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <p className="font-medium truncate">{user.name}</p>
          {timestamp && (
            <span className="text-xs text-muted-foreground shrink-0 ml-2">
              {formatTime(timestamp)}
            </span>
          )}
        </div>
        
        {lastMessage && (
          <p className="text-sm text-muted-foreground truncate">
            {lastMessage}
          </p>
        )}
      </div>
      
      {unreadCount > 0 && (
        <Badge 
          className="bg-blue-600 hover:bg-blue-700 ml-1 rounded-full px-2 py-0.5 min-w-5 flex items-center justify-center">
          {unreadCount}
        </Badge>
      )}
    </div>
  );
}