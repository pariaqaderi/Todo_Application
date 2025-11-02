import { useState } from 'react';
import { createTodo } from '../api/todos';

interface TodoFormProps {
  onAdd: () => void;
}

export const TodoForm = ({ onAdd }: TodoFormProps) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await createTodo({ title, completed: false });
      setTitle('');
      onAdd();
    } catch (err) {
      console.error('Error creating todo:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex  space-x-3.5 mb-4">
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="New todo"
        className="rounded-2xl divide-purple-400 bg-white border-2 border-purple-800 px-2 py-1 flex-1"
      />
      <button type="submit" className="bg-purple-800 text-white px-4 rounded-2xl   hover:bg-purple-900">
        Add
      </button>
    </form>
  );
};
