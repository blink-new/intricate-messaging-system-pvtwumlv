import { useState, useEffect } from "react";
import { Conversation, Message } from "../lib/types";
import { mockConversations, currentUser } from "../lib/data";
import { ConversationList } from "./sidebar/ConversationList";
import { ConversationView } from "./chat/ConversationView";
import { PlusCircle, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useIsMobile } from "../hooks/use-mobile";
import { AnimatePresence, motion } from "framer-motion";

export function MessagingContainer() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  
  // Set initial active conversation
  useEffect(() => {
    if (conversations.length > 0 && !activeConversationId) {
      setActiveConversationId(conversations[0].id);
    }
  }, [conversations, activeConversationId]);

  // Handle mobile sidebar visibility
  useEffect(() => {
    if (isMobile) {
      setShowSidebar(!activeConversationId);
    } else {
      setShowSidebar(true);
    }
  }, [isMobile, activeConversationId]);
  
  // Find active conversation
  const activeConversation = conversations.find(
    conversation => conversation.id === activeConversationId
  );
  
  // Handle conversation selection
  const handleSelectConversation = (conversation: Conversation) => {
    setActiveConversationId(conversation.id);
    
    // Mark all messages as read
    if (conversation.unreadCount > 0) {
      setConversations(prevConversations => 
        prevConversations.map(conv => {
          if (conv.id === conversation.id) {
            const updatedMessages = conv.messages.map(message => ({
              ...message,
              read: true
            }));
            
            return {
              ...conv,
              messages: updatedMessages,
              unreadCount: 0
            };
          }
          return conv;
        })
      );
    }
  };
  
  // Handle sending a new message
  const handleSendMessage = (conversationId: string, text: string) => {
    setConversations(prevConversations => 
      prevConversations.map(conv => {
        if (conv.id === conversationId) {
          const newMessage: Message = {
            id: `${conversationId}-${Date.now()}`,
            senderId: currentUser.id,
            text,
            timestamp: new Date(),
            read: false
          };
          
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: newMessage,
            updatedAt: new Date()
          };
        }
        return conv;
      })
    );
  };

  const handleBackToList = () => {
    if (isMobile) {
      setActiveConversationId(null);
    }
  };
  
  return (
    <div className="flex h-full border rounded-lg shadow-sm overflow-hidden bg-background">
      {/* Sidebar */}
      <AnimatePresence initial={false}>
        {showSidebar && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: isMobile ? "100%" : "350px", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border-r h-full flex flex-col overflow-hidden"
          >
            <div className="p-3 flex items-center justify-between">
              <h1 className="text-xl font-semibold">Messages</h1>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <PlusCircle className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex-1 overflow-hidden">
              <ConversationList
                conversations={conversations}
                activeConversationId={activeConversationId}
                onSelectConversation={handleSelectConversation}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main content */}
      <AnimatePresence initial={false}>
        {activeConversation && (
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col h-full"
          >
            <ConversationView
              conversation={activeConversation}
              onSendMessage={handleSendMessage}
            />
            
            {isMobile && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute top-3 left-3"
                onClick={handleBackToList}
              >
                ← Back
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Empty state */}
      {!activeConversation && !isMobile && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md p-6">
            <h2 className="text-xl font-semibold mb-2">Select a conversation</h2>
            <p className="text-muted-foreground">
              Choose a conversation from the sidebar to start messaging
            </p>
          </div>
        </div>
      )}
    </div>
  );
}