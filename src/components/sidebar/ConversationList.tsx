import { useState } from "react";
import { Conversation, User } from "../../lib/types";
import { UserItem } from "./UserItem";
import { currentUser } from "../../lib/data";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (conversation: Conversation) => void;
}

export function ConversationList({ 
  conversations, 
  activeConversationId, 
  onSelectConversation 
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Get the other participant in the conversation (not the current user)
  const getOtherParticipant = (conversation: Conversation): User => {
    return conversation.participants.find(user => user.id !== currentUser.id) || currentUser;
  };

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conversation => {
    const otherUser = getOtherParticipant(conversation);
    return otherUser.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Sort conversations by last update time (newest first)
  const sortedConversations = [...filteredConversations].sort(
    (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
  );

  return (
    <div className="h-full flex flex-col">
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search conversations..."
            className="pl-9 bg-secondary/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {sortedConversations.length > 0 ? (
          sortedConversations.map(conversation => {
            const otherUser = getOtherParticipant(conversation);
            const lastMessage = conversation.messages[conversation.messages.length - 1];
            
            return (
              <UserItem
                key={conversation.id}
                user={otherUser}
                unreadCount={conversation.unreadCount}
                isActive={conversation.id === activeConversationId}
                onClick={() => onSelectConversation(conversation)}
                lastMessage={lastMessage?.text}
                timestamp={lastMessage?.timestamp}
              />
            );
          })
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            No conversations found
          </div>
        )}
      </div>
    </div>
  );
}