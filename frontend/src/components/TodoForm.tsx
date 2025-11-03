import { useState } from 'react';
import { createTodo } from '../api/todos';

interface Props {
  onAdd: () => void;
}

export const TodoForm = ({ onAdd }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'open' | 'in_progress' | 'done'>('open');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await createTodo({ title, description, status });
    setTitle('');
    setDescription('');
    setStatus('open');
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-4">
      <input
        type="text"
        placeholder="Title (required)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-purple-800 rounded-2xl px-2 py-1"
        required
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-purple-800 rounded-2xl px-2 py-1"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as 'open' | 'in_progress' | 'done')}
        className="border border-purple-800 rounded-2xl px-2 py-1"
      >
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button
        type="submit"
        className="bg-purple-600 text-white py-1 rounded-2xl hover:bg-purple-700"
      >
        Add Todo
      </button>
    </form>
  );
};
