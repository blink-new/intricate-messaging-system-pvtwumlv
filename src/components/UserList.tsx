import { Search } from 'lucide-react';
import { User } from '../lib/types';
import { users as allUsers, formatTime, getThreadByParticipants } from '../lib/data';
import { cn } from '../lib/utils';
import { useEffect, useState } from 'react';

interface UserListProps {
  currentUserId: string;
  onSelectUser: (user: User) => void;
  selectedUserId?: string;
}

export function UserList({ currentUserId, onSelectUser, selectedUserId }: UserListProps) {
  const [users, setUsers] = useState<User[]>(allUsers);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setUsers(allUsers);
      return;
    }
    
    const filtered = allUsers.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setUsers(filtered);
  }, [searchQuery]);
  
  // Get the last message time for each user
  const getUserLastMessage = (userId: string) => {
    const thread = getThreadByParticipants([currentUserId, userId]);
    if (!thread || thread.messages.length === 0) return null;
    
    return formatTime(thread.lastActivity);
  };
  
  return (
    <div className="h-full flex flex-col border-r bg-muted/10">
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background rounded-full pl-9 pr-3 py-2 text-sm border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {users.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No contacts found
          </div>
        ) : (
          <ul className="py-2">
            {users.map((user) => {
              const isSelected = user.id === selectedUserId;
              const lastMessageTime = getUserLastMessage(user.id);
              
              return (
                <li key={user.id}>
                  <button
                    onClick={() => onSelectUser(user)}
                    className={cn(
                      "w-full text-left p-3 flex items-center gap-3 transition-colors",
                      isSelected 
                        ? "bg-primary/10" 
                        : "hover:bg-muted/50"
                    )}
                  >
                    <div className="relative flex-shrink-0">
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
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center w-full">
                        <h3 className="font-medium truncate">{user.name}</h3>
                        {lastMessageTime && (
                          <span className="text-xs text-muted-foreground ml-2">
                            {lastMessageTime}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground truncate">
                        {user.status === 'online' ? 'Online' : 
                         user.status === 'away' ? 'Away' : 
                         user.lastSeen ? `Last seen ${formatTime(user.lastSeen)}` : 'Offline'}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}