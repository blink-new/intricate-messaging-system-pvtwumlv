import { MessagingContainer } from './components/MessagingContainer';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 flex flex-col">
      <header className="mb-8 max-w-screen-xl mx-auto w-full px-4">
        <h1 className="text-3xl font-bold text-center text-blue-600">Intricate Messaging System</h1>
        <p className="text-center text-slate-500 dark:text-slate-400 mt-2">
          A sophisticated system for seamless messaging
        </p>
      </header>
      
      <main className="flex-1 max-w-screen-xl mx-auto w-full px-4">
        <div className="h-[75vh]">
          <MessagingContainer />
        </div>
      </main>
      
      <footer className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400 max-w-screen-xl mx-auto w-full px-4">
        <p>© {new Date().getFullYear()} Intricate Messaging System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;