import { useState, KeyboardEvent } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Paperclip, Send, Smile } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (text: string) => void;
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState("");
  
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Send message on Enter (but not with Shift+Enter)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    
    if (trimmedMessage) {
      onSendMessage(trimmedMessage);
      setMessage("");
    }
  };
  
  return (
    <div className="border-t p-3">
      <div className="flex items-end gap-2 bg-secondary/50 rounded-lg p-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <Paperclip className="h-5 w-5" />
        </Button>
        
        <Textarea
          placeholder="Type a message..."
          className="min-h-10 border-0 focus-visible:ring-0 resize-none bg-transparent flex-1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <Smile className="h-5 w-5" />
        </Button>
        
        <Button 
          size="icon" 
          className={`rounded-full h-9 w-9 ${message.trim() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-muted text-muted-foreground'}`}
          onClick={handleSendMessage}
          disabled={!message.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}