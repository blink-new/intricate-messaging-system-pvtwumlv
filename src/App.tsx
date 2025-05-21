import { useState } from 'react';
import { UserList } from './components/UserList';
import { ChatThread } from './components/ChatThread';
import { Header } from './components/Header';
import { User } from './lib/types';
import { currentUser, users } from './lib/data';

function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(users[0]);

  return (
    <div className="flex h-screen bg-background text-foreground antialiased">
      <div className="w-full max-w-screen-xl mx-auto flex overflow-hidden shadow-lg rounded-lg my-4 border">
        {/* Left sidebar - User list */}
        <div className="w-80 flex-shrink-0 h-full">
          <UserList 
            currentUserId={currentUser.id} 
            onSelectUser={setSelectedUser} 
            selectedUserId={selectedUser?.id}
          />
        </div>
        
        {/* Main content - Chat area */}
        <div className="flex-1 flex flex-col h-full">
          {selectedUser ? (
            <>
              <Header user={selectedUser} />
              
              <div className="flex-1 overflow-hidden">
                <ChatThread 
                  threadId={`t${users.findIndex(u => u.id === selectedUser.id) + 1}`}
                  activeUser={selectedUser}
                />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-6">
                <h2 className="text-2xl font-semibold mb-2">Welcome to ChatApp</h2>
                <p className="text-muted-foreground">
                  Select a contact to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;