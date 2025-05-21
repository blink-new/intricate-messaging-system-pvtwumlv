import { MoreVertical, Phone, Video } from 'lucide-react';
import { User } from '../lib/types';
import { cn } from '../lib/utils';

interface HeaderProps {
  user: User;
}

export function Header({ user }: HeaderProps) {
  return (
    <div className="flex items-center justify-between p-3 border-b">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className={cn(
            "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background",
            user.status === 'online' ? "bg-green-500" :
            user.status === 'away' ? "bg-yellow-500" : "bg-gray-400"
          )} />
        </div>
        
        <div>
          <h2 className="font-medium">{user.name}</h2>
          <p className="text-xs text-muted-foreground">
            {user.status === 'online' ? 'Online' : 
             user.status === 'away' ? 'Away' : 'Offline'}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-muted transition-colors" title="Voice call">
          <Phone size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-muted transition-colors" title="Video call">
          <Video size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-muted transition-colors" title="More options">
          <MoreVertical size={20} />
        </button>
      </div>
    </div>
  );
}