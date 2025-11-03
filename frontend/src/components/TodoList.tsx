import { useEffect, useState } from 'react';
import { getTodos, updateTodo, deleteTodo } from '../api/todos';

interface Todo {
  id: number;
  title: string;
  description?: string;
  status: 'open' | 'in_progress' | 'done';
}

interface Props {
  refresh: boolean;
  searchQuery: string;
}

export const TodoList = ({ refresh, searchQuery }: Props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const res = await getTodos(searchQuery); // pass search query to API
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [refresh, searchQuery]);

  // Toggle status (open → in_progress → done → open)
  const handleToggle = async (todo: Todo) => {
    const newStatus =
      todo.status === 'open'
        ? 'in_progress'
        : todo.status === 'in_progress'
        ? 'done'
        : 'open';
    await updateTodo(todo.id, {
      title: todo.title,
      description: todo.description,
      status: newStatus,
    });
    fetchTodos();
  };

  // Start editing
  const handleEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
  };

  // Save edits
  const handleUpdate = async (todo: Todo) => {
    if (!editTitle.trim()) return;

    await updateTodo(todo.id, {
      title: editTitle,
      description: editDescription,
      status: todo.status,
    });

    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
    fetchTodos();
  };

  // Delete todo
  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    fetchTodos();
  };

  return (
    <div className="max-w-md mx-auto mt-5">
      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex flex-col border rounded-2xl p-3 bg-white shadow-sm"
          >
            {editingId === todo.id ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="border px-2 py-1 border-purple-800 rounded-2xl w-full"
                  placeholder="Title"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="border px-2 py-1 border-purple-800 rounded-2xl w-full"
                  placeholder="Description"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(todo)}
                    className="bg-green-400 text-white px-2 py-1 rounded-2xl hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-400 text-white px-2 py-1 rounded-2xl hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <h3
                    onClick={() => handleToggle(todo)}
                    className={`font-semibold text-lg cursor-pointer ${
                      todo.status === 'done' ? 'line-through text-gray-400' : ''
                    }`}
                  >
                    {todo.title}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      todo.status === 'open'
                        ? 'bg-gray-200 text-gray-800'
                        : todo.status === 'in_progress'
                        ? 'bg-yellow-200 text-yellow-800'
                        : 'bg-green-200 text-green-800'
                    }`}
                  >
                    {todo.status.replace('_', ' ')}
                  </span>
                </div>
                {todo.description && (
                  <p className="text-gray-600 mt-1">{todo.description}</p>
                )}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="bg-purple-400 text-white px-2 py-1 rounded-2xl hover:bg-purple-500"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-2xl hover:bg-red-800"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
