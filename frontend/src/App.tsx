import { useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Trigger TodoList to refetch todos
  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div className="max-w-md bg-purple-50 mx-auto mt-10 p-4 border-2 border-purple-900 rounded-xl shadow">
      <h1 className="text-2xl text-gray-900 font-sans font-bold mb-4">
        Todo App
      </h1>

      {/* Search box */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search todos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-purple-800 rounded-2xl px-2 py-1 w-full"
        />
      </div>

      {/* Form to add new todo */}
      <TodoForm onAdd={triggerRefresh} />

      {/* Todo list */}
      <TodoList refresh={refresh} searchQuery={searchQuery} />
    </div>
  );
}

export default App;
