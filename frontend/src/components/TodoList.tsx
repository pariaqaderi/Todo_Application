import { useEffect, useState } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api/todos';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface Props {
  refresh: boolean; // <- new prop from App
}


export const TodoList = ({ refresh }: Props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const fetchTodos = async () => {
    try {
      const res = await getTodos();
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [refresh]);

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    await createTodo({ title: newTitle, completed: false });
    setNewTitle('');
    fetchTodos();
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    fetchTodos();
  };

  const handleToggle = async (todo: Todo) => {
    await updateTodo(todo.id, { title: todo.title, completed: !todo.completed });
    fetchTodos();
  };

  const handleEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
  };

  const handleUpdate = async (todo: Todo) => {
    if (!editTitle.trim()) return;
    await updateTodo(todo.id, { title: editTitle, completed: todo.completed });
    setEditingId(null);
    setEditTitle('');
    fetchTodos();
  };

  return (
    <div className=" max-w-md  mx-auto mt-5">

      {/* Todo list */}
      <ul className="space-y-3">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="flex justify-between items-center border_2  rounded-2xl p-3 shadow-sm bg-white"
          >
            {editingId === todo.id ? (
              <div className="flex flex-1 items-center">
                <input
                  type="text"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  className="border px-2 py-1 border-purple-800 rounded-2xl w-full mr-2"
                />
                <button
                  onClick={() => handleUpdate(todo)}
                  className="bg-green-400 text-white px-2 py-1 rounded-2xl hover:bg-green-600 mr-2"
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
            ) : (
              <>
                <span
                  onClick={() => handleToggle(todo)}
                  className={`cursor-pointer flex-1 ${
                    todo.completed ? 'line-through text-gray-400' : ''
                  }`}
                >
                  {todo.title}
                </span>
                <div className="flex gap-2">
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
