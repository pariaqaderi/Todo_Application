import { useState } from 'react'
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';


function App() {
  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => setRefresh(!refresh);

  return (
      <div className="max-w-md bg-purple-50 mx-auto mt-10 p-4 border-2 border-purple-900 rounded-xl shadow">
      <h1 className="text-2xl text-gray-900 font-sans font-bold mb-4">Todo App</h1>
      <TodoForm onAdd={triggerRefresh} />
      <TodoList refresh={refresh} />
    </div>
  );
}

export default App
